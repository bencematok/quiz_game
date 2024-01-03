import Button from "./Button";

// The Start funcion is rendered before each game.
export default function Start(props) {
    const { onStartClick } = props;

    return (
        <>
            <div className="text-center">
                <h2>
                    Start Game
                </h2>
                <Button onClick={onStartClick}>Start</Button>
            </div>
        </>
    )
}