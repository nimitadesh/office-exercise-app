import React from 'react';
import WorkoutCard from './WorkoutCard'; // Ensure this is the correct path
import styled from 'styled-components';

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  gap: 20px; // This adds space between the cards
`;

function WorkoutGallery({ workouts }) {
    return (
        <ScrollContainer>
            {workouts.map((workout, index) => (
                <WorkoutCard
                    key={index}
                    workout={workout}
                    onClick={() => console.log('Open workout:', workout.title)}
                />
            ))}
        </ScrollContainer>
    );
}

export default WorkoutGallery;
