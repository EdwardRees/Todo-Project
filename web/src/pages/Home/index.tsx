import { Navbar } from "@todo/core-navbar";
import { ReactElement } from "react";
import { useAuth } from "@todo/state";

const Home = (): ReactElement => {
  const auth = useAuth();
  return (
    <>
      <Navbar isAuthenticated={auth.isAuthenticated} />
      <div className="bg-dark text-light" style={{ height: "100vh" }}>
        <div className="container text-center">
          <h1>Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
