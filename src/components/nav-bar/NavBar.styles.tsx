import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const StyledNavLink = styled(NavLink)`
  font-size: 18px;

  &.active {
    font-weight: bold;
  }

  &:hover {
    color: #a1a1aa;
  }
`;
