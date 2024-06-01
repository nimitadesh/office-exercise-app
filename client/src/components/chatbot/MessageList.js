import { useEffect, useRef } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import Message from './Message';

const MessageList = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <Flex
      flexDirection="column"
      width="80%"
      maxHeight="80vh"
      overflowY="auto"
      mb={4}
      position="relative"
    >
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
      {isLoading && (
        <Flex justifyContent="center" mt={2} mb={4}>
          <Spinner />
        </Flex>
      )}
      <div ref={endOfMessagesRef} />
    </Flex>
  );
};

export default MessageList;

