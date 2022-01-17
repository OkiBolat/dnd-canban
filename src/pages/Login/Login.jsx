import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { logInThunk } from "../../store/auth/actionCreators";
import "./Login.css"

const Login = () => {
  const dispatch = useDispatch()
  const isAuthorized = useSelector(state => state.auth.isAuthorized)

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const onChange = ({ target }) => {
    setFormData((data) => ({ ...data, [target.placeholder]: target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(logInThunk(formData))
  }
  if (isAuthorized) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className='form'>
        <input onChange={onChange} type="text" id="login" className="fadeIn second" name="login" placeholder="username" />
        <input onChange={onChange}type="text" id="password" className="fadeIn third" name="login" placeholder="password" />
        <input type="submit" className="fadeIn fourth" value="Log In" />
      </form>
    </div>
  )
}

export default Login