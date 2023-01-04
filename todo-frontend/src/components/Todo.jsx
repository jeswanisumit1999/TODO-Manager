import React, { useState, useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import Task from "./Task";

export default function Todo(props) {
    // let hide = true
    const context = useContext(TodoContext)
    let [hide, setHide] = useState(true);
    let [newTask, setNewTask] = useState(null)
    const changeTaskState = () => {
        // console.log(hide);
        if (hide === true) {
            setHide(false)
        }
        else {
            setHide(true)
        }
        // console.log(hide);
    }

    const deleteTodo = () => {
        context.deleteTodo(props.id)
    }

    const addTaskEvent = (event) => {
        setNewTask(event.target.value);
        // event.preventDefault()
    }
    const addTask = (event) => {

        event.preventDefault();
        context.addTask(props.id, newTask, props.title);
        setNewTask("")
    }

    return (
      <div className="border-2 rounded text-black m-4 bg-gray-800">
        <div className="flex flex-col md:flex-row gap-5 items-center p-5 border-b-4 justify-between">
          <h2
            onClick={changeTaskState}
            className="font-bold text-2xl text-white"
          >
            <i className="fa-solid fa-list-check mr-2 text-yellow-300"></i>
            {props.title}
          </h2>
          <div>
            <button onClick={deleteTodo} className="btn">
              <i className="fa-solid fa-trash text-red-500 bg-red-100 p-3 rounded"></i>
            </button>
            <button
              onClick={changeTaskState}
              className="text-xl text-white p-4"
            >
              {props.tasks.length} tasks
            </button>
          </div>
        </div>
        <div className={`flex flex-col gap-3 my-4 ${hide ? "hidden" : ""}`}>
          <ul>
            {props.tasks.map((item, index) => (
              <>
                <p>{index}</p>
                <Task
                  key={index}
                  index={index}
                  title={props.title}
                  task={item}
                  id={props.id}
                />
              </>
            ))}
          </ul>
          <form onSubmit={addTask} className="flex justify-start md:ml-8">
            <input
              type="text"
              placeholder="Add Task ...."
              className="input input-bordered input-info mr-4"
              onChange={addTaskEvent}
              value = {newTask}
            />
            <button
              type="submit"
              className="bg-blue-500 px-8 rounded text-white text-xl"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    );
}
