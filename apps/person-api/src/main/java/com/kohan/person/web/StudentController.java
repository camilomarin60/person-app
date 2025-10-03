package com.kohan.person.web;

import com.kohan.person.domain.Student;
import com.kohan.person.repository.StudentRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private static final Logger log = LoggerFactory.getLogger(StudentController.class);
    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Student> findAll() {
        log.info("Listando todos los estudiantes");
        List<Student> students = repo.findAll();
        log.debug("Cantidad de estudiantes encontrados: {}", students.size());
        return students;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findById(@PathVariable Long id) {
        log.info("Buscando estudiante con id={}", id);
        return repo.findById(id)
                .map(s -> {
                    log.debug("Estudiante encontrado: {} {}", s.getFirstName(), s.getLastName());
                    return ResponseEntity.ok(s);
                })
                .orElseGet(() -> {
                    log.warn("Estudiante con id={} no encontrado", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public Student create(@Valid @RequestBody Student s) {
        log.info("Creando nuevo estudiante con email={}", s.getEmail());
        Student saved = repo.save(s);
        log.debug("Estudiante creado con id={} y número estudiante={}", saved.getId(), saved.getStudentNumber());
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @Valid @RequestBody Student updated) {
        log.info("Actualizando estudiante con id={}", id);
        return repo.findById(id).map(s -> {
            s.setFirstName(updated.getFirstName());
            s.setLastName(updated.getLastName());
            s.setAge(updated.getAge());
            s.setEmail(updated.getEmail());
            s.setStudentNumber(updated.getStudentNumber());
            s.setAverageMark(updated.getAverageMark());
            s.setIsEligibleToEnroll(updated.getIsEligibleToEnroll());
            Student result = repo.save(s);
            log.debug("Estudiante actualizado id={} número estudiante={}", result.getId(), result.getStudentNumber());
            return ResponseEntity.ok(result);
        }).orElseGet(() -> {
            log.error("No se encontró estudiante con id={} para actualizar", id);
            return ResponseEntity.notFound().build();
        });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Eliminando estudiante con id={}", id);
        if (!repo.existsById(id)) {
            log.warn("No existe estudiante con id={} para eliminar", id);
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        log.info("Estudiante eliminado con id={}", id);
        return ResponseEntity.noContent().build();
    }
}
