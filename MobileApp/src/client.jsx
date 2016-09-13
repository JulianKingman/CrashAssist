import ReactDOM from 'react-dom';
import App from 'App/client/App.jsx';

Meteor.startup(() => {
    ReactDOM.render(<App/>, document.getElementById("react-app"));
});
