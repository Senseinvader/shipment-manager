
const initState = {
  user: null,
  isLoggedIn: false
}

const loginReducer = (state=initState, action) => {
  switch(action.type) {
    case 'USER_LOGGED_IN': 
      return {...state, isLoggedIn: true, user: action.user};
    case 'USER_LOGGED_OUT': 
      return {...state, isLoggedIn: false, user: null}
    default: 
      return state;
  }
}

export default loginReducer;