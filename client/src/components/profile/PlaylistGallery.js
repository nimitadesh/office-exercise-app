import React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import PlaylistCard from "./PlaylistCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/app-styles.css"; // Ensure this is the correct path to your CSS

function PlaylistGallery({ workouts }) {
  return (
    <TransitionGroup component={null}>
      {workouts.map((workout, index) => (
        <CSSTransition key={index} timeout={500} classNames="fade">
          <WrapItem>
            <PlaylistCard
              workout={workout}
              onClick={() => console.log("Open workout:", workout.title)}
            />
          </WrapItem>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default PlaylistGallery;
