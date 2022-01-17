import { LOG_IN, LOG_OUT } from "./actions";

const initialState = {
  isAuthorized: false
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return {
        isAuthorized: true
      }
    case LOG_OUT:
      return {
        isAuthorized: false
      }
    default:
      return state;
  }
};

export default authReducer;