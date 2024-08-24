export const roundNumber = (number) => {
    if (Number.isInteger(number)) {
        return number.toString();
    } else if (number * 10 % 1 === 0) {
        return number.toFixed(1).replace(/\.0$/, '');
    } else {
        return number.toFixed(2);
    }
}