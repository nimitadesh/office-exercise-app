import React, { useState, useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react"; // Importing Button and useDisclosure hook
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import WorkoutStepper from "./WorkoutStepper";

function AddNewPlaylistPopup({ isOpen, onClose, updateUserPlaylists }) {
  const [user, setUser] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const toast = useToast();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: playlistTitle,
        createdBy: user._id,
        workouts: [],
      }),
    })
      .then((response) => response.json())
      .then((newPlaylist) => {
        console.log("Playlist created:", newPlaylist);
        updateUserPlaylists((prevUserPlaylists) => [
          ...prevUserPlaylists,
          newPlaylist,
        ]);
        toast({
          title: "Success",
          description: "Playlist successfully created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
        toast({
          title: "Error",
          description: "Error creating playlist",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Playlist</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody marginBottom="2%">
              <Input
                placeholder="Playlist title"
                value={playlistTitle}
                onChange={(e) => setPlaylistTitle(e.target.value)}
                marginBottom="8%"
                required
              />
              <Button type="submit" colorScheme="blue">
                Create
              </Button>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewPlaylistPopup;
