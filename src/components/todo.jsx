import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useLocalStorage(`todos`, []);

  const addTodo = (newTodo) => {
    setTodos((todos) => {
      return [...todos, {task: newTodo, isCompleted : false}];
    });
  };

  const removeTodo = (index) => {
    setTodos((todos) => todos.filter((td, key) => key !== index));
  };

  const completTodo = (index) => {
    setTodos((todos) => todos.map((td, key) => {
      return key === index ? {...td, isCompleted : !td.isCompleted} : td
    }))
  }

  return (
    <div className="text-slate-900 md:flex flex flex-col justify-center items-center">
      <h1 className="text-4xl font-sans font-bold tracking-wide py-5 uppercase">To do List</h1>
      <div className="flex gap-2 justify-center my-5 mx-2 w-full max-w-sm md:w-96">
      <input
        className="p-2 bg-slate-50 placeholder-slate-500 rounded-l-full border-2 border-solid border-slate-400"
        type="text"
        value={todo}
        placeholder={`Write your new task here...`}
        onKeyDown={(e) => {
          if(e.code === `Enter`){
            if (todo) {
              addTodo(todo);
            } else {
              window.alert(`Task can't be empty, sorry :(`);
            }
            setTodo("");
          }
        }}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="material-icons bg-gradient-to-r from-slate-500 to-slate-400 p-2 text-white rounded-r-full hover:from-slate-800 hover:to-slate-600"
        onClick={() => {
          if (todo) {
            addTodo(todo);
          } else {
            window.alert(`Task can't be empty, sorry :(`);
          }
          setTodo("");
        }}
      >
        add
      </button>
      </div>
      <div className="w-full container max-w-sm md:w-96">
      <ul className="flex flex-col mx-2 my-5">
        {todos.map((todo, index) => {
          return (
            <li
              className="flex gap-2 justify-between items-center my-1" 
              key={index}>
              <p className={`${todo.isCompleted ? `bg-slate-600 line-through decoration-wavy` : `bg-slate-300 text-slate-900` } grow p-2 rounded`}>{todo.task}</p>
              <div className="flex gap-2 grow-0">
              <button
                className={`${todo.isCompleted ? `bg-slate-600` : `bg-slate-600/20` }  p-2 rounded hover:bg-slate-800`}
                onClick={() => completTodo(index)}>{todo.isCompleted ? `UnDone` : `Done`}</button>
              <button 
                className="bg-neutral-600 p-2 rounded hover:bg-neutral-500 material-icons text-white"
                onClick={() => removeTodo(index)}>delete</button>
              </div>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

export default App;
