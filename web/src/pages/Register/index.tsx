import { Navbar } from "@todo/core-navbar";
import { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "@todo/state/actions/auth";

const Register = ({ register, auth }: any): ReactElement => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = { username: username, email: email, password: password };
    const registered = register(formData);
    if (registered === true) {
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };
  return (
    <>
      <Navbar isAuthenticated={auth?.isAuthenticated} />
      <div
        className="text-center bg-dark text-light flex"
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <div className="container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="text-left">
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <Link to="/login" className="btn btn-secondary">
                Already have an account
              </Link>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
