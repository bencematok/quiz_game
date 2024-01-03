import clsx from 'clsx';

// Standard container div to be in line with modern web design philosophies.
export default function Container(props) {
    const { children, variant } = props;

    const classes = clsx({
        'container': true
    }, variant);

    return (
        <>
            <div className={classes}>
                {children}
            </div>
        </>
    )
}