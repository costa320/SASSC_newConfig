import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
/* COMPONENTS */
/* VIEWS */
import HomePage from "./views/HomePage_/homePage.jsx";
import UploadFilesPage from "./views/UploadFilesPage_/UploadFilesPage.jsx";
import configureReportPage from "./views/ConfigureReport_/configureReportPage.jsx";
/* BROWSER HISTORY */
import { createBrowserHistory } from "history";
/* REDUX */
import store from "./redux/store.js";
import { Provider } from "react-redux";
/* STYLES */
import "./assets/styles/css/main/bootstrap.min.4.3.1.css";

const history = createBrowserHistory();

history.listen((location, action) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  );
  console.log(`The last navigation action was ${action}`);
});

function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/uploadFiles" component={UploadFilesPage} />
          <Route
            exact
            path="/configureReport"
            component={configureReportPage}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
