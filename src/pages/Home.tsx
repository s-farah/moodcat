import { Link } from "react-router-dom";
import catImg from "../assets/cat.png";

export default function Home() {
  return (
    <div className="page home">
      <img src={catImg} alt="Cat" className="home-cat" />
      <h1>MoodCat</h1>
      <p>Take a short quiz and we will match you with a cat!</p>
      <Link to="/quiz">
        <button>Start Quiz</button>
      </Link>
    </div>
  );
}
