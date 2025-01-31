"use client";
import { useState, useEffect } from "react";
import { getRandomQuestionAndAnswer } from "../../firebase"; // Ensure this import matches your actual function
import AnswerComponent from "../../components/AnswerComponent";

const Home = () => {
  const [fullText, setFullText] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [buzzed, setBuzzed] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(10);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showAnswerQ, setShowAnswerQ] = useState<string>("");
  const [timerSecondsQ, setTimerSecondsQ] = useState<number>(40); // Timer for question countdown

  // Fetch question and answer
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const randomQuestion = await getRandomQuestionAndAnswer();

        if (randomQuestion && randomQuestion.Question) {
          setFullText(randomQuestion.Question); // Set the question as the full text
          setAnswer(randomQuestion.Answer); // Set the answer
          setCategory(randomQuestion.Category); // Set the category
        } else {
          console.error("Failed to fetch a valid question. Invalid or missing fields.");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, []);

  const words: string[] = fullText.split(" "); // Split the question text into words

  // Dynamic text effect to reveal words one by one
  useEffect(() => {
    if (buzzed) return; // Stop updating if the buzzer has been pressed

    const interval = setInterval(() => {
      if (index < words.length) {
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval); // Stop when all words have been displayed
      }
    }, 300); // Word display interval

    return () => clearInterval(interval); // Cleanup interval on unmount or index change
  }, [index, buzzed, words.length]);

  // Timer countdown effect for the buzzer
  useEffect(() => {
    if (!buzzed) return;

    const countdown = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setBuzzed(false); // Reset buzzer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup the countdown
  }, [buzzed]);

  // Timer countdown effect for the question
  useEffect(() => {
    if (timerSecondsQ <= 0) {

      const e = answer

      setShowAnswerQ(e)
      return; // Stop if time reaches 0
    }

    const countdownQ = setInterval(() => {
      setTimerSecondsQ((prev) => {
        if (prev <= 1) {
          clearInterval(countdownQ);
          setShowAnswer(true); // Show answer when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownQ); // Cleanup the countdown for question timer
  }, [timerSecondsQ]);

  const Buzz = () => {

    if (showAnswerQ === ""){
    setBuzzed(true);
    setShowAnswer(true);
    setTimerSeconds(10);

    }

    else{
      return
    }
  };

  const skip_ques = () => {
    window.location.reload()
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-500 via-black to-yellow-500 p-6">
      <div className="text-center max-w-3xl">
        <p className="text-3xl text-white font-semibold mb-6">
          {words.slice(0, index).join(" ")} {/* Display the words up to the current index */}
        </p>
        <p className="text-white font-semibold mt-2">Category: {category}</p>

        {!buzzed && (
          <button
            onClick={Buzz}
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Buzz
          </button>
        )}

        {buzzed && (
          <div>
            <p className="text-white font-semibold mt-4">Time remaining: {timerSeconds}s</p>
            {showAnswer && (timerSecondsQ !== 0) && <AnswerComponent answer={answer} />}
          </div>
        )}

        <p className="text-white font-semibold mt-4">Time remaining for Questions: {timerSecondsQ}s</p>
        <button
    onClick={skip_ques}
    className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-500 active:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
>
  Skip / Next
</button>

        <p className="text-white font-semibold mt-4">Answer: {showAnswerQ}</p>
      </div>
    </div>
  );
};

export default Home;
