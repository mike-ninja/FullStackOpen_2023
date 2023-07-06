import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationContextProvider } from "./context/NotificationContext";
import { UserContextProvider } from "./context/UserContext";

import { Provider } from "react-redux";
import store from './store'
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>,
);
