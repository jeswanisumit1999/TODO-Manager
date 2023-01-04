import React, { useContext } from 'react'
import { TodoContext } from '../Context/TodoContext'
import Todo from './Todo'
import './inputStyle.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Body() {
    const a = useContext(TodoContext)
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    const titleEvent = (event) =>{
        setTitle( event.target.value )
    }
    const addTodo = (event) => {
        console.log("add Todo function")
        try{
          a.addTodo(title, []);
        }
        catch(err){
          alert(err)
          navigate("/Signin")
        }
        event.preventDefault()
        setTitle("")
    }
  return (
    <div className="flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:px-80 min-h-screen">
      <div className="w-screen flex justify-end p-5">
        <button onClick={()=>{navigate("/Signin")}} className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Logout
        </button>
      </div>
      <div className="font-extrabold text-4xl md:text-8xl italic text-white underline decoration-double mt-12">
        TODO
        <span className="text-2xl md:text-4xl text-yellow-400">
          - Task Manager
        </span>
      </div>
      <div className="flex gap-8 mt-10">
        <form className="flex gap-8 mt-10" onSubmit={addTodo}>
          <div className="input-wrapper">
            <input
              type="text"
              size={50}
              placeholder="Add Todo ...."
              className="input input-bordered input-info text-white"
              onChange={titleEvent}
              value={title}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 px-8 rounded text-white text-xl"
          >
            Add
          </button>
        </form>
      </div>
      <ul className="w-full">
        {a.todos.map((todo, index) => (
          <Todo
            key={index}
            id={todo._id}
            title={todo.title}
            tasks={todo.tasks}
          />
        ))}
      </ul>
    </div>
  );
}

export default Body