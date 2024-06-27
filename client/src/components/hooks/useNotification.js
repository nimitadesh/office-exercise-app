import { useEffect } from "react";

const useNotification = () => {
  const notify = () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Time to Workout!", {
        body: "It's time for your workout session. Let's get moving!",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("Time to Workout!", {
            body: "It's time for your workout session. Let's get moving!",
          });
        }
      });
    }
  };

  useEffect(() => {
    const scheduleReminders = () => {
      setInterval(notify, 60000);
    };

    scheduleReminders();

    return () => {
      clearInterval(scheduleReminders);
    };
  }, []);

  return null;
};

export default useNotification;
