export const returnStatusFromNumber = (number) => {
    switch(number) {
        case 0:
            return 'Створено';
        case 1:
            return 'Прийнято';
        case 2:
            return 'Відхилено';
        case 3:
            return 'Потрібно відправити';
        case 4:
            return 'Відправлено';
        case 5:
            return 'Завершено';
        case 6:
            return 'Повернення';
        case 7:
            return 'Офлайн'
        default:
            return 'Невідомий статус';
    }
}