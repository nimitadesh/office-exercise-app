import { Box, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { parseText } from "./TextParse";

const Message = ({ text, sender }) => {
  const isUser = sender === "user";
  const parsedText = !isUser ? parseText(text) : [<Text key="0">{text}</Text>];

  return (
    <Box
      alignSelf={isUser ? "flex-end" : "flex-start"}
      mb={2}
      bg={isUser ? "blue.100" : "gray.100"}
      borderRadius="md"
      p={2}
    >
      
      {!isUser ? (
          <UnorderedList spacing={2}>
            {parsedText.map((item, index) => (
              <Box key={index}>{item}</Box>
            ))}
          </UnorderedList>
      ) : (
        <Text>{text}</Text>
      )}
    </Box>
  );
};

export default Message;
