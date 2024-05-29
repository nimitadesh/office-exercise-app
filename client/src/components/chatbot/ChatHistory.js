import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Heading,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";
import { parseText } from "./TextParse";
import Navbar from "../home/HomeComp/Navbar";

const ChatHistory = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Flex direction="column" alignItems="center">
        {messages.map((message, index) => (
          <Flex
            key={index}
            width="100%"
            p={4}
            borderBottom="1px solid #ccc"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flex="1">
              <Text>
                {new Date(message.createdAt).toLocaleString()}
              </Text>
              <Text>
                <strong>User Question: </strong>
                {message.userQuestion}
              </Text>
              <Text>
                <strong>Bot Response: </strong>
              </Text>
              <UnorderedList>
                {parseText(message.botResponse)}
              </UnorderedList>
            </Box>
          </Flex>
        ))}
      </Flex>
    </ChakraProvider>
  );
};

export default ChatHistory;

