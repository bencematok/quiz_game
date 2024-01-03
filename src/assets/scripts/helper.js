export default function helper () {
    // A shuffle function.
    const shuffle = (array) => {
        // We declare a current index variable, equal to the array's length.
        // We also declare a random index variable.
        // While the current index is, we assign a random number between 0 and the current index (current index not included)
        // We swap the array element with under current index with the array element with random index.
        // Lastly we decrease the current index by 1.
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    return { shuffle };
};