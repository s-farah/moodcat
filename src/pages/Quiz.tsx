import { useState } from "react";
import axios from "axios";

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ mood: "", energy: "", color: "" });
  const [catUrl, setCatUrl] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else fetchCat();
  };

  const handleChange = (field: string, value: string) => {
    setAnswers({ ...answers, [field]: value });
  };

  const fetchCat = async () => {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      setCatUrl(res.data[0].url);
    } catch (error) {
      console.error("Error fetching cat:", error);
    }
  };

  return (
    <div className="page quiz">
      {!catUrl ? (
        <>
          {step === 1 && (
            <>
              <h2>How are you feeling today?</h2>
              <select
                value={answers.mood}
                onChange={(e) => handleChange("mood", e.target.value)}
              >
                <option value="">Select...</option>
                <option value="happy">Happy</option>
                <option value="calm">Calm</option>
                <option value="grumpy">Grumpy</option>
              </select>
            </>
          )}

          {step === 2 && (
            <>
              <h2>How much energy do you have?</h2>
              <select
                value={answers.energy}
                onChange={(e) => handleChange("energy", e.target.value)}
              >
                <option value="">Select...</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Pick a color you vibe with today.</h2>
              <select
                value={answers.color}
                onChange={(e) => handleChange("color", e.target.value)}
              >
                <option value="">Select...</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
              </select>
            </>
          )}

          <button onClick={handleNext}>
            {step < 3 ? "Next" : "Show My Cat"}
          </button>
        </>
      ) : (
        <>
          <h2>Your MoodCat</h2>
          <img src={catUrl} alt="Your cat" />
          <p>
            You’re feeling <b>{answers.mood}</b>, <b>{answers.energy}</b>-energy,
            and <b>{answers.color}</b>-vibed today 
          </p>
          <button
            onClick={() => {
              setCatUrl("");
              setStep(1);
              setAnswers({ mood: "", energy: "", color: "" });
            }}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
}
