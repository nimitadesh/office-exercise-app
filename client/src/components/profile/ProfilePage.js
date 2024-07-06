import { ChakraProvider, Box, chakra } from "@chakra-ui/react";
import Navbar from "../home/HomeComp/Navbar";
import FooterSection from "../home/HomeComp/FooterSection";
import Playlist from "./Playlist";
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);

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
            throw new Error("Failed to fetch user ratings");
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
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1">
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            {user && user.firstName
              ? `${user.firstName}'s Profile Page`
              : "Profile Page"}
          </chakra.h1>
          {userPlaylists && <Playlist playlists={userPlaylists} />}
        </Box>
        <FooterSection />
      </Box>
    </ChakraProvider>
  );
};

export default ProfilePage;
