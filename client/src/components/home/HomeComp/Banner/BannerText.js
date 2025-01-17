"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  background: linear-gradient(
    135deg,
    #37d5d6,
    #36096d
  ); /* Define your gradient colors */
  padding: 20px; /* Adjust padding as needed */
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-top: 1%;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

export default function BannerText() {
  return (
    <StyledBox>
      <Container h={"600px"} maxW={"full"}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Heading fontSize="3xl" margin="5% 0">
            <Text as="span" color="white">
              Experience the benefits of incorporating simple exercises into
              your workday.
            </Text>
          </Heading>
        </Box>

        <ScrollContainer>
          <Box
            width="350px"
            height="300px"
            boxShadow="0px 6px 8px rgba(0, 0, 0, 0.2)"
            flex="0 0 auto"
            display="flex"
            flexDirection="column"
          >
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              height="100%"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://telmdcare.com/c/img/Pain-Relief-mob.png"
                alt="Caffe Latte"
              />

              <Stack flex="1" justifyContent="space-between">
                <CardBody overflow="auto">
                  <Heading size="md">Pain Reduction</Heading>
                  <Text py="2">
                    Many people suffer from chronic pain due to poor posture,
                    which can be significantly alleviated through targeted
                    exercises designed to strengthen the muscles that support
                    proper alignment.
                  </Text>
                </CardBody>
                <CardFooter></CardFooter>
              </Stack>
            </Card>
          </Box>

          <Box
            width="450px"
            height="300px"
            boxShadow="0px 6px 8px rgba(0, 0, 0, 0.2)"
            flex="0 0 auto"
            display="flex"
            flexDirection="column"
          >
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              height="100%"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://cdn.mos.cms.futurecdn.net/akKBe6Gthr2xKAfzBprvcU.jpeg"
                alt="Caffe Latte"
              />

              <Stack flex="1" justifyContent="space-between">
                <CardBody overflow="auto">
                  <Heading size="md">Enhanced Mobility and Flexibility</Heading>
                  <Text py="2">
                    Correcting posture can lead to improved mobility and
                    flexibility, allowing individuals to move more freely and
                    with less discomfort.
                  </Text>
                </CardBody>
                <CardFooter></CardFooter>
              </Stack>
            </Card>
          </Box>

          <Box
            width="450px"
            height="300px"
            boxShadow="0px 6px 8px rgba(0, 0, 0, 0.2)"
            flex="0 0 auto"
            display="flex"
            flexDirection="column"
          >
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              height="100%"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://sarahscoop.com/wp-content/uploads/2023/04/symbols-of-strength-and-power.jpg"
                alt="Caffe Latte"
              />

              <Stack flex="1" justifyContent="space-between">
                <CardBody overflow="auto">
                  <Heading size="md">Boosted Energy Levels</Heading>
                  <Text py="2">
                    Better posture leads to increased energy levels, improved
                    oxygen flow, and a higher overall quality of life.
                  </Text>
                </CardBody>
                <CardFooter></CardFooter>
              </Stack>
            </Card>
          </Box>
        </ScrollContainer>
      </Container>
    </StyledBox>
  );
}
