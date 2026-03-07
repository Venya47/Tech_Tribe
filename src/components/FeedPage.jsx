import React, { useEffect, useState } from "react";

function FeedPage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div style={styles.container}>
      <h2 style={styles.welcome}>Welcome {user?.username} 👋</h2>
      <h3 style={styles.subtitle}>Posts in {user?.technology?.name} Community</h3>

      <div style={styles.feed}>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <h4 style={styles.postTitle}>{post.title}</h4>
              <p style={styles.postContent}>{post.content}</p>
              <small style={styles.postMeta}>
                Posted by {post.user.username || "Unknown"} on{" "}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f9f9f9",
    minHeight: "100vh"
  },
  welcome: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px"
  },
  feed: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  postCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  postTitle: {
    margin: "0 0 10px",
    fontSize: "18px",
    color: "#333"
  },
  postContent: {
    margin: "0 0 10px",
    fontSize: "14px",
    color: "#444"
  },
  postMeta: {
    fontSize: "12px",
    color: "#777"
  }
};

export default FeedPage;
