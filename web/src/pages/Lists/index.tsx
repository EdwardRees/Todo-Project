import { Navbar } from "@todo/core-navbar";
import { useAuth } from "@todo/state";
import { addTodoList, getTodoList } from "@todo/state/actions/list";
import { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Lists = ({ getTodoList, addTodoList, todoLists }: any): ReactElement => {
  const auth = useAuth();
  useEffect(() => {
    getTodoList();
  }, [todoLists !== undefined]);
  const [listName, setListName] = useState("");
  const addList = (e: any) => {
    e.preventDefault();
    addTodoList(listName);
    setListName("");
  };
  return (
    <>
      <Navbar isAuthenticated={auth.isAuthenticated} />
      <div className="bg-dark text-light" style={{ height: "100vh" }}>
        <div className="container text-center">
          <h1>Lists</h1>
          <div className="row pb-3">
            <label htmlFor="listname" className="col-form-label col-sm-2">
              New List
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="listname"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary" onClick={addList}>
                Add List
              </button>
            </div>
          </div>
          <div className="pb-3"></div>
          <div className="pb-3"></div>
          <div className="pb-3"></div>
          <div className="row">
            {todoLists?.map((list: any) => (
              <div className="col-md-4" key={list.id}>
                <Link to={`/list/${list.id}`}>
                  <div className="card text-bg-info">
                    <div className="card-body">
                      <h5 className="card-title">{list.name}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  todoLists: state.list.todoLists,
});

export default connect(mapStateToProps, { getTodoList, addTodoList })(Lists);
