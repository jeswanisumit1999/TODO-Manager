import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const TodoContext = createContext({});

let token = null;
export const TodoState = (props) => {
const [todos, setTodos] = useState([])   
const [config, setConfig] = useState( null );

useEffect(() => {
  setConfig({
    headers: {
      "auth-token": token,
    },
  });
  console.log(config);
}, [token, config]);

const login = async (email, password) => {
    const apiData = {
        email, password
    }
    await axios
      .post("http://localhost:4000/api/login", apiData)
      .then((res) => {
        token = res.data["token"];
        console.log("Token assigned : ",token)
        setConfig({
          headers: {
            "auth-token": token,
          },
        });
      })
      .catch((err) => console.error(err));
      console.log("Token before calling get todo : ", token);
      GetTodos();
      console.log("token value" )
      if (token){
        return true
      }
      else{
        return false
      }
}
    
  const deleteTodo = (todoId) => {
    console.log(config)
    const apiData = {
      todoId,
    };
    axios
      .post("http://localhost:4000/api/deleteTodo", apiData, config)
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };


  function GetTodos() {
    console.log("Token in getTodo : ", token);
    // console.log("SET CONFIG", { config });
    axios
      .get("http://localhost:4000/api/getAllTodos", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }
  const addTodo = (title, tasks) => {
    const apiData = {
      title: title,
      tasks: tasks,
    };
    console.log(token)
    axios
      .post("http://localhost:4000/api/createTodo", apiData, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const addTask = (id, task, title) => {
    for(let i=0; i<todos.length; i++)
    {
        if(todos[i]._id === id){
            todos[i].tasks.push(task)
            updateTodo(id, title, todos[i].tasks);
            break;
        }
    }
  }

  const deleteTask = (id, task, title, index) => {
    console.log(id)
    for (let i = 0; i < todos.length; i++) {
      if (todos[i]._id === id) {
        todos[i].tasks.splice(index,1)
        console.log(id, title, todos[i].tasks);
        updateTodo(id, title, todos[i].tasks);
        break;
      }
    }
  };

  const editTask = (id, task, title, index) => {
    // console.log(id);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i]._id === id) {
        todos[i].tasks[index] = task;
        console.log(index,id, title, todos[i].tasks);
        updateTodo(id, title, todos[i].tasks);
        break;
      }
    }
  };

  const updateTodo = (todoId, title, tasks) => {
    const apiData = {
      todoId,
      title,
      tasks,
    };

    axios
      .put("http://localhost:4000/api/editTodo", apiData, config)
      .then((res) => {
        setTodos(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  
  return (
    <TodoContext.Provider value={{login, config, todos, addTodo, deleteTodo, addTask, deleteTask, editTask }}>
      {props.children}
    </TodoContext.Provider>
  );
};



