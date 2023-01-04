import React, { useContext, useState } from 'react'
import { TodoContext } from '../Context/TodoContext';

function Task(props) {
    const context = useContext(TodoContext)
    const [edit, setEdit] = useState(false)
    const [taskValue, setTaskValue] = useState(props.task);
    const deleteTask = () => {
        console.log({
          id: props.id,
          task: props.task,
          title: props.title,
          index: props.index,
        });
        context.deleteTask(props.id, props.task, props.title, props.index);
    }

    const editTask = () => {
        setEdit(true)
    }

    const saveTaskValue = () => {
        context.editTask(props.id, taskValue, props.title, props.index);
        setEdit(false);
    }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center p-2 mb-4 rounded bg-slate-400 md:mx-8">
        {!edit ? (
          <p className="mr-4 text-xl font-bold">
            <i className="fa-regular fa-circle-check mr-2 font-bold"></i>
            {props.task}
          </p>
        ) : (
          <input
            className="p-2 rounded"
            type="text"
            value={taskValue}
            onChange={(event) => {
              setTaskValue(event.target.value);
            }}
          />
        )}
        <div>
          {edit ? (
            <button onClick={saveTaskValue} className="btn mr-4">
              <i className="fa-solid fa-check text-xl text-blue-500 bg-white px-2 py-1 rounded"></i>
            </button>
          ) : (
            <button onClick={editTask} className="btn mr-4">
              <i className="fa-solid fa-pen-to-square text-xl text-blue-500 bg-white px-2 py-1 rounded"></i>
            </button>
          )}
          <button onClick={deleteTask} className="btn">
            <i className="fa-solid fa-trash text-red-600 bg-red-100 p-3 rounded"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Task