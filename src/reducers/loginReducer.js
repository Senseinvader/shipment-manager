
const initState = {
  email: '',
  password: '',
  isLoggedIn: false,
  errorMessage: '',
  token: '',
  inProgress: false
}

const loginReducer = (state=initState, action) => {
  switch(action.type) {
    case 'USER_LOGGED_IN': 
      return {...state, isLoggedIn: true, errorMessage: '', token: action.token, email: '', password: ''};
    case 'USER_LOGGED_OUT': 
      return {...state, isLoggedIn: false, errorMessage: '', token: '', email: '', password: ''};
    case 'EMAIL_CHANGED':
      return {...state, email: action.email};
    case 'PASSWORD_CHANGED':
      return {...state, password: action.password};
    case 'ERROR_MESSAGE_SHOWN': 
      return {...state, errorMessage: action.errorMessage};
    default: 
      return state;
  }
}

export default loginReducer;