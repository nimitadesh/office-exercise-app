import { FormControl, Input, Button, Flex } from "@chakra-ui/react";

const MessageInput = ({
  userMessage,
  setUserMessage,
  setFile,
  inputFileRef,
  handleSubmit,
}) => {
  const handleFileClick = () => {
    inputFileRef.current.click();
  };

  return (
      <FormControl as="form" onSubmit={handleSubmit} width="80%">
        <Flex align="center" justify="space-between">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <Button onClick={handleFileClick} mr={2}>
            Upload File
          </Button>
          <Input
            placeholder="Message Chatbot"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            mr={2}
            flex="1"
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </FormControl>
  );
};

export default MessageInput;
