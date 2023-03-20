import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import { theme } from "@/components";
import store from "@/lib/store";
import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
