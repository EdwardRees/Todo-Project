import { Navbar } from "@todo/core-navbar";
import { ReactElement } from "react";
import { useAuth } from "@todo/state";
import { Link } from "react-router-dom";

const Home = (): ReactElement => {
  const auth = useAuth();
  return (
    <>
      <Navbar isAuthenticated={auth.isAuthenticated} />
      <div className="bg-dark text-light" style={{ height: "100vh" }}>
        <div className="container text-center">
          <h1>Home</h1>
          <p>
            Welcome to a simple Todo list project written using the PERN stack.
            The PERN stack consists of PostgreSQL, ExpressJS, React, and NodeJS.
            This version uses TypeScript as the main language due to the
            benefits gained from a strongly typed language.
          </p>
          <p>
            To begin, create an account by going to the{" "}
            <Link to="/register">Register</Link> page or if you already have an
            account, by going to the <Link to="/login">Login</Link> page.
          </p>
          <p>
            This project is open-sourced and will be used to teach basic
            fullstack web development. While the overarching tech stack is PERN
            Stack, the backend uses Prisma as the ORM of choice to access the
            PostgreSQL database. The source code of this project is hosted on
            GitHub and this live site is hosted on a Linode server instance.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
