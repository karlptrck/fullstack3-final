-- Up
CREATE TABLE students
(
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP DEFAULT
    CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT
    CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE teachers
(
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP DEFAULT
    CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT
    CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE classes
(
    id INTEGER PRIMARY KEY,
    code TEXT,
    name TEXT,
    teacher_id INTEGER,
    start_date TEXT,
    end_date TEXT,
    CONSTRAINT classes_fk_teacher_id
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON
    UPDATE CASCADE
);

CREATE TABLE student_classes
(
    class_id INTEGER,
    student_id INTEGER,
    CONSTRAINT sc_fk_class_id
    FOREIGN KEY (class_id) REFERENCES classes(id) ON
    DELETE CASCADE,
    CONSTRAINT sc_fk_student_id
    FOREIGN KEY (student_id) REFERENCES students(id) ON
    DELETE CASCADE
);


/* TEACHER DUMMY DATA */
INSERT INTO teachers(first_name, last_name) VALUES('Teacher1_Fname', 'Teacher1_Lname');
INSERT INTO teachers(first_name, last_name) VALUES('Teacher2_Fname', 'Teacher2_Lname');
INSERT INTO teachers(first_name, last_name) VALUES('Teacher3_Fname', 'Teacher3_Lname');
INSERT INTO teachers(first_name, last_name) VALUES('Teacher4_Fname', 'Teacher4_Lname');

/* CLASS DUMMY DATA */
INSERT INTO classes(code, name, teacher_id, start_date, end_date) VALUES('Code1', 'Class1_Name', 1, '05/06/2019', '08/07/2019');
INSERT INTO classes(code, name, teacher_id, start_date, end_date) VALUES('Code2', 'Class2_Name', 2, '05/06/2019', '08/07/2019');
INSERT INTO classes(code, name, teacher_id, start_date, end_date) VALUES('Code3', 'Class3_Name', 3, '05/06/2019', '08/07/2019');
INSERT INTO classes(code, name, teacher_id, start_date, end_date) VALUES('Code4', 'Class4_Name', 1, '05/06/2019', '08/07/2019');
INSERT INTO classes(code, name, teacher_id, start_date, end_date) VALUES('Code5', 'Class5_Name', 2, '05/06/2019', '08/07/2019');
INSERT INTO classes(code, name, teacher_id, start_date, end_date) VALUES('Code6', 'Class6_Name', 1, '05/06/2019', '08/07/2019');

/* STUDENTS DUMMY DATA */
INSERT INTO students(first_name, last_name) VALUES('Student1_Fname', 'Student1_Lname');
INSERT INTO students(first_name, last_name) VALUES('Student2_Fname', 'Student2_Lname');
INSERT INTO students(first_name, last_name) VALUES('Student3_Fname', 'Student3_Lname');
INSERT INTO students(first_name, last_name) VALUES('Student4_Fname', 'Student4_Lname');

/* STUDENTS_CLASSES DUMMY DATA */
INSERT INTO student_classes(class_id, student_id) VALUES(1, 2);
INSERT INTO student_classes(class_id, student_id) VALUES(1, 1);
INSERT INTO student_classes(class_id, student_id) VALUES(2, 2);
INSERT INTO student_classes(class_id, student_id) VALUES(3, 1);
INSERT INTO student_classes(class_id, student_id) VALUES(4, 1);

-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;