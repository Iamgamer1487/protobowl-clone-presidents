import { useState, useEffect } from "react";

const AnswerComponent = ({ answer: correctAnswer }: { answer: string }) => {
  // State to store the answer input value
  const [answer, setAnswer] = useState("");
  const [woc, setWoc] = useState("");

  // Function to handle the form submission
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Logic for checking the answer (compares with the correct answer passed as a prop)
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setWoc("Correct!");
      window.location.reload(); // Optionally reload the page after a correct answer
    } else {
      setWoc("Wrong!");
    }

    // Optionally clear the input field after submission
    setAnswer("");
  };

  return (
    <div className="mt-6 p-6 bg-blue-800 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Answer the Question:</h2>

      <form onSubmit={submit}>
        {/* Input field to capture the answer */}
        <input
          placeholder="Type your answer here..."
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)} // Update the state as user types
          className="w-full p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Submit
        </button>
      </form>

      <p className="text-white"> {woc} </p>
    </div>
  );
};

export default AnswerComponent;
