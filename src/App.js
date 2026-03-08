import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import AuthPage from "./components/AuthPage";
import FeedPage from "./components/FeedPage";
import Sidebar from "./components/Sidebar";
import CreatePostPage from "./components/CreatePostPage";
import FriendsPage from "./components/FriendsPage";
import SearchPage from "./components/SearchPage";

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  return (
    <Router>
      {storedUser ? (
        <div style={{ display: "flex" }}>
          <Sidebar user={user} setUser={setUser}  />
          <div style={styles.content}>
            <Routes>
              <Route path="/feed" element={<FeedPage user={user} />} />
              <Route path="/create-post" element={<CreatePostPage user={user} />} />
              <Route path="/friends" element={<FriendsPage user={user} />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      )}
    </Router>
  );
}

const styles = {
  content: {
    marginLeft: "220px",
    flex: 1,
    padding: "30px",
    background: "#f9f9f9",
    minHeight: "100vh"
  }
};

export default App;
