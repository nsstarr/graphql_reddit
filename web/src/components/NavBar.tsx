import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="tomato" p="4">
      <Box ml={"auto"}>
        <NextLink href="/login">
          <Button mr={4} color="white">
            login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button color="white">register</Button>
        </NextLink>
      </Box>
    </Flex>
  );
};
