
const initState = {
  isLoggedIn: false
}

const loginReducer = (state=initState, action) => {
  switch(action.type) {
    case 'USER_LOGGED_IN': 
      return {...state, isLoggedIn: true};
    case 'USER_LOGGED_OUT': 
      return {...state, isLoggedIn: false}
    default: 
      return state;
  }
}

export default loginReducer;