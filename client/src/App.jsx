import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "./components/themeProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import { useFetchUser } from "./hooks/useFetchUser";

const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;