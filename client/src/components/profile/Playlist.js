import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import PlaylistGallery from "./PlaylistGallery";

const Playlist = ({ playlists }) => {
  return (
    <Accordion marginLeft="5%" marginRight="5%" marginBottom="2%" allowToggle>
      {playlists.map((playlist) => (
        <AccordionItem key={playlist._id}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {playlist.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box marginBottom="5%">
              <PlaylistGallery workouts={playlist.workouts} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Playlist;
