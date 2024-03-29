import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  //data is loading
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Button mr={4} color="white">
            login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button color="white">register</Button>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex>
      <Box mr={3}>{data.me.username}</Box>
      <Button variant="link">logout</Button>
      </Flex>
    )
  }
  return (
    <Flex bg="tomato" p="4">
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
