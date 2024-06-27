import React, { useState } from "react";
import { Input, Button, useToast, Stack, Box, HStack } from "@chakra-ui/react";

const NotificationScheduler = () => {
  const [notificationTimes, setNotificationTimes] = useState([""]);
  const toast = useToast();

  const handleAddNotification = () => {
    const newNotificationTimes = [...notificationTimes, ""];
    setNotificationTimes(newNotificationTimes);
  };

  const handleRemoveNotification = (index) => {
    const newNotificationTimes = [...notificationTimes];
    newNotificationTimes.splice(index, 1);
    setNotificationTimes(newNotificationTimes);
  };

  const handleScheduleAllNotifications = () => {
    notificationTimes.forEach((dateTime) => {
      if (!dateTime) {
        toast({
          title: "Error",
          description:
            "Please select a valid date and time for all notifications.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const selectedTime = new Date(dateTime).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = selectedTime - currentTime;

      if (timeDiff <= 0) {
        toast({
          title: "Error",
          description:
            "Selected time must be in the future for all notifications.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setTimeout(() => {
        toast({
          title: "Workout Notification",
          description: "It's time for your workout session. Let's get moving!",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }, timeDiff);

      toast({
        title: "Success",
        description: "Notifications successfully set!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const handleDateTimeChange = (event, index) => {
    const newNotificationTimes = [...notificationTimes];
    newNotificationTimes[index] = event.target.value;
    setNotificationTimes(newNotificationTimes);
  };

  return (
    <Stack spacing={4}>
      {notificationTimes.map((dateTime, index) => (
        <Box key={index}>
          <HStack>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => handleDateTimeChange(e, index)}
            />
            <Button
              mt={2}
              colorScheme="red"
              onClick={() => handleRemoveNotification(index)}
            >
              Remove
            </Button>
          </HStack>
        </Box>
      ))}
      <HStack spacing="65%" mt={4}>
        <Button colorScheme="green" onClick={handleAddNotification}>
          Add
        </Button>
        <Button colorScheme="blue" onClick={handleScheduleAllNotifications}>
          Schedule All
        </Button>
      </HStack>
    </Stack>
  );
};

export default NotificationScheduler;
