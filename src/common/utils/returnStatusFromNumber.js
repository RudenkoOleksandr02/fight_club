export const returnStatusFromNumber = (number) => {
    switch(number) {
        case 0:
            return 'Створено';
        case 1:
            return 'Прийнято';
        case 2:
            return 'Відхилено';
        case 3:
            return 'Треба відправити';
        case 4:
            return 'Відправлено';
        case 5:
            return 'Виконано';
        case 6:
            return 'Відшкодування';
        default:
            return 'Невідомий статус';
    }
}