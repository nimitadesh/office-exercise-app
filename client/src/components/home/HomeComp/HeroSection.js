import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={1} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              Your journey to a pain-free life begins here.
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Discover daily exercises designed to correct your posture, relieve
            pain, and elevate your well-being.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Login
            </Button>
            <Button rounded={"full"}>Sign up</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.ctfassets.net/hjcv6wdwxsdz/4n5TP91XyHvNe7uUdFxjh3/b81c1359b39f498b066d5dbdb40d929a/Woman-stretching-her-arms-and-back-while-sitting-at-her-desk.jpg?w=1254&h=836&q=50&fm=avif"
          }
        />
      </Flex>
    </Stack>
  );
}
