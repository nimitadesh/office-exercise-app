import { ChakraProvider, Box } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Navbar from "../home/HomeComp/Navbar";
import StatusModal from "../modal/StatusModal";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [file, setFile] = useState(null);
  const inputFileRef = useRef();
  const [chatResponses, setChatResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser)
      setUser(storedUser)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userMessage", userMessage);
      if (file) formData.append("doc", file);
      const res = await axios.post("http://localhost:3001/chat", formData);
      console.log(res.data.response)
      // const res = await axios.post("http://localhost:3001/chat", {
      //   userMessage: userMessage,
      // });
      setChatResponses((prevResponses) => [
        ...prevResponses,
        { sender: "user", text: userMessage },
        { sender: "bot", text: res.data.response },
      ]);
      await axios.post("http://localhost:3001/messages", {
        userId: user,
        userQuestion: userMessage,
        botResponse: res.data.response,
      })
      inputFileRef.current.value = null;
      setUserMessage("");
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("Chatbot failed to send message.");
      setModalOpen(true);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <StatusModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} message={modalMessage} />
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        height="100vh"
        p={4}
      >
        <MessageList messages={chatResponses} isLoading={isLoading} />
        <MessageInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          setFile={setFile}
          inputFileRef={inputFileRef}
          handleSubmit={handleSubmit}
        />
      </Box>
    </ChakraProvider>
  );
};

export default Chatbot;
