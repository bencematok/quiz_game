import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.hook';
import helper from '../scripts/helper';
import Heading from './Heading';
import Question from './Question';
import Answers from './Answers';
import Start from './Start';
import Countdown from './Countdown';
import clsx from 'clsx';
import Button from './Button';
import GameOver from './GameOver';
import Scoreboard from './Scoreboard';

// The Wrapper component wraps the rest of the components. This is basically the game itself.
export default function Wrapper() {
    const [gameIsRunning, setGameIsRunning] = useState(false);
    const [timerIsRunning, setTimerIsRunning] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(30);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionCount, setQuestionCount] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const { get } = useFetch('http://the-trivia-api.com/v2');
    const { shuffle } = helper();
    const totalQuestions = 10;

    // Function to get the questions from the Trivia API.
    // We set up the questions, correct answer, the current question, and the answers.
    // Before we set the answers state, we shuffle the array to make sure it's randomized.
    const handleGetQuestions = () => {
        get('/questions').then(response => {
            console.log(response);
            setQuestions(response);
            setCorrectAnswer(response[questionCount - 1][correctAnswer]);
            setCurrentQuestion(response[questionCount - 1].question.text);
            setAnswers(shuffle([...response[questionCount - 1].incorrectAnswers, response[questionCount - 1].correctAnswer]));
            setCorrectAnswer(response[questionCount - 1].correctAnswer);
        }).catch(error => console.error(error));
    };

    // The timer is built with setInterval.
    // At the end of the function, we clear the interval to avoid a potential memory leak.
    const handleCountdownEffect = () => {
        if (timerIsRunning) {
            const timerId = setInterval(() => {
                if (timeRemaining > 0) {
                    setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1);
                } else if (timeRemaining === 0) {
                    setIsAnswered(true);
                    setTimerIsRunning(false);
                }
            }, 1000);

            return () => clearInterval(timerId);
        };
    };

    // If the total questions are less than the question count, we set the gameIsRunning state to false.
    // The game shouldn't be running when the question count is larger than the actual amount of questions we have.
    // Otherwise, we set the current question, the correct answer, the answers to their respective states.
    const handleCheckCount = () => {
        if (questionCount > totalQuestions) {
            setGameIsRunning(false);
        } else if (questionCount > 1) {
            setCorrectAnswer(questions[questionCount - 1].correctAnswer);
            setCurrentQuestion(questions[questionCount - 1].question.text);
            setAnswers(shuffle([...questions[questionCount - 1].incorrectAnswers, questions[questionCount - 1].correctAnswer]));
        };
    };

    // We call the handleCountDownEffect function every time the site rerenders.
    useEffect(handleCountdownEffect);
    // We call the handleCheckCount function every time the questionCount state changes.
    useEffect(handleCheckCount, [questionCount]);
    // We get a new set of questions each time the gameIsRunning state changes.
    useEffect(handleGetQuestions, [gameIsRunning]);

    // Upon starting the game, we set up the states.
    const handleStartClick = () => {
        setIsAnswered(false);
        setCorrectAnswers(0);
        setQuestionCount(1);
        setTimeRemaining(30);
        setGameIsRunning(true);
        setTimerIsRunning(true);
    };

    // When clicking the next button, we set the isAnswered state back to false.
    // We set the timerIsRunning state to true.
    // We reset the counter back to 30 seconds.
    // Lastly, we increment the questionCount state.
    const handleNextClick = () => {
        setIsAnswered(false);
        setTimerIsRunning(true);
        setTimeRemaining(30);
        setQuestionCount(prevQuestionCount => prevQuestionCount + 1);
    };

    // The handleAnswerClick sets the isAnswered state to true, thus the respective classes
    // for the buttons to display the correct and the wrong answers can be added.
    // We disable the timer from running.
    // If the answer was correct, we increment the correctAnswers state.
    const handleAnswerClick = (event) => {
        setIsAnswered(true);
        setTimerIsRunning(false);
        if (event.target.dataset.answer === correctAnswer) {
            setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
        };
    };

    const classes = clsx({
        'wrapper': true
    })

    return (
        <>
            <div className={classes}>
                {gameIsRunning && <>
                    <div className='question-wrapper'>
                        <div>
                            <div className='heading-wrapper'>
                                <Heading questionCount={questionCount} totalQuestions={totalQuestions} />
                                <Scoreboard correctAnswers={correctAnswers} totalQuestions={totalQuestions} />
                            </div>
                            <div className='m-y-1'>
                                <Question question={currentQuestion} />
                            </div>
                        </div>
                        <Answers timerIsRunning={!timerIsRunning} correctAnswer={correctAnswer} answers={answers} isAnswered={isAnswered} onAnswerClick={handleAnswerClick} />
                        <div className='timer-wrapper m-t-1'>
                            <Countdown timeRemaining={timeRemaining} />
                            <Button onClick={handleNextClick} disabled={timerIsRunning}>Next</Button>
                        </div>
                    </div>

                </>}
                {!gameIsRunning && questionCount === 1 && correctAnswers === 0 && <Start onStartClick={handleStartClick} />}
                {!gameIsRunning && questionCount >= 10 && <GameOver correctAnswers={correctAnswers} totalQuestions={totalQuestions} onStartClick={handleStartClick} />}
            </div>
        </>
    )
}