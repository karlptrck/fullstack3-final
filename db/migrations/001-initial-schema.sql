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

-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;