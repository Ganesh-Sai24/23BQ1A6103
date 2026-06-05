import { useEffect, useState } from "react";
import { fetchNotifications } from "./services/notificationService";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [topCount, setTopCount] = useState(10);

  const [viewed, setViewed] = useState(
    JSON.parse(localStorage.getItem("viewedNotifications")) || []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadNotifications();
  }, []);

  const markAsViewed = (id) => {
    if (!viewed.includes(id)) {
      const updated = [...viewed, id];
      setViewed(updated);
      localStorage.setItem(
        "viewedNotifications",
        JSON.stringify(updated)
      );
    }
  };

  const getColor = (type) => {
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

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.Type === filter);

  const priority = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const priorityNotifications = [...notifications]
    .sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, topCount);

  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );

  const startIndex =
    (currentPage - 1) * notificationsPerPage;

  const currentNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + notificationsPerPage
    );

  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0d47a1",
            marginBottom: "30px",
          }}
        >
          Campus Notifications Dashboard
        </h1>

        <h2 style={{ color: "#2e7d32" }}>
          Top Priority Notifications
        </h2>

        <select
          value={topCount}
          onChange={(e) => setTopCount(Number(e.target.value))}
          style={{
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <option value={5}>Top 5</option>
          <option value={10}>Top 10</option>
          <option value={20}>Top 20</option>
        </select>

        {priorityNotifications.map((item) => (
          <div
            key={"priority-" + item.ID}
            style={{
              background: "#ffffff",
              borderLeft: `6px solid ${getColor(item.Type)}`,
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: getColor(item.Type) }}>
              {item.Type}
            </h3>
            <p>{item.Message}</p>
            <small>{item.Timestamp}</small>
          </div>
        ))}

        <h2
          style={{
            marginTop: "35px",
            color: "#0d47a1",
          }}
        >
          Filter Notifications
        </h2>

        <div style={{ marginBottom: "20px" }}>
          {["All", "Placement", "Result", "Event"].map(
            (type) => (
              <button
                key={type}
                onClick={() => {
                  setFilter(type);
                  setCurrentPage(1);
                }}
                style={{
                  padding: "10px 18px",
                  marginRight: "10px",
                  border: "none",
                  borderRadius: "8px",
                  background:
                    filter === type
                      ? "#0d47a1"
                      : "#1976d2",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {type}
              </button>
            )
          )}
        </div>

        {currentNotifications.map((item) => (
          <div
            key={item.ID}
            onClick={() => markAsViewed(item.ID)}
            style={{
              backgroundColor: viewed.includes(item.ID)
                ? "#e0e0e0"
                : "#ffffff",
              borderLeft: `6px solid ${getColor(item.Type)}`,
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ color: getColor(item.Type) }}>
              {item.Type}
            </h3>
            <p>{item.Message}</p>
            <small>{item.Timestamp}</small>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#0d47a1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#0d47a1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;