export const roundNumber = (number) => {
    const formatNumber = Number(number);

    if (Number.isInteger(formatNumber)) {
        return formatNumber.toString();
    }

    if (formatNumber * 10 % 1 === 0) {
        return formatNumber.toFixed(1).replace(/\.0$/, '');
    }

    if (formatNumber === 0) {
        return '0';
    }

    return formatNumber.toFixed(2);
}