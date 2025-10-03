package com.kohan.person.web;

import com.kohan.person.domain.Person;
import com.kohan.person.repository.PersonRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    private static final Logger log = LoggerFactory.getLogger(PersonController.class);
    private final PersonRepository repo;

    public PersonController(PersonRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Person> findAll() {
        log.info("Listando todas las personas");
        List<Person> people = repo.findAll();
        log.debug("Cantidad de personas encontradas: {}", people.size());
        return people;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> findById(@PathVariable Long id) {
        log.info("Buscando persona con id={}", id);
        return repo.findById(id)
                .map(p -> {
                    log.debug("Persona encontrada: {}", p.getEmail());
                    return ResponseEntity.ok(p);
                })
                .orElseGet(() -> {
                    log.warn("Persona con id={} no encontrada", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public Person create(@Valid @RequestBody Person p) {
        log.info("Creando nueva persona con email={}", p.getEmail());

        if (p.getAddress() != null) {
            log.debug("Creando nueva dirección para la persona");
        }

        Person saved = repo.save(p);
        log.debug("Persona creada con id={}", saved.getId());
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> update(@PathVariable Long id, @Valid @RequestBody Person updated) {
        log.info("Actualizando persona con id={}", id);
        return repo.findById(id).map(p -> {
            p.setFirstName(updated.getFirstName());
            p.setLastName(updated.getLastName());
            p.setAge(updated.getAge());
            p.setEmail(updated.getEmail());
            p.setPurchaseParkingPass(updated.getPurchaseParkingPass());

            if (updated.getAddress() != null) {
                p.setAddress(updated.getAddress());
                log.debug("Creando nueva dirección para la persona");
            } else {
                p.setAddress(null);
            }

            Person result = repo.save(p);
            log.debug("Persona actualizada id={} email={}", result.getId(), result.getEmail());
            return ResponseEntity.ok(result);
        }).orElseGet(() -> {
            log.error("No se encontró persona con id={} para actualizar", id);
            return ResponseEntity.notFound().build();
        });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Eliminando persona con id={}", id);
        if (!repo.existsById(id)) {
            log.warn("No se encontró persona con id={} para eliminar", id);
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        log.info("Persona eliminada con id={}", id);
        return ResponseEntity.noContent().build();
    }
}
