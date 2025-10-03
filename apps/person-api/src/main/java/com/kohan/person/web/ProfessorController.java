package com.kohan.person.web;

import com.kohan.person.domain.Professor;
import com.kohan.person.repository.ProfessorRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {

    private static final Logger log = LoggerFactory.getLogger(ProfessorController.class);
    private final ProfessorRepository repo;

    public ProfessorController(ProfessorRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Professor> findAll() {
        log.info("Listando todos los profesores");
        List<Professor> professors = repo.findAll();
        log.debug("Cantidad de profesores encontrados: {}", professors.size());
        return professors;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> findById(@PathVariable Long id) {
        log.info("Buscando profesor con id={}", id);
        return repo.findById(id)
                .map(p -> {
                    log.debug("Profesor encontrado: {} {}", p.getFirstName(), p.getLastName());
                    return ResponseEntity.ok(p);
                })
                .orElseGet(() -> {
                    log.warn("Profesor con id={} no encontrado", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public Professor create(@Valid @RequestBody Professor p) {
        log.info("Creando nuevo profesor con email={}", p.getEmail());
        Professor saved = repo.save(p);
        log.debug("Profesor creado con id={} y salario={}", saved.getId(), saved.getSalary());
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> update(@PathVariable Long id, @Valid @RequestBody Professor updated) {
        log.info("Actualizando profesor con id={}", id);
        return repo.findById(id).map(p -> {
            p.setFirstName(updated.getFirstName());
            p.setLastName(updated.getLastName());
            p.setAge(updated.getAge());
            p.setEmail(updated.getEmail());
            p.setSalary(updated.getSalary());
            Professor result = repo.save(p);
            log.debug("Profesor actualizado id={} salario={}", result.getId(), result.getSalary());
            return ResponseEntity.ok(result);
        }).orElseGet(() -> {
            log.error("No se encontró profesor con id={} para actualizar", id);
            return ResponseEntity.notFound().build();
        });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Eliminando profesor con id={}", id);
        if (!repo.existsById(id)) {
            log.warn("No existe profesor con id={} para eliminar", id);
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        log.info("Profesor eliminado con id={}", id);
        return ResponseEntity.noContent().build();
    }
}
