import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoPerPage, setTodoPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(todos.length / todoPerPage);
  //Displaying Page no.'s at the bottom of the browser page
  const pagesIndex = Array(totalPages + 1)
    .fill("")
    .map((el, i) => i)
    .slice(1);
  const indexOfLastTodo = currentPage * todoPerPage;
  //At last in slice methhod the last index will be ignored-so not to worry
  const indexOfFirstTodo = indexOfLastTodo - todoPerPage;
  //Per Page visible todos
  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then((res) => setTodos(res.data));
  }, []);

  //Event Handlers
  const PreviousHandler = () => {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  };
  const NextHandler = () => {
    if (currentPage < totalPages)
      setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div className="container">
      {/* dropdown to select no. of todos per page */}
      <select onChange={(e) => setTodoPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>

      {/* Mapping of all the todos */}
      <div>
        {visibleTodos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>

      {/* Mapping of page numbers */}
      <div className="page-index">
        <span onClick={PreviousHandler}>Prev</span>
        {pagesIndex.map((el) => (
          <span
            key={el}
            onClick={() => setCurrentPage(el)}
            className={`${currentPage === el ? "active" : ""}`}
          >{`${el} | `}</span>
        ))}
        <span onClick={NextHandler}>Next</span>
      </div>
    </div>
  );
};

export default App;
