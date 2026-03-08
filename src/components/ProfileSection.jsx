import React, { useState } from "react";

function ProfileSection({ user, setUser }) {
  const [showInput, setShowInput] = useState(false);
  const [newTech, setNewTech] = useState("");

  const handleTechUpdate = async () => {
    if (!newTech.trim()) return;
    try {
      const res = await fetch(`http://localhost:8080/users/${user.id}/technology?techName=${newTech}`, {
        method: "PUT"
      });
      const updatedUser = await res.json();
      setUser(updatedUser); // update local state
      setShowInput(false);
      setNewTech("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.profile}>
      <p><strong>{user.username}</strong> ({user.technology?.name})</p>
      <button onClick={() => setShowInput(!showInput)} style={styles.button}>
        Change Technology
      </button>

      {showInput && (
        <div style={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter new tech..."
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleTechUpdate} style={styles.button}>Save</button>
        </div>
      )}
    </div>
  );
}
const styles = {
  profile: { marginBottom: "20px", padding: "10px", background: "#e98f8f", borderRadius: "8px" },
  button: { padding: "6px 10px", background: "#667eea", color: "#fdfcff", border: "none", borderRadius: "6px", cursor: "pointer" },
  inputBox: { marginTop: "10px", display: "flex", gap: "10px" },
  input: { flex: 1, padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }
};
export default ProfileSection;