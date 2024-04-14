import React, {useState} from 'react';
import styled from 'styled-components';
import WorkoutPopup from "../workout/WorkoutPopup";
import {ChakraProvider} from "@chakra-ui/react";

const Card = styled.div`
    width: 600px;
    height: 350px;
    border: 1px solid #ddd;
    padding-top: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: 'Arial', sans-serif;
    cursor: pointer;
    flex: 0 0 auto;
    background-color: #C7C4C4;
`;

const Image = styled.img`
    width: 550px;
    height: 260px;
    display: block;
    margin: auto;
`;

const Title = styled.div`
    height: 50px;
    padding-top: 30px;
    font-size: 20px;
    font-weight: bold;
    bottom: 0;
    color: #57663D;
`;

const WorkoutCard = ({ workout }) => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => setIsOpen(!isOpen);

    return (
        <>
        <Card onClick={() => setIsOpen(true)}>
            <Image src={workout.imageUrl} alt="Workout" />
            <Title>{workout.title}</Title>
        </Card>
        { isOpen && (
            <ChakraProvider>
                <WorkoutPopup workout={workout} isOpen={isOpen} onClose={togglePopup}/>
            </ChakraProvider>
        )}
        </>
    );
};
export default WorkoutCard;
