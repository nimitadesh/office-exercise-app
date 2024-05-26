import { ChakraProvider, Box } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Navbar from "../home/HomeComp/Navbar";
import FooterSection from "../home/HomeComp/FooterSection";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatResponses, setChatResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;

    setIsLoading(true);
    try {
        const res = await axios.post('http://localhost:3001/chat', { userMessage: userMessage });
        setChatResponses(prevResponses => [...prevResponses, { sender: 'user', text: userMessage }, { sender: 'bot', text: res.data.response }]);
        setUserMessage("");
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Navbar/>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        height="100vh"
        p={4}
      >
        <MessageList messages={chatResponses} isLoading={isLoading} />
        <MessageInput userMessage={userMessage} setUserMessage={setUserMessage} handleSubmit={handleSubmit} />
      </Box>
    </ChakraProvider>
  );
};

export default Chatbot;


