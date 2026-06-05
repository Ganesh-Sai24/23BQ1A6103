import { useEffect, useState } from "react";
import { fetchNotifications } from "./services/notificationService";
import { Log } from "./utils/logger";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();

        const priority = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const sortedNotifications = [...(data.notifications || [])]
  .sort((a, b) => {
    if (priority[b.Type] !== priority[a.Type]) {
      return priority[b.Type] - priority[a.Type];
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  })
  .slice(0, 10);

setNotifications(sortedNotifications);

        Log(
          "frontend",
          "info",
          "component",
          "Notifications loaded into UI"
        );
      } catch (error) {
        Log(
          "frontend",
          "error",
          "component",
          "Failed to load notifications"
        );
      }
    };

    loadNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.map((item, index) => (
        <div key={index}>
          <h3>{item.Type}</h3>
<p>{item.Message}</p>
<p>{item.Timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;