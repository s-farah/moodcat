import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Result() {
  const location = useLocation();
  const { mood } = location.state || {};
  const [catUrl, setCatUrl] = useState("");

  useEffect(() => {
    async function fetchCat() {
      try {
        const res = await axios.get("https://api.thecatapi.com/v1/images/search");
        setCatUrl(res.data[0].url);
      } catch (error) {
        console.error("Error fetching cat:", error);
      }
    }
    fetchCat();
  }, []);

  return (
    <div className="page result">
      <h2>Your MoodCat</h2>
      {catUrl && <img src={catUrl} alt="Cat" />}
      <p>{mood ? `${mood} Cat ` : "Take the quiz to find your MoodCat!"}</p>

      <div>
        <Link to="/quiz">
          <button>Try Again</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}
