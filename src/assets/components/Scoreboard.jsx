// The ScoreBoard keeps track of the correct answers out of the total questions.
export default function Scoreboard(props) {
    const { correctAnswers, totalQuestions } = props;
    return (
        <>
            <p>Score: {correctAnswers}/{totalQuestions}</p>
        </>
    )
}