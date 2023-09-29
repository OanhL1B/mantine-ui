import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { menuSidebar } from "../../route/routeSideBar";
import { Box } from "@mantine/core";

const Link = function ({ to, className, children, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        [className, isActive ? "is-active" : null].filter(Boolean).join(" ")
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

const NavLinkMenu = styled(Link)`
  color: gray;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: row;
  font-weight: 700;

  &.is-active {
    color: #2d3748;
  }
`;


export function MenuItem() {
  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        padding: theme.spacing.xl,
      })}
    >
      {menuSidebar.map((element) => (
        <div key={element.id}>
          <NavLinkMenu to={element.path}>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "20px" }}>{element.icon}</div>
              <div>{element.label}</div>
            </div>
          </NavLinkMenu>
        </div>
      ))}
    </Box>
  );
}
