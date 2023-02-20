import { Box } from "@chakra-ui/layout";
import React from "react";

interface WrapperProps {
    variant?: "small" | "regular"
    children: string | JSX.Element | JSX.Element[]
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant="regular" }) => {
  return (
    <Box maxW={variant === "regular" ? "800px" : "400px"} mt={8} mx="auto" w="100%">
      {children}
    </Box>
  );
};
