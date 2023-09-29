import { MenuItem } from "@/layout/sidebar/MenuItem";
import { MediaQuery, Title } from "@mantine/core";
import { AppShell, Navbar } from "@mantine/core";
import { Outlet } from "react-router-dom";
import HeaderCustom from "./header/HeaderCustom";
import { CartProvider } from "@/context/CartContext";

const DefaultLayout = () => {
  return (
    <CartProvider>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={<HeaderCustom />}
        navbar={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Navbar
              id="sidebar"
              p="xs"
              hiddenBreakpoint="sm"
              width={{ sm: 200, lg: 300 }}
            >
              <div style={{ borderBottom: "2px solid #E2E8F0" }}>
                <Title
                  order={3}
                  weight={700}
                  align="center"
                  my={40}
                  color="#1b254b"
                >
                  HORIZON FREE
                </Title>
              </div>
              <MenuItem />
            </Navbar>
          </MediaQuery>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Outlet />
      </AppShell>
    </CartProvider>
  );
};
export default DefaultLayout;
