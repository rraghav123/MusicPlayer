import React, { PureComponent } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./Routes";
import store from "./store/store";

const history = createHistory();

class App extends PureComponent {
  render () {
    return (
      <div style={{ height: "100%" }}>
        <ToastContainer
          position="bottom-right"
          closeOnClick
        />
        <BrowserRouter history={history}>
          <Provider store={store}>
            <Routes />
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDom.render((
  <App />
), document.getElementById("root"));
