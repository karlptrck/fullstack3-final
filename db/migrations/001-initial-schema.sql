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
    end_date TEXT
);

CREATE TABLE student_classes
(
    class_id INTEGER,
    student_id INTEGER
);


/* TEACHER DUMMY DATA */
INSERT INTO teachers(first_name, last_name) VALUES('Teacher1_Fname', 'Teacher1_Lname');
INSERT INTO teachers(first_name, last_name) VALUES('Teacher2_Fname', 'Teacher2_Lname');


/* CLASS DUMMY DATA */
INSERT INTO classes(code, name, teacher_id) VALUES('CODE1', 'CLASS1', 1);
INSERT INTO classes(code, name, teacher_id) VALUES('CODE2', 'CLASS2', 2);
INSERT INTO classes(code, name, teacher_id) VALUES('CODE3', 'CLASS3', 1);

/* STUDENTS DUMMY DATA */
INSERT INTO students(first_name, last_name) VALUES('Student1_Fname', 'Student1_Lname');
INSERT INTO students(first_name, last_name) VALUES('Student2_Fname', 'Student2_Lname');

-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;