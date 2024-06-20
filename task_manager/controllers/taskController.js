const db = require("../config/db");

const getTasks = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM task")
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records Found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All tasks records',
            totalStudents: data[0].length,
            data: data[0],
        })
    }
    catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get All tasks API'
        })
    }
};
const getTaskByID = async (req, res) => {
    try {
        const taskID = req.params.id
        if (!taskID) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID'
            })
        }
        const data=await db.query(`SELECT * FROM task WHERE id=?`,[taskID])
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'No Records Found'
            })
        }
        res.status(200).send({
            success:true,
            taskDetails:data[0]
        })
            }
    catch {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get tasks By API'
        })
    }
};
const createTask=async(req,res)=>{
    try{
        const {title,description,creationdate,duedate,assignment}=req.body
        if(!title || !description || !creationdate || !duedate || !assignment){
            return res.status(500).send({
                success: false,
                message: 'please provide all field'   
            })

        }
        const data=await db.query(`INSERT INTO task (title,description,creationdate,duedate,assignment) VALUES (?,?,?,?,?)`,[title,description,creationdate,duedate,assignment]);
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Error in INSERT query'
            })
        }
        res.status(201).send({
            success:true,
            message:"INSERTED" 
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating  Api'
        })
    }
    
}

const updateTask=async(req,res)=>{
    try{
        const taskID=req.params.id
        if(!taskID){
            return res.status(404).send({
                success:false,
                message:"invalid id"
            })
        }
        const {title,description,creationdate,duedate,assignment}=req.body
        const data=await db.query(`UPDATE task SET title=?,description=?,creationdate=?,duedate=?,assignment=?WHERE id=?`,[title,description,creationdate,duedate,assignment,taskID])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'error in updating'
            })
        }
        res.status(200).send({ 
            success:true,
            message:'updated task'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating Api'
        })
    }

}

const deleteTask =async(req,res)=>{
try{
    const taskID=req.params.id
    if(!taskID){
        return res.status(404).send({
            success:false,
            message:'invalid task id'
        })
    }
    await db.query(`DELETE FROM task WHERE id=?`,[taskID]);
    res.status(200).send({
        success:true,
        message:'task deleted'
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message: 'Error in deleting Api'
    })
}

}
module.exports = { getTasks,getTaskByID,createTask,updateTask,deleteTask};