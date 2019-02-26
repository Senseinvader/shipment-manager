
export const validateForm = (email, password) => {
  return dispatch => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      dispatch(sendErrorMessage('Please provide an email address.'));
    } else if (!regex.test(email)) {
      dispatch(sendErrorMessage('That is not a valid email.'));
    } else if (!password) {
      dispatch(sendErrorMessage('You forgot about password'));
    } else {
      dispatch(handleLogin(email, password));
    }
  }
}

const handleLogin = (email, password) => {
  return dispatch => {
    fetch('https://api.shipments.test-y-sbm.com/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if(response.status !== 200) {
        dispatch(sendErrorMessage('Wrong credentials!'));
      } else {
        return response.json();
      }
    })
    .then(data => {
      dispatch(userLoggedIn(data.data[0].token));
    })
    .catch(err => dispatch(sendErrorMessage('Wrong creadentials - ' + err.message)));
  }
};

const userLoggedIn = (token) => ({
  type: 'USER_LOGGED_IN',
  token: token
});

const sendErrorMessage = (message) => ({
  type: 'ERROR_MESSAGE_SHOWN',
  errorMessage: message
});