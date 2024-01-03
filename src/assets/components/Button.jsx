import clsx from 'clsx';

// Button component. Every button component receives the btn class by default.
// btn-correct and btn-wrong get added when the question is answered.
// Whether it's the btn-wrong or the btn-correct class entirely depends on what
// the correct answer is. These classes are responsible for the green/red background.
export default function Button(props) {
    const { variant, children, isAnswered, correctAnswer, ...rest } = props;

    const classes = clsx({
        'btn': true,
        'btn-correct': isAnswered && children === correctAnswer,
        'btn-wrong': isAnswered && children !== correctAnswer
    }, variant);

    return (
        <>
            <button className={classes} {...rest}>{children}</button>
        </>
    )
};