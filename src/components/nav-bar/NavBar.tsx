import { Flex, HStack } from "@chakra-ui/react";
import { StyledNavLink } from "./NavBar.styles";

const NavBar = () => {
  return (
    <Flex
      h={16}
      paddingLeft={8}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <HStack gap={8} alignItems={"center"}>
        <HStack as={"nav"} gap={8} display={{ base: "none", md: "flex" }}>
          <StyledNavLink
            to={"documents"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Documents
          </StyledNavLink>
          <StyledNavLink
            to={"projects"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Projects
          </StyledNavLink>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default NavBar;
