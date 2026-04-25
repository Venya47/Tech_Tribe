import React, { useEffect, useState } from "react";
import axios from "axios";

function MyPostsPage({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/posts/my/${user.id}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchMyPosts();
  }, [user]);

  const deletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:8080/posts/${postId}`);
        setPosts(posts.filter((p) => p.id !== postId));
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 My Posts</h2>
      {posts.length === 0 ? (
        <p>You haven’t created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postContent}>{post.content}</p>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => deletePost(post.id)}
                style={styles.deleteBtn}
                title="Delete Post"
              >
                🗑️
              </button>
            </div>
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
  deleteBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default MyPostsPage;
