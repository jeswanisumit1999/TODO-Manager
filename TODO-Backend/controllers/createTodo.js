const Todo = require('../models/todo')

exports.createTodoController = async (req, res)=>{
    const {title} = req.body;
    const todo = new Todo({
        title
    })
    const createNewTodo = await todo.save()
    res.status(200).json(createNewTodo)
}

