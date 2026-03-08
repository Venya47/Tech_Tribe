import { Link, useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import React, { useState } from "react";


function Sidebar({ user , setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>TechTribe</h2>
      {/* Profile section */}
      <div style={styles.profile}>
        <p style={styles.username}>👤 {user?.username}</p>
        <p style={styles.tech}>{user?.technology?.name} Community</p>
      </div>
      <ProfileSection user={user} setUser={setUser} />
      <nav style={styles.nav}>
        <Link to="/feed" style={styles.link}>📜 Feed</Link>
        <Link to="/create-post" style={styles.link}>✍️ Create Post</Link>
        <Link to="/friends" style={styles.link}>👥 Friends</Link>
        <Link to="/search" style={styles.link}>🔍 Search Posts</Link>
        <button onClick={handleLogout} style={styles.logout}>🚪 Logout</button>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "linear-gradient(180deg, #667eea, #764ba2)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)"
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  profile: {
    marginBottom: "30px",
    padding: "10px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "8px"
  },
  username: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  tech: {
    fontSize: "12px",
    color: "#ddd"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  link: {
    color: "#f0faf4",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "8px",
    transition: "background 0.3s, transform 0.2s"
  },
  logout: {
    marginTop: "auto",
    padding: "10px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: "6px",
    color: "#e9adad",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s"
  }
};

export default Sidebar;
