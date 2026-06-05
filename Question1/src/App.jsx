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

  const getBorderColor = (type) => {
    switch (type) {
      case "Placement":
        return "#2e7d32";
      case "Result":
        return "#1565c0";
      case "Event":
        return "#ef6c00";
      default:
        return "#757575";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0d47a1",
            marginBottom: "10px",
          }}
        >
          Campus Notifications Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Top 10 Priority Notifications
        </p>

        {notifications.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              borderLeft: `6px solid ${getBorderColor(item.Type)}`,
              borderRadius: "12px",
              padding: "18px",
              marginBottom: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: getBorderColor(item.Type),
              }}
            >
              {item.Type}
            </h3>

            <p
              style={{
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              {item.Message}
            </p>

            <small
              style={{
                color: "#666",
              }}
            >
              {item.Timestamp}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;