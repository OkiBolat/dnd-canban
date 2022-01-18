import { authService } from "../../services/auth.service";
import { LOG_IN, LOG_OUT } from "./actions";

export const logIn = (payload) => ({
  type: LOG_IN,
  payload
});

export const logOut = () => ({
  type: LOG_OUT
})

// THUNKS
export const logInThunk = (payload) => {
  return (dispatch) => {
    authService.logIn(payload).then(({data}) => {
      dispatch(logIn())
      localStorage.setItem('token', data.token)
    })
  }
};
