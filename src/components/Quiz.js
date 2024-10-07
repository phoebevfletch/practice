import React, { useState } from "react";
import RepeatButton from "./RepeatButton";

const Quiz = () => {
    // Array of questions for the quiz
    const questions = [
        {

            question: "What is the diameter of a JaffaCake?",
            options: ["45mm", "54mm", "56mm"],
            answer: "54mm",
            statement: "JaffaCakes are 54mm which is 2 1/8 inches"
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
    ];

    // State to track current question, score, and if the quiz has ended
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [endQuiz, setQuizEnd] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Function to handle answer clicks
    const handleAnswerClick = (option) => {
        // Check if the answer is correct
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        // Set the selected answer
        setSelectedAnswer(option);

        // Move to the next question or end the quiz
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null); // Reset selected answer for the next question
        } else {
            setQuizEnd(true); // End the quiz when no more questions are left
        }
    };

    const RepeatButtonInQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizEnd(false);
        setSelectedAnswer(null);
    };

    return (
        <div
            style={{
                background: "#d86d39",
                marginTop: "0px",
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
                                    style={{
                                        padding: "10px 20px",
                                        margin: "10px 0",
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedAnswer === option ? "#ddd" : "white", // Highlight selected answer
                                    }}
                                    onClick={() => handleAnswerClick(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

};
export default Quiz;