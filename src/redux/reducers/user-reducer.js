import { USER_LOGIN, USER_LOGOUT } from "../../constants/action-types";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
}

const sampleUserDetails = {
  id: 1,
  username: 'admin',
  firstName: 'Admin',
  lastName: 'Admin',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: sampleUserDetails,
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
}