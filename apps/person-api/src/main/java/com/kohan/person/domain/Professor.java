package com.kohan.person.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
@Table(name = "professors")
@PrimaryKeyJoinColumn(name = "id")
public class Professor extends Person {

    @DecimalMin(value = "0.0", inclusive = false, message = "El salario debe ser mayor a 0")
    @Digits(integer = 10, fraction = 2, message = "El salario debe tener como máximo 10 dígitos enteros y 2 decimales")
    @Column(nullable = false)
    private BigDecimal salary;

    public Professor() {
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }
}
