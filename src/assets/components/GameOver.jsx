import Button from "./Button";

// The GameOver component is rendered when the game is over.
// It display's the user's score out of the total questions.
// The user can also start a new game with the new game button.
export default function GameOver(props) {
    const { correctAnswers, totalQuestions, onStartClick } = props;

    return (
        <div className="text-center">
            <h2>
                Game Over!
            </h2>
            <p>
                Your final score is {correctAnswers}/{totalQuestions}!
            </p>
            <Button onClick={onStartClick}>New Game</Button>
        </div>
    )
}