import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
