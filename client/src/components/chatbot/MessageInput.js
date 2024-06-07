import { FormControl, Input, Button, VStack, HStack } from "@chakra-ui/react";

const MessageInput = ({
  userMessage,
  setUserMessage,
  setFile,
  inputFileRef,
  handleSubmit,
}) => {
  return (
    <FormControl as="form" onSubmit={handleSubmit} width="80%">
      <VStack spacing={4} align="stretch">
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={inputFileRef}
        />
        <HStack spacing={2} align="stretch">
          <Input
            placeholder="Message Chatbot"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            mr={2}
            flex="1"
          />
          <Button type="submit">Submit</Button>
        </HStack>
      </VStack>
    </FormControl>
  );
};

export default MessageInput;
