import { FormControl, Input } from "@chakra-ui/react";

const MessageInput = ({ userMessage, setUserMessage, handleSubmit }) => {
  return (
    <FormControl as="form" onSubmit={handleSubmit} width="80%">
      <Input
        placeholder="Message Chatbot"
        mb={4}
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      />
      <button type="submit" style={{ display: "none" }}>
        Submit
      </button>
    </FormControl>
  );
};

export default MessageInput;
