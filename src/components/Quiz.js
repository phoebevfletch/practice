import React, { useState } from "react";
import RepeatButton from "./RepeatButton";
import "./RepeatButtonStyle.css";

const Quiz = () => {
    const questions = [
        {
            question: "What is the diameter of a JaffaCake?",
            options: ["45mm", "54mm", "56mm"],
            answer: "54mm",
            statement: "JaffaCakes are 54mm which is 2 1/8 inches",
        },
        {
            question: "What year were JaffaCakes created?",
            options: ["1927", "1938", "1955"],
            answer: "1927",
            statement: "Bonus fact: The name comes from the orange-flavoured jam used which is made from the Jaffa oranges",
        },
        {
            question: "JaffaCakes are biscuits.",
            options: ["true", "false"],
            answer: "false",
            statement: "Click the link above to see the lawsuit and why JaffaCakes are Cakes",
        },
        {
            question: "What is the world record for the most JaffaCakes eaten in under a minute?",
            options: ["68", "72", "79"],
            answer: "72",
            statement: "This title is held by Pete Czerwinski from Canada",
        },
        {
            question: "Which of these is not a flavour of JaffaCake?",
            options: ["Cola", "Pineapple", "Mint"],
            answer: "Mint",
            statement: "Cola is the newest addition to the long JaffaCake flavours. This was released in June 2024",
        },
        {
            question: "How many JaffaCakes are in a pack of JaffaCakes?",
            options: ["10", "11", "12"],
            answer: "10",
            statement: "There are only 10 JaffaCakes in a pack",
        },
        {
            question: "Where is the McVitie's factory?",
            options: ["Bately", "Stockport", "Halifax"],
            answer: "Stockport",
            statement: "The JaffaCake production area is over an acre and includes a production line that's more than a mile long",
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [endQuiz, setQuizEnd] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // Track answer was correct

    const handleAnswerClick = (option) => {
        const correctAnswer = questions[currentQuestion].answer;

        // Check selected answer is correct
        if (option === correctAnswer) {
            setScore(score + 1);
            setIsCorrect(true); // Correct answer
        } else {
            setIsCorrect(false); // Incorrect answer
        }

        setSelectedAnswer(option); // Store the selected answer
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null); // Reset selected answer for the next question
            setIsCorrect(null); // Reset the correctness feedback
        } else {
            setQuizEnd(true); // End the quiz if no more questions
        }
    };

    const RepeatButtonInQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizEnd(false);
        setSelectedAnswer(null);
        setIsCorrect(null); // Reset correctness feedback
    };

    return (
        <div
            style={{
                background: "#d86d39",
                marginTop: "0px",
                height: "500px",
                padding: "20px",
                borderRadius: "10px",
                boxSizing: "border-box",
            }}
        >
            <h1 className="App-title">The JaffaCake Quiz!!</h1>
            {endQuiz ? (
                <div>
                    <h2>Quiz Finished!</h2>
                    <p>
                        Your score is {score} out of {questions.length}
                    </p>
                    <RepeatButton onRepeat={RepeatButtonInQuiz} />
                </div>
            ) : (
                <div>
                    <h3>{questions[currentQuestion].question}</h3>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {questions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                                <button
                                    className="RepeatButtonDesign"
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={selectedAnswer !== null} // Disable buttons after selection
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Show feedback after selecting an answer */}
                    {selectedAnswer && (
                        <div>
                            <p>
                                {isCorrect
                                    ? "Correct!"
                                    : `Incorrect. The correct answer is ${questions[currentQuestion].answer}.`}
                            </p>
                            <p>{questions[currentQuestion].statement}</p>

                            {/* Next question button */}
                            <button
                                className="RepeatButtonDesign"
                                onClick={handleNextQuestion}
                            >
                                Next Question
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;

