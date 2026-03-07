import React, { useEffect, useState } from "react";
import Comments from "./Comments"; // import the Comments component

function FeedPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState({}); // track toggled comments

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/posts/${user.technology.id}`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [user]);

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📜 Feed</h2>
      {posts.length === 0 ? (
        <p>No posts found in your community.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postContent}>{post.content}</p>
            <small style={styles.meta}>
              Posted by  {post.username}
            </small>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => toggleComments(post.id)}
                style={styles.toggleBtn}
              >
                {openComments[post.id] ? "Hide Comments" : "Show Comments"}
              </button>
            </div>



            {openComments[post.id] && (
              <Comments postId={post.id} user={user} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { padding: "20px", background: "#f9f9f9", minHeight: "100vh" },
  title: { fontSize: "22px", fontWeight: "bold", marginBottom: "20px" },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

  },
  postTitle: { margin: "0 0 10px", fontSize: "18px", color: "#333" },
  postContent: { margin: "0 0 10px", fontSize: "14px", color: "#444" },
  meta: { fontSize: "12px", color: "#777" },
  toggleBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    float: "right",
    alignSelf: "flex-end"
  }
};

export default FeedPage;
