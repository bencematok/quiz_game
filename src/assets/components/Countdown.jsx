import clsx from 'clsx';

// The Countdown component is responsible for displaying how many seconds the user has left to
// answer the question. If the remaining time is less than 6 seconds, the number is turned red.
export default function Countdown(props) {
    const { timeRemaining } = props;

    const classes = clsx({
        'countdown': 6 > timeRemaining
    });

    return (
        <>
            <p className='bold'><span className={classes}>{timeRemaining}</span> seconds remaining.</p>
        </>
    )
}