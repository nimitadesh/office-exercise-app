import React, { useState, useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react"; // Importing Button and useDisclosure hook
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Progress,
  Container,
  Checkbox,
  Stack,
  HStack,
} from "@chakra-ui/react";
import AddNewPlaylistPopup from "./AddNewPlaylistPopup";

function PlaylistPopup({ workoutId, isOpen, onClose }) {
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [isAddNewPlaylistPopupOpen, setIsAddNewPlaylistPopupOpen] =
    useState(false);
  const toast = useToast();

  const toggleAddNewPlaylistPopup = () =>
    setIsAddNewPlaylistPopupOpen(!isAddNewPlaylistPopupOpen);

  const addWorkoutToPlaylist = async (playlistId, workoutId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/playlists/${playlistId}/workouts`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workoutId: workoutId,
          }),
        }
      );
      const data = await response.json();
      console.log("Success:", data);
      toast({
        title: "Success",
        description: "Workout successfully added to playlist(s)!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error adding workout to playlist(s)",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addWorkoutToPlaylists = async (workoutId) => {
    for (const playlist of selectedPlaylists) {
      await addWorkoutToPlaylist(playlist._id, workoutId);
    }
  };

  const updateSelectedPlaylists = (playlist, isChecked) => {
    setSelectedPlaylists((prevSelectedPlaylists) => {
      if (isChecked) {
        return [...prevSelectedPlaylists, playlist];
      } else {
        return prevSelectedPlaylists.filter((id) => id !== playlist._id);
      }
    });
    console.log("Selected Playlists");
    console.log(selectedPlaylists);
  };

  const updateUserPlaylists = (newPlaylists) => {
    setUserPlaylists(newPlaylists);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user && user._id) {
      fetch("http://localhost:3001/playlists/" + user._id)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user playlists");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUserPlaylists(data);
        })
        .catch((error) => {
          console.error("Error fetching user playlists:", error);
        });
    }
  }, [user]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to Playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom="2%">
            <Stack>
              {userPlaylists &&
                userPlaylists.map((playlist) => (
                  <Checkbox
                    key={playlist._id}
                    onChange={(e) =>
                      updateSelectedPlaylists(playlist, e.target.checked)
                    }
                  >
                    {playlist.title}
                  </Checkbox>
                ))}
            </Stack>
            <HStack spacing="47%" mt={7}>
              <Button
                colorScheme="green"
                onClick={() => setIsAddNewPlaylistPopupOpen(true)}
              >
                Create New Playlist
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => addWorkoutToPlaylists(workoutId)}
              >
                Add to All
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isAddNewPlaylistPopupOpen && (
        <AddNewPlaylistPopup
          isOpen={isAddNewPlaylistPopupOpen}
          onClose={() => {
            setIsAddNewPlaylistPopupOpen(false);
            fetch("http://localhost:3001/playlists/" + user._id)
              .then((res) => res.json())
              .then((data) => setUserPlaylists(data))
              .catch((error) =>
                console.error("Error fetching user playlists:", error)
              );
          }}
          updateUserPlaylists={updateUserPlaylists}
        />
      )}
    </>
  );
}

export default PlaylistPopup;
