"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";

export default function FooterSection() {
  return (
    <Box background="linear-gradient(135deg, #83EAF1, #63A4FF)">
      <Container as={Stack} maxW={"6xl"} py={10}></Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        ></Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2024 BreakingCode. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
