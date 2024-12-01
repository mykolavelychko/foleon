import NavBar from "@/components/nav-bar/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Flex flexDirection={"column"}>
      <NavBar />
      <Box overflowY={"auto"}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AppLayout;
