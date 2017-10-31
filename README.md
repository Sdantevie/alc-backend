# ALC Backend

## About

This is a NodeJs API in response to the first Step in the Assesment for ALC 2.0 Web development Intermediate.
The Idea was that this API will store academic Resources by their links to where it can be found on the internet.
Many Improvements can be made on this API but my DOD (definition of done) was that it meets the three listed requirements.
  - Creating Students Resource
  - Reading Students Resource
  - Updating and Deleting Students

To see this API at Work, go to [the front-end that answers assesment 2](http://myalcsrc.surge.sh) 


## Database

It makes use of MongoDB accessed through Mongoose. The database, hosted on [Mlab](https://mlab.com) contains one collection called Student that obeys the following schema

```
const StudentSchema = new Schema({
    name: {
        type: String
    },
    school: {
        type: String
    },
    course: {
        type: String,
    },
    subject: {
        type: String
    },
    link: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});
```
As can be seen, this API stores a Student and a Resource Entry as one Document. When a Student is deleted, the name, school and course fields are cleared. The Associated Resource (the subject and link fields) remains as it wasn't stated that resources should be deleted.
 

## Scripts

### npm run start

starts the api on port 3001

## End-Points

### /api/authenticate

#### POST

Provides Authentication. on receiving a certain string, it returns a JWT.

### /students
#### GET
Returns All the Students/Resources in the database

#### POST 
Creates a New Students/Resource

### /students/:id

#### GET

Returns the Students/Resources that has the given Id

#### POST

Updates the Students/Resources that has the given id

#### DELETE

Deletes the Resources that has the given id

### /students/get/:name 

Returns all the entries for Students/Resources that has the given name.





