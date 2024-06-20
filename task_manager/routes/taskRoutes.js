const express=require('express')
const { getTasks, getTaskByID, createTask, updateTask, deleteTask } = require('../controllers/taskController')


const router=express.Router()

router.get('/getall',getTasks);
router.get('/get/:id',getTaskByID);
router.post('/create',createTask);
router.put('/update/:id',updateTask);
router.delete('/delete/:id',deleteTask);
module.exports=router