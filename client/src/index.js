import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.action";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./actions/post.actions";
import { ThreadProvider } from "./components/Context/ThreadContext";
import { ProfilProvider } from "./components/Context/ProfilContext";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ProfilProvider>
      <ThreadProvider>
        <App />
      </ThreadProvider>
    </ProfilProvider>
  </Provider>
);
