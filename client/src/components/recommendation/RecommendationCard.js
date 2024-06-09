import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const RecommendationCard = ({ recommendation }) => {
  const [sliderValue] = useState(recommendation.similarity.toFixed(2) * 100);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Card width="lg">
      <CardHeader>
        <Heading size="md">{recommendation.workout.title}</Heading>
      </CardHeader>

      <CardBody>
        <Box>
          <Slider
            aria-label="slider-ex-6"
            defaultValue={sliderValue}
            min={0}
            max={100}
            isDisabled={true}
          >
            <SliderMark value={25} {...labelStyles}>
              25%
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              50%
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              75%
            </SliderMark>
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg="blue.500"
              color="white"
              mt="-10"
              ml="-5"
              w="12"
            >
              {sliderValue}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </CardBody>
    </Card>
  );
};

export default RecommendationCard;
