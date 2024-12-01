import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

function ErrorState({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      {children}
    </Box>
  );
}

export default ErrorState;
