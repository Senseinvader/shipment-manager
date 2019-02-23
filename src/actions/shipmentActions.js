
export const fetchShipments = (token) => {
  return dispatch => {
    fetch('https://api.shipments.test-y-sbm.com/shipment', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}`}
    })
    .then(results => {
      return results.json();
    })
    .then(data => {
      console.log(data);
      dispatch({type: 'SHIPMENT_FETCHED', data: data})
    })
    .catch(err => console.log(err.message));
  }
}

export const createShipment = (name, token) => {
  let id = createRandomIntegerId();
  return dispatch => {
    fetch('https://api.shipments.test-y-sbm.com/shipment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        id: id,
        name: name
      })
    })
    .then(() => {
      let shipment = {id: id, name: name};
      dispatch({type: 'SHIPMENT_CREATED', shipment: shipment});
    })
    .catch(err => console.log(err.message));
  }
}

const createRandomIntegerId = () => {
  let x = Math.floor((Math.random() * 10000000) + 1);
  let y = Math.floor((Math.random() * 10000000) + 10000000);
  return x+y;
}