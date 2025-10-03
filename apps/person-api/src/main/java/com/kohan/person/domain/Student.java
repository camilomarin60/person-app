package com.kohan.person.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "students")
@PrimaryKeyJoinColumn(name = "id")
public class Student extends Person {

    @NotBlank(message = "El número de estudiante es obligatorio")
    @Column(name = "student_number", nullable = false, unique = true)
    private String studentNumber;

    @DecimalMin(value = "0.0", inclusive = true, message = "La nota no puede ser negativa")
    @DecimalMax(value = "5.0", inclusive = true, message = "La nota máxima es 5.0")
    @Column(name = "average_mark")
    private Double averageMark;

    @Column(name = "is_eligible_to_enroll")
    private Boolean isEligibleToEnroll;

    public Student() {
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public Double getAverageMark() {
        return averageMark;
    }

    public void setAverageMark(Double averageMark) {
        this.averageMark = averageMark;
    }

    public Boolean getIsEligibleToEnroll() {
        return isEligibleToEnroll;
    }

    public void setIsEligibleToEnroll(Boolean isEligibleToEnroll) {
        this.isEligibleToEnroll = isEligibleToEnroll;
    }
}
