import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : (f) => f
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
