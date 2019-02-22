
const initState = {
  isLoggedIn: false,
  errorMessage: ''
}

const loginReducer = (state=initState, action) => {
  switch(action.type) {
    case 'USER_LOGGED_IN': 
      return {...state, isLoggedIn: true, errorMessage: action.errorMessage};
    case 'USER_LOGGED_OUT': 
      return {...state, isLoggedIn: false, errorMessage: action.errorMessage}
    default: 
      return state;
  }
}

export default loginReducer;