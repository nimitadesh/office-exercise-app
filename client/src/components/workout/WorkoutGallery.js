import React from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import WorkoutCard from "../WorkoutCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/app-styles.css"; // Ensure this is the correct path to your CSS

function WorkoutGallery({ workouts }) {
  return (
    <Wrap marginLeft="9%" marginTop="5%" marginBottom="5%">
      <TransitionGroup component={null}>
        {workouts.map((workout, index) => (
          <CSSTransition key={index} timeout={500} classNames="fade">
            <WrapItem>
              <WorkoutCard
                workout={workout}
                onClick={() => console.log("Open workout:", workout.title)}
              />
            </WrapItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Wrap>
  );
}

export default WorkoutGallery;
