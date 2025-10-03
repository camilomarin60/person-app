-- ============================
-- ADDRESSES
-- ============================
INSERT INTO addresses (id, street, city, state, postal_code, country)
VALUES (1, 'Cra 10 #20-30', 'Medellín', 'Antioquia', '050021', 'CO');

INSERT INTO addresses (id, street, city, state, postal_code, country)
VALUES (2, 'Av. Siempre Viva 742', 'Springfield', 'Illinois', '62704', 'USA');

-- ============================
-- PERSONS (base class)
-- ============================
-- Persona normal (sin herencia)
INSERT INTO persons (id, first_name, last_name, age, email, purchase_parking_pass, address_id)
VALUES (10, 'Ana', 'Gómez', 28, 'ana@example.com', true, 1);

INSERT INTO persons (id, first_name, last_name, age, email, purchase_parking_pass)
VALUES (11, 'Luis', 'Pérez', 35, 'luis@example.com', false);

-- ============================
-- STUDENTS
-- ============================
-- Student hereda de Person → insertamos en persons y luego en students con el mismo id
INSERT INTO persons (id, first_name, last_name, age, email, purchase_parking_pass, address_id)
VALUES (20, 'Laura', 'Soto', 22, 'laura@uni.edu', true, 2);

INSERT INTO students (id, student_number, average_mark, is_eligible_to_enroll)
VALUES (20, 'STU-001', 4.3, true);

INSERT INTO persons (id, first_name, last_name, age, email, purchase_parking_pass)
VALUES (21, 'Pedro', 'Ramos', 20, 'pedro@uni.edu', false);

INSERT INTO students (id, student_number, average_mark, is_eligible_to_enroll)
VALUES (21, 'STU-002', 3.8, false);

-- ============================
-- PROFESSORS
-- ============================
-- Professor hereda de Person → insertamos en persons y luego en professors con el mismo id
INSERT INTO persons (id, first_name, last_name, age, email, purchase_parking_pass)
VALUES (30, 'Carlos', 'Ruiz', 45, 'carlos@uni.edu', false);

INSERT INTO professors (id, salary)
VALUES (30, 6500.00);

INSERT INTO persons (id, first_name, last_name, age, email, purchase_parking_pass)
VALUES (31, 'Mariana', 'Torres', 50, 'mariana@uni.edu', true);

INSERT INTO professors (id, salary)
VALUES (31, 7200.50);
