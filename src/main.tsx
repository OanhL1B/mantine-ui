import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { myTheme } from "./theme/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
    <Notifications position="top-right" />
    {/* <React.StrictMode> */}
      <ModalsProvider>
        <App />
      </ModalsProvider>
    {/* </React.StrictMode> */}
  </MantineProvider>
);
