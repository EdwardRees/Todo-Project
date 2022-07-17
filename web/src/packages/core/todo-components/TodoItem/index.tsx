import { ReactElement, useState } from "react";

type Props = {
  key: number;
  id: string;
  name: string;
  desc: string;
  completed: boolean;
  listId?: string;
  toggleComplete: Function;
  updateTodo: Function;
  deleteTodo: Function;
};

const TodoItem = ({
  key,
  id,
  name,
  desc,
  completed,
  listId,
  toggleComplete,
  updateTodo,
  deleteTodo
}: Props): ReactElement => {
  const [updateComplete, setUpdateComplete] = useState(completed);
  const [updateName, setUpdateName] = useState(name);
  const [updateDesc, setUpdateDesc] = useState(desc);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingName, setUpdatingName] = useState(name);
  const [updatingDesc, setUpdatingDesc] = useState(desc);

  const handleUpdate = () => {
    updateTodo(updateName, updateDesc, listId, id);
    setIsUpdating(!isUpdating);
    setUpdateName(updatingName);
    setUpdateDesc(updatingDesc);
  }

  const handleUpdateComplete = () => {
    setUpdateComplete(!updateComplete);
  };

  return (
    <>
      {!isUpdating ? (
        <div className="bg-dark row" key={key}>
          <div className="col-md-4 row">
            <label
              htmlFor="todo-complete"
              className="col-form-label col-sm-2"
              style={{ marginLeft: "10px" }}
            >
              {updateComplete ? "✅" : "❌"}
            </label>
            <p className="col-form-label col-sm-4">{updateName}</p>
          </div>
          <div className="col-md-4">
            <p className="col-form-label col-sm-6">{updateDesc}</p>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-warning"
              onClick={() => {
                handleUpdateComplete();
                toggleComplete(id, updateComplete);
              }}
            >
              {updateComplete ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button className="btn btn-info" onClick={() => setIsUpdating(!isUpdating)}>Update</button>
            <button className="btn btn-danger" onClick={() => deleteTodo(id)}>Delete</button>
          </div>
        </div>
      ) : (
        <div className="bg-dark row" key={key}>
          <div className="col-md-4 row">
            <label
              htmlFor="todo-complete"
              className="col-form-label col-md-1 col-sm-1"
              style={{ marginLeft: "10px" }}
            >
              {updateComplete ? "✅" : "❌"}
            </label>
            <div className="col-md-10 col-sm-10">
              <input
                type="text"
                className="form-control"
                value={updatingName}
                onChange={(e) => setUpdatingName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <textarea
              className="form-control"
              value={updatingDesc}
              onChange={(e) => setUpdatingDesc(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-warning"
              onClick={() => {
                handleUpdateComplete();
              }}
            >
              {updateComplete ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button className="btn btn-info" onClick={() => handleUpdate()}>Save</button>
            <button className="btn btn-danger" onClick={() => setIsUpdating(!isUpdating)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export { TodoItem };
