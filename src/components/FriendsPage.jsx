import React, { useEffect, useState } from "react";

function FriendsPage({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/friends/${user.technology.id}`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Friends</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={styles.list}>
          {users.map((user) => (
            <div key={user.id} style={styles.card}>
              <h4 style={styles.username}>{user.username}</h4>
              <p style={styles.email}>{user.email}</p>
              <small style={styles.tech}>
                Technology: {user.technology?.name || "N/A"}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f9f9f9",
    minHeight: "100vh"
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  username: {
    margin: "0 0 5px",
    fontSize: "18px",
    color: "#333"
  },
  email: {
    margin: "0 0 5px",
    fontSize: "14px",
    color: "#555"
  },
  tech: {
    fontSize: "12px",
    color: "#777"
  }
};

export default FriendsPage;
