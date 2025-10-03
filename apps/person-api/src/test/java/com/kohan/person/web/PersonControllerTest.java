package com.kohan.person.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kohan.person.domain.Person;
import com.kohan.person.repository.PersonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PersonRepository repo;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        repo.deleteAll(); // limpia la DB en memoria antes de cada test
    }

    @Test
    void shouldCreatePerson() throws Exception {
        Person p = new Person();
        p.setFirstName("Ana");
        p.setLastName("Gómez");
        p.setAge(28);
        p.setEmail("ana@test.com");

        mockMvc.perform(post("/api/persons")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName", is("Ana")))
                .andExpect(jsonPath("$.email", is("ana@test.com")));
    }

    @Test
    void shouldReturnNotFoundForInvalidId() throws Exception {
        mockMvc.perform(get("/api/persons/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturnPersonById() throws Exception {
        Person p = new Person();
        p.setFirstName("Luis");
        p.setLastName("Pérez");
        p.setAge(35);
        p.setEmail("luis@test.com");
        Person saved = repo.save(p);

        mockMvc.perform(get("/api/persons/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName", is("Luis")));
    }
}
