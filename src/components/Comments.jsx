import React, { useEffect, useState } from "react";

function Comments({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Fetch comments when postId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8080/comments/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [postId]);

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ postId, userId: user.id, text })
      });

      if (!res.ok) throw new Error("Failed to add comment");
      const newComment = await res.json();
      setComments([...comments, newComment]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // Add reply to a comment
  const handleReply = async (parentId, replyText) => {
    if (!replyText.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/comments/reply", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ postId, userId: user.id, parentId, text: replyText })
      });

      if (!res.ok) throw new Error("Failed to add reply");
      const newReply = await res.json();

      // Update replies in state
      setComments(comments.map(c =>
        c.id === parentId ? { ...c, replies: [...(c.replies || []), newReply] } : c
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h4>💬 Comments</h4>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} style={styles.form}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>

      {/* Comments List */}
      <div style={styles.list}>
        {comments.map((c) => (
          <div key={c.id} style={styles.comment}>
            <strong>{c.user?.username || "Anonymous"}:</strong> {c.text}

            {/* Reply Box */}
            <ReplyBox parentId={c.id} onReply={handleReply} />

            {/* Replies */}
            {c.replies && c.replies.map(r => (
              <div key={r.id} style={styles.reply}>
                ↳ <strong>{r.user?.username || "Anonymous"}:</strong> {r.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReplyBox({ parentId, onReply }) {
  const [replyText, setReplyText] = useState("");

  return (
    <div style={{ marginTop: "5px" }}>
      <input
        type="text"
        placeholder="Reply..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={() => { onReply(parentId, replyText); setReplyText(""); }}
        style={styles.button}
      >
        Reply
      </button>
    </div>
  );
}

const styles = {
  container: { marginTop: "15px" },
  form: { display: "flex", gap: "10px", marginBottom: "10px" },
  input: { flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" },
  button: { padding: "8px 12px", background: "#667eea", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  list: { display: "flex", flexDirection: "column", gap: "8px" },
  comment: { background: "#f1f1f1", padding: "8px", borderRadius: "6px" },
  reply: { marginLeft: "20px", background: "#e9e9e9", padding: "6px", borderRadius: "6px" }
};

export default Comments;
