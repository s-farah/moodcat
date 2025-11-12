const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");


const app = express();
app.use(cors());
app.use(express.json()); 


const db = new Database("moods.db"); 
db.exec(`
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT DEFAULT (datetime('now')),
    mood TEXT,
    energy TEXT,
    color TEXT,
    cat_url TEXT
  );
`);


app.get("/api/ping", (req, res) => {
  res.json({ ok: true });
});


app.get("/api/cat", async (req, res) => {
  try {
    const r = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await r.json();
    const url = data?.[0]?.url || null;
    res.json({ url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed_to_fetch_cat" });
  }
});


app.post("/api/results", (req, res) => {
  const { mood, energy, color, catUrl } = req.body || {};
  const stmt = db.prepare(
    "INSERT INTO results (mood, energy, color, cat_url) VALUES (?, ?, ?, ?)"
  );
  const info = stmt.run(mood || null, energy || null, color || null, catUrl || null);
  res.json({ saved: true, id: info.lastInsertRowid });
});


app.get("/api/results/latest", (req, res) => {
  const row = db
    .prepare("SELECT * FROM results ORDER BY id DESC LIMIT 1")
    .get();
  res.json({ latest: row || null });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
