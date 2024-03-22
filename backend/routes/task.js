const express = require('express')
const router = express.Router()
const Task = require('../models/TaskSchema.js');
const fetchUser = require('../middleware/fetchUserMiddleware.js');

router.post('/createtask', fetchUser, async (req, res) => {
    try{
        const {task, category, date} = req.body;
        let newTask = new Task({ task, category, date, userId : req.user.id });
        newTask = await newTask.save();
        console.log(newTask);
        res.json(newTask);
    } catch(error){
        console.log('error creating task',error);
    }
})

router.get('/getalltasks', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.log("error finding tasks", error);
    }
})

router.get('/getspecifictask', fetchUser, async (req, res) => {
    try{
        const tasks = await Task.find({userId : req.user.id});
        res.json(tasks);
    } catch (error) {
        console.log("error finding tasks", error);
    }
})

router.delete('/deletetask/:id', async (req,res) => {
    try{
        const delId = req.params.id;
        const deletedTask = await Task.findOneAndDelete({ _id: delId })
        res.json(deletedTask);
    }catch (error) {
        console.log("error deleting tasks", error);
    }
})

router.put('/updatetask/:id', async (req,res) => {
    const taskId = req.params.id;
    const {task,category,date} = req.body;
    const updatedTask = await Task.updateOne({ _id: taskId }, { $set: { task, category, date } }, { upsert: true });
    res.json(updatedTask);
})

module.exports = router