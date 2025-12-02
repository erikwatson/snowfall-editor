import ReactDOM from "react-dom/client";

import "./index.css";
import 'react-tooltip/dist/react-tooltip.css';

import { App } from "./app";

import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
