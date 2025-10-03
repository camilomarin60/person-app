package com.kohan.person.web;

import com.kohan.person.domain.Address;
import com.kohan.person.repository.AddressRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private static final Logger log = LoggerFactory.getLogger(AddressController.class);
    private final AddressRepository repo;

    public AddressController(AddressRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Address> findAll() {
        log.info("Listando todas las direcciones");
        List<Address> addresses = repo.findAll();
        log.debug("Cantidad de direcciones encontradas: {}", addresses.size());
        return addresses;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> findById(@PathVariable Long id) {
        log.info("Buscando dirección con id={}", id);
        return repo.findById(id)
                .map(a -> {
                    log.debug("Dirección encontrada: {} - {}", a.getStreet(), a.getCity());
                    return ResponseEntity.ok(a);
                })
                .orElseGet(() -> {
                    log.warn("Dirección con id={} no encontrada", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public Address create(@Valid @RequestBody Address a) {
        log.info("Creando nueva dirección en ciudad={}", a.getCity());
        Address saved = repo.save(a);
        log.debug("Dirección creada con id={}", saved.getId());
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> update(@PathVariable Long id, @Valid @RequestBody Address updated) {
        log.info("Actualizando dirección con id={}", id);
        return repo.findById(id).map(a -> {
            a.setStreet(updated.getStreet());
            a.setCity(updated.getCity());
            a.setState(updated.getState());
            a.setPostalCode(updated.getPostalCode());
            a.setCountry(updated.getCountry());
            Address result = repo.save(a);
            log.debug("Dirección actualizada id={} ciudad={}", result.getId(), result.getCity());
            return ResponseEntity.ok(result);
        }).orElseGet(() -> {
            log.error("No se encontró dirección con id={} para actualizar", id);
            return ResponseEntity.notFound().build();
        });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Eliminando dirección con id={}", id);
        if (!repo.existsById(id)) {
            log.warn("No existe dirección con id={} para eliminar", id);
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        log.info("Dirección eliminada con id={}", id);
        return ResponseEntity.noContent().build();
    }
}
