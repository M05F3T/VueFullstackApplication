const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
            if(error) {
                throw error;
            } else {
                console.log("getting students: success")
                res.status(200).json(results.rows);
            }
    });
}

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    //check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(error) throw  error

        if (results.rows.length) {
            res.send("Email already exists.");
        }

        //
        pool.query(queries.addStudent, [name,email,age,dob], (error, results) => {
            if (error) throw error
            res.status(201).send("Student Created Successfully!");
        })
    })
}

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length
        if(error) {
            throw error
        }else if(noStudentFound) {
            res.send("Student wasn't found in database")
        }else  {
            console.log(`getting student with id ${id}: success`)
            res.status(200).json(results.rows)
        }
    })
}

const removeStudent = (req,res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length
        if (error) throw error
        if(noStudentFound) {
            res.send("Student wasn't found in database")
        }else {
            pool.query(queries.removeStudent, [id], (error, results) => {
                if(error) throw  error
                res.status(200).send("Student deleted successfully!")
            })
        }
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queries.getStudentById, [id], (error,results) => {
        const noStudentFound = !results.rows.length
        if (error) throw error
        if(noStudentFound) {
            res.send("Student wasn't found in database")
        }

        pool.query(queries.updateStudent, [name, id], (error, resultss) => {
            if (error) throw error
            res.status(200).send("Student updated successfully!")
        })
    })

}



module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    removeStudent,
    updateStudent
}