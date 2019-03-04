This project was created using React/Redux, React Router, redux-thunk middleware, designed using pure CSS and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How To Use

Before the first start of the application on your local machine run:

### `npm install`

Then, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Also it is possible to run the application deployed on Heroku by following [this link](https://shipment-manager.herokuapp.com).

The current version of the application design is to be used only on desktop systems. Critical reducing of the window size reduces the functionality of the application.

If you make the Send Shipment operation it won't delete a sent shipment from the shipment list (initially the application was relying on that), as probably the logic of the back-end has been changed (tested with Postman). Instead a sent shipment will be moved to the bottom of the list.

The application design doesn't let modifying names of shipments or items, instead it is possible to delete them from the database.

If the page is refreshed, user will be logged out from it (access token is being stored in the Redux store, storing of token in the localStorage can be implemented by request).
