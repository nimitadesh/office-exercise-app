import { Text, ListItem } from "@chakra-ui/react"

export const parseText = (text) => {
  const lines = text.split("\n");
  return lines.map((line, index) => {
    if (line.startsWith("* ")) {
      return (
        <ListItem key={index}>{parseInlineFormatting(line.slice(2))}</ListItem>
      );
    } else {
      return <Text key={index}>{parseInlineFormatting(line)}</Text>;
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
