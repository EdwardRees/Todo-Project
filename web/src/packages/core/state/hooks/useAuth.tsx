import { useSelector } from "react-redux";

/*
Create a custom hook that returns the auth object from the redux store
*/
const useAuth = () => {
  const auth = useSelector((state: any) => state.auth);
  return auth;
};

export { useAuth };
