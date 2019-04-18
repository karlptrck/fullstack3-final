# fullstack3-final

Full-stack final project by Karl Patrick Camota

## Getting Started

* Clone or download this repository.
* Install dependencies
```
npm install
```
* Create .env file with below configuration
```
PORT=3000
NODE_ENV=dev
```
* Run and test
```
npm run start
```


### Testing

Sample data will be added during the database initialization. 

[DB SCHEMA and DUMMY DATA](https://github.com/karlptrck/fullstack3-final/blob/master/db/migrations/001-initial-schema.sql)


## API Endpoints

#### Classes
GET ‘/api/classes’ - returns an array of all classes.  

GET  ‘/api/classes/:id’ - returns details of a class as json, includingname of the teacher of the class.  

POST ‘/api/classes’ - Creates a class upon receiving json data in form  

PUT ‘/api/classes/:id’  - updates an existing class record.  

```
Required Fields (POST & PUT) : ['code', 'name', 'teacher_id']
```

DELETE ‘/api/classes/:id’  - deletes an existing class record.  

#### Students

GET ‘/api/students - returns an array of all students.  

GET  ‘/api/students/:id’ - returns details of a student as json.  

GET  ‘/api/students/:id/classes’ - returns json array of all classes astudent is enrolled in.  

POST ‘/api/students - Creates a student upon receiving json data in form  

PUT ‘/api/students/:id’  - updates an existing student record.  

```
Required Fields (POST & PUT) : ['first_name', 'last_name']
```

DELETE ‘/api/students/:id’  - deletes an existing student record.  

#### Teachers

GET ‘/api/teachers - returns an array of all teachers.  

GET  ‘/api/teachers/:id’ - returns details of a teacher as json.  

GET  ‘/api/teachers/:id/classes’ - returns an array of all classes ateacher is teaching.  

POST ‘/api/teachers - Creates a teacher upon receiving json data in form  

PUT ‘/api/teachers/:id’  - updates an existing student record.  

```
Required Fields (POST & PUT) : ['first_name', 'last_name']
```

DELETE ‘/api/teachers/:id’  - updates an existing student record.

#### Enrollment

GET '/api/classes/:class_id/students' -- return all students in class. [{firstname: "foo",   lastname: "bar",   id: 1},   {firstname: "fred",    lastname: "bill",    id: 2}] 

POST '/api/classes/:class_id/students' with data {student_id} creates anew enrollment for the student in the class [Creates a new entry instudent_class table if entry does not already exist] 

```
Required Field : student_id
```

DELETE '/api/classes/:class_id/students/:id' deletes a single enrollmentrecord for a student given class id and student id

## Error Codes

| Code  | Message |
| ------------- | ------------- |
| 10  | Class does not exist.  |
| 20  | Teacher does not exist. |
| 21  | Unable to delete teacher with active classes. |
| 30  | Student does not exist. |
| 31  | Invalid request parameter.  |
| 100  | No data to update.  |
| 101 | Missing required fields.  |
| 102  | Invalid request fields.  |
| 110 | Invalid ID. Must be a number. |

