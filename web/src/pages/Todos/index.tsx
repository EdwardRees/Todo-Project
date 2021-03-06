import { ReactElement, useState, useEffect } from "react";
import { useAuth } from "@todo/state";
import { Navbar } from "@todo/core-navbar";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getListItems } from "@todo/state/actions/list";
import {
  addTodo,
  markCompleteTodo,
  markIncompleteTodo,
  updateTodo,
  deleteTodo
} from "@todo/state/actions/todo";
import { TodoItem } from "@todo/components/TodoItem";

const Todos = ({
  getListItems,
  name,
  todos,
  addTodo,
  markCompleteTodo,
  markIncompleteTodo,
  updateTodo,
  deleteTodo
}: any): ReactElement => {
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getListItems(id);
    }
  }, [todos !== undefined && name !== undefined]);

  const handleNewTodo = (listId: string | undefined) => {
    if (listId) {
      addTodo(todoName, todoDesc, listId);
      setTodoName("");
      setTodoDesc("");
    }
  };

  const toggleComplete = (id: string, completed: boolean) => {
    if (completed) {
      markIncompleteTodo(id);
    } else {
      markCompleteTodo(id);
    }
  };

  const updateTodoItem = (name: string, desc: string, listId: number, id: number) => {
    updateTodo(name, desc, listId, id);
  }

  const deleteItem = (id: string | undefined) => {
    if(id){
      deleteTodo(id);
    }
  }

  return (
    <>
      <Navbar isAuthenticated={auth.isAuthenticated} />
      {name !== "" ? (
        <div className="bg-dark text-light" style={{ height: "100vh" }}>
          <div className="container text-center">
            <h1 className="pb-3">{name}</h1>
            <div>
              <div className="row pb-3">
                <label htmlFor="todo-name" className="col-form-label col-sm-2">
                  Todo Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="todo-name"
                    value={todoName}
                    onChange={(e) => setTodoName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row pb-3">
                <label htmlFor="todo-desc" className="col-form-label col-sm-2">
                  Todo Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="todo-desc"
                    value={todoDesc}
                    onChange={(e) => setTodoDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="pb-3">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleNewTodo(id);
                  }}
                >
                  Add Todo
                </button>
              </div>
            </div>
            <div className="pb-3"></div>
            <div className="pb-3"></div>
            <div>
              {todos?.map((todo: any) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  desc={todo.desc}
                  completed={todo.completed}
                  toggleComplete={toggleComplete}
                  listId={id}
                  updateTodo={updateTodoItem}
                  deleteTodo={deleteItem}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-dark text-light" style={{ height: "100vh" }}>
          <div className="container text-center">
            <h1 className="pb-3">List not found</h1>
            <div className="pb-3"></div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  name: state.list.name,
  todos: state.list.todos,
});

export default connect(mapStateToProps, {
  getListItems,
  addTodo,
  markCompleteTodo,
  markIncompleteTodo,
  updateTodo,
  deleteTodo
})(Todos);
