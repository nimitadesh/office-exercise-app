import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import React from "react";

const parseText = (text) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    if (line.startsWith('* ')) {
      return (
        <ListItem key={index}>
          {parseInlineFormatting(line.slice(2))}
        </ListItem>
      );
    } else {
      return (
        <Text key={index}>
          {parseInlineFormatting(line)}
        </Text>
      );
    }
  });
};

const parseInlineFormatting = (line) => {
  const elements = [];
  let lastIndex = 0;
  let match;

  const boldRegex = /\*\*(.*?)\*\*/g;
  
  while ((match = boldRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(line.substring(lastIndex, match.index));
    }
    elements.push(
      <Text as="b" key={match.index}>
        {match[1]}
      </Text>
    );
    lastIndex = boldRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    elements.push(line.substring(lastIndex));
  }

  return elements;
};

const Message = ({ text, sender }) => {
  const isUser = sender === 'user';
  const parsedText = !isUser ? parseText(text) : [<Text key="0">{text}</Text>];

  return (
    <Box
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      mb={2}
      bg={isUser ? 'blue.100' : 'gray.100'}
      borderRadius="md"
      p={2}
    >
      {!isUser ? (
        <UnorderedList spacing={2}>
          {parsedText.map((item, index) => (
            <Box key={index}>
              {item}
            </Box>
          ))}
        </UnorderedList>
      ) : (
        <Text>{text}</Text>
      )}
    </Box>
  );
};

export default Message;



