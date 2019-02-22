export const handleLogin = (email, password) => {
  console.log(email, password);
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
        console.log('Wrong cred');
        dispatch(sendErrorMessage('Wrong credentials!'));
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('Success', data.data[0].token)
      dispatch(userLoggedIn(data.data[0].token));
    })
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