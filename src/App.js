import React, { useState, useEffect } from 'react';
import './App.css';

const removeIcon = <svg t="1593795900556" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1152" width="200" height="200"><path d="M580.87936 509.58336l373.30944-373.30944c18.8672-18.87232 18.8672-49.84832 0-68.72064l-2.048-2.048c-18.8672-18.8672-49.8432-18.8672-68.7104 0L510.11072 439.296 136.8064 65.35168c-18.87232-18.8672-49.84832-18.8672-68.72064 0l-2.04288 2.048a47.94368 47.94368 0 0 0 0 68.7104l373.30944 373.47328L66.048 882.8928c-18.8672 18.8672-18.8672 49.84832 0 68.71552l2.048 2.048c18.8672 18.8672 49.8432 18.8672 68.7104 0l373.31456-373.31456 373.30944 373.31456c18.87232 18.8672 49.84832 18.8672 68.72064 0l2.04288-2.048c18.87232-18.8672 18.87232-49.84832 0-68.71552l-373.30944-373.30944z" p-id="1153"></path></svg>
const completeIcon = <svg t="1593797337875" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3299" width="200" height="200"><path d="M499.7587 800.00032 184.85566 474.771097l80.721463-65.702398 182.094268 145.004535c74.617441-90.096994 240.284575-268.907473 468.845131-411.111219l19.241226 45.057195C725.971791 383.722428 554.202683 659.205667 499.7587 800.00032L499.7587 800.00032 499.7587 800.00032zM894.33329 417.391249c7.199982 29.791513 11.047614 60.889789 11.047614 92.89369 0 217.60197-176.406732 394.009725-394.018935 394.009725-217.604016 0-394.013819-176.411849-394.013819-394.009725 0-217.60811 176.408779-394.017912 394.013819-394.017912 54.121642 0 105.691157 10.921747 152.634306 30.66644L663.996275 92.050486c-47.605228-17.377786-99.013061-26.861788-152.634306-26.861788-245.815545 0-445.092148 199.276602-445.092148 445.096241 0 245.810429 199.276602 445.087031 445.092148 445.087031 245.820662 0 445.095217-199.276602 445.095217-445.087031 0-31.858592-3.354398-62.932308-9.717316-92.89369L894.33329 417.391249 894.33329 417.391249zM894.33329 417.391249" p-id="3300"></path></svg>
const uncompleteIcon = <svg t="1593797406898" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4022" width="200" height="200"><path d="M512 949.138286c238.72 0 437.138286-197.997714 437.138286-437.138286 0-238.72-198.857143-437.138286-437.577143-437.138286C272.438857 74.861714 74.88 273.28 74.88 512c0 239.140571 197.997714 437.138286 437.138286 437.138286z m0-72.850286C309.705143 876.288 148.114286 714.276571 148.114286 512c0-201.874286 161.152-364.288 363.446857-364.288 201.856 0 364.269714 162.432 364.708571 364.288 0.420571 202.294857-162.432 364.288-364.288 364.288z" p-id="4023"></path></svg>

const INIT_TODOS = [
  {
    text: 'learn react',
    isComplete: false
  },
  {
    text: 'meet friends',
    isComplete: false
  }
]

function Todo({ index, todo, removeTodo, completeTodo }) {
  return (
  <div className="todo">
    <div className="task" style={{ textDecoration: todo.isComplete? 'line-through' : '' }}>
      <a href="#!" className="complete" onClick={(e) => completeTodo(e, index)}>
        { todo.isComplete? completeIcon : uncompleteIcon }
      </a>
      { todo.text }
    </div>
    <a href="#!" className="remove" onClick={(e) => removeTodo(e, index)}>
      { removeIcon }
    </a>
  </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return
    }
    addTodo(value);
    setValue('');
  }
  return (
    <form onSubmit={ handleSubmit }>
      <input 
        className="input"
        value={ value }
        onChange={(e) => setValue(e.target.value)} 
      />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || INIT_TODOS);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = text => {
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
  }
  const removeTodo = (e, index) => {
    e.preventDefault()
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  const completeTodo = (e, index) => {
    e.preventDefault()
    const newTodos = [...todos]
    newTodos[index].isComplete = !(newTodos[index].isComplete)
    setTodos(newTodos)
  }
  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={ addTodo }></TodoForm>
        {
          todos.map((todo, index) => (
            <Todo index={index} key={index} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo}></Todo>
          ))
        }
      </div> 
    </div>
  );
}

export default App;
