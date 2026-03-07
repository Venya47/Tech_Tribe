import React, { useEffect, useState } from "react";

function Posts() {

  const [posts, setPosts] = useState([]);
  const dummyPosts = [
    { id: 1, title: "First Post", content: "This is the content of the first post." },
    { id: 2, title: "Second Post", content: "This is the content of the second post." },
    { id: 3, title: "Third Post", content: "This is the content of the third post." }
  ];

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data); // debug
        setPosts(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tech Community Posts</h1>
      <h1>Hii Venya</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #da0d0d",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{post.title}</h3>

          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;