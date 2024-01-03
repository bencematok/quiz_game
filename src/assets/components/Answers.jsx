import Button from "./Button";
import clsx from 'clsx';

export default function Answers(props) {
    const { answers, isAnswered, timerIsRunning, correctAnswer, onAnswerClick } = props;
    const classes = clsx({
        'answer-wrapper': true
    })
    return (
        <div className={classes}>
            {answers.map((answer, index) => {
                return <Button key={index} correctAnswer={correctAnswer} isAnswered={isAnswered} data-answer={answer} disabled={timerIsRunning} onClick={onAnswerClick}>{answer}</Button>
            })}
        </div>
    )
};