// The Question component renders the question inside a paragraph.
export default function Question(props) {
    const { question } = props;

    return (
        <>
            <p>{question}</p>
        </>
    )
}