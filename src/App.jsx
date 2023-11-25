// import logo from './logo.svg';
import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleRandom = () => {
    if (todos.length === 0) return;
    const todoIndexNum = Math.floor(Math.random() * todos.length);

    const selectedTodoName = todos[todoIndexNum].name;
    setTodoName(selectedTodoName);
  };

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <div>
        <button onClick={handleAddTodo}>タスクを追加</button>
      </div>
      <div>
        <button onClick={handleClear}>完了したタスクの削除</button>
      </div>
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
      <hr />
      <button onClick={handleRandom}>次に行うタスクをランダムに選ぶ</button>
      <div>
        次に行うタスク：
        {todoName}
      </div>
    </div>
  );
}

export default App;
