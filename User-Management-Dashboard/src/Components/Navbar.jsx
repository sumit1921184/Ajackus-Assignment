import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box
      as="header"
      w="100%"
      p={3}
      bg="blue"
      color="white"
      boxShadow="md"
    >
      <Flex justify="center" align="center">
        <Heading size="lg">User Management Dashboard</Heading>
      </Flex>
    </Box>
  );
};

export default Navbar;
