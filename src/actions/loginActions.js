

const userLoggedIn = () => ({
  type: 'USER_LOGGED_IN'
})

export const handleLogin = (email, password) => {
  dispatch => {
    fetch('https://api.shipments.test-y-sbm.com/login', {
      method: postMessage,
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if(response.status !== 200) {
        console.log('Wrong cred')
      } else {
        return response.json();
      }
    })
    .then(data => {
      localStorage.setItem('token', data.token);
      dispatch(userLoggedIn());
    })
  }
}