// The Heading component displays the question count.
export default function Heading(props) {
    const { questionCount, totalQuestions } = props;

    return (
        <>
            <h2>Question {questionCount} of {totalQuestions}</h2>
        </>
    )
};