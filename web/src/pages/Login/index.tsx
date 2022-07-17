import { Navbar } from "@todo/core-navbar";
import { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "@todo/state/actions/auth";

const Login = ({
  login,
  auth,
}: {
  login: Function;
  auth: any;
}): ReactElement => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = { email: email, password: password };
    const loggedIn = login(formData);
    if (loggedIn) {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  }
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
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="text-left">
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Link to="/register" className="btn btn-secondary">
                Create an account
              </Link>
            </div>
            <button type="submit" className="btn btn-primary">
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

export default connect(mapStateToProps, { login })(Login);
