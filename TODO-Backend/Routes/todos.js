const fetchUser = require('../middleware/fetchUser');
const Todo = require("../models/Todo")
const router = require('express').Router();
const {body, validationResult} = require('express-validator');

router.get('/getAllTodos',fetchUser,async (req,res)=>{
    
    //*Get all todos, filter them by UserId
   try { 
    const todos = await Todo.find({user: req.user.id})
    res.status(200).send(todos)
    }catch(err){
        console.log('error while fetching user ToDos =>');
        console.log(err.message)
        res.status(500).send("error while fetching user ToDos")
    }
})


router.post('/createTodo',[
    body('title',"title can not be empty").exists(),
],fetchUser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try{
    const {title, tasks} = req.body

    const todo = await Todo.create({
        user: req.user.id, title, tasks
    })
    const todos = await Todo.find({user: req.user.id})
    res.status(200).send(todos)
    // res.status(200).send(todo)
    
    }catch(err){
        console.log('error while Creating ToDos =>');
        console.log(err.message)
        res.status(500).send("error while Creating ToDos")
    }
})

router.put('/editTodo',fetchUser,async (req,res)=>{
    try{
        const {todoId, title, tasks} = req.body
        //* check if task id is correct
        const todo = await Todo.findById(todoId)
        if(!todo){
            return res.status(401).send("Requested paramets are invalid")
        }
        if(!(title && tasks)){
            return res.status(401).send("Requested paramets are invalid")
        }
        //* update task by task id
        const updatedTodo = await Todo.findByIdAndUpdate(todoId,{title,tasks})
        // res.status(200).send(updatedTodo)
        const todos = await Todo.find({user: req.user.id})
        res.status(200).send(todos)

    }catch(err){
        console.log('error while editing ToDo =>');
        console.log(err.message)
        res.status(500).send("error while editing ToDo")
    }
})

router.delete('/deleteTodo',fetchUser,async (req,res)=>{
    try{
        const {todoId} = req.body
        //* check if task id is correct
        const todo = await Todo.findById(todoId)
        if(!todo){
            return res.status(401).send("Requested paramets are invalid")
        }
        
        //* update task by task id
        const deletedTodo = await Todo.findByIdAndRemove(todoId)
        // res.status(200).send(deletedTodo)
        const todos = await Todo.find({user: req.user.id})
        res.status(200).send(todos)

    }catch(err){
        console.log('error while updating ToDo =>');
        console.log(err.message)
        res.status(500).send("error while updating ToDo")
    }
})

module.exports = router;