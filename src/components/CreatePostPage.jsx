import React, { useState } from "react";

function CreatePostPage({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Title and content are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          userId: user.id,
          title,
          content
        })
      });

      if (!response.ok) throw new Error("Failed to create post");
      const data = await response.json();
      setMessage("✅ Post created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating post.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✍️ Create a New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Create Post</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "500px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "120px"
  },
  button: {
    padding: "10px 15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333"
  }
};

export default CreatePostPage;
