
const initState = {
  email: '',
  password: '',
  isLoggedIn: false,
  errorMessage: '',
  token: '',
  inProgress: false,
  redirectTo: null
}

const loginReducer = (state=initState, action) => {
  switch(action.type) {
    case 'USER_LOGGED_IN': 
      return {...state, isLoggedIn: true, errorMessage: '', token: action.token};
    case 'USER_LOGGED_OUT': 
      return {...state, isLoggedIn: false, errorMessage: '', token: action.token};
    case 'EMAIL_CHANGED':
      return {...state, email: action.email};
    case 'PASSWORD_CHANGED':
      return {...state, password: action.password}
    default: 
      return state;
  }
}

export default loginReducer;