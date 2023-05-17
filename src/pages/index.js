import { useEffect, useState } from "react";
import ToDo from "../../components/toDo";
import {
  getAllTodo,
  addTodo,
  updatedTodo,
  deleteTodo,
} from "../../components/handleApi";
export default function Home() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [updateTodo, setUpdateTodo] = useState(false);
  const [todoId, setTodoId] = useState("");
  useEffect(() => {
    getAllTodo(setTodo);
  }, []);

  const updateMode = (_id, text) => {
    setUpdateTodo(true);
    setText(text);
    setTodoId(_id);
  };

  return (
    <div>
      <div className="container">
        <h1>Todo App</h1>
        <div className="main">
          <div className="Top">
            <input
              type="text"
              placeholder="Add Todos"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div
            className="add"
            onClick={
              updateTodo
                ? () =>
                    updatedTodo(todoId, text, setTodo, setText, setUpdateTodo)
                : () => addTodo(text, setText, setTodo)
            }
          >
            {updateTodo ? "Update" : "Add"}
          </div>
        </div>
      </div>
      <div className="list">
        {todo.map((item) => (
          <ToDo
            key={item._id}
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteTodo={() => deleteTodo(item._id, setTodo)}
          />
        ))}
      </div>
    </div>
  );
}
