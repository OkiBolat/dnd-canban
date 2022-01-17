import React from "react";
import { useSelector} from "react-redux";
import { Navigate } from "react-router-dom";

const WithAuthRedirect = (Component) => {
  

  return function Wrapper(props){
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    // const token = localStorage.getItem('token');

    if (!isAuthorized) return <Navigate to="/login" />
    return <Component {...props} />;
  }
};

export default WithAuthRedirect;
