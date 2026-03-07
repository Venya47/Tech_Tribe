import React, { useState } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/posts/search?keyword=${query}`);
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔍 Search Posts</h2>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Enter keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {loading && <p>Searching...</p>}

      <div style={styles.results}>
        {results.length === 0 && !loading ? (
          <p>No posts found.</p>
        ) : (
          results.map((post) => (
            <div key={post.id} style={styles.card}>
              <h4 style={styles.postTitle}>{post.title}</h4>
              <p style={styles.postContent}>{post.content}</p>
              <small style={styles.meta}>
                Posted by {post.user?.username || "Unknown"}
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
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  results: {
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
  meta: {
    fontSize: "12px",
    color: "#777"
  }
};

export default SearchPage;
