import React, {useState} from 'react';
import classes from "../ProductsContainer.module.css";
import SelectButton from "../../../buttons/SelectButton/SelectButton";

const SortButton = ({sortOption, handleSortOption, setSortOption}) => {
    const [isOpenModalSort, setIsOpenModalSort] = useState(false);

    const returnNameSortButton = () => {
        if (sortOption.startsWith('popularity')) {
            return 'За популярністью';
        } else if (sortOption.startsWith('views')) {
            return 'За переглядами';
        } else if (sortOption.startsWith('rating')) {
            return 'За рейтингом';
        } else if (sortOption.startsWith('reviews')) {
            return 'За кількістью відгуків';
        } else if (!sortOption.length) {
            return 'За замовчуванням';
        } else {
            return 'Сортувати за';
        }
    };
    const returnInformationForSort = (option, text1, text2) => {
        if (sortOption.endsWith('_desc') && sortOption.startsWith(option)) {
            return <p className={classes.information}>({text2})</p>;
        } else if (sortOption.endsWith('_asc') && sortOption.startsWith(option)) {
            return <p className={classes.information}>({text1})</p>;
        } else {
            return '';
        }
    };

    return (
        <SelectButton
            title={returnNameSortButton()}
            content={<>
                <button onClick={() => setSortOption('')}>
                    Замовчуванням
                </button>
                <button onClick={() => handleSortOption('popularity')}>
                    Популярністю
                    {returnInformationForSort('popularity', 'Популярні', 'Не популярні')}
                </button>
                <button onClick={() => handleSortOption('views')}>
                    Переглядами
                    {returnInformationForSort('views', 'Більше переглядів', 'Меньше переглядів')}
                </button>
                <button onClick={() => handleSortOption('rating')}>
                    Рейтингом
                    {returnInformationForSort('rating', 'Вищий рейтинг', 'Нижчий рейтинг')}
                </button>
                <button onClick={() => handleSortOption('reviews')}>
                    Кількістю відгуків
                    {returnInformationForSort('reviews', 'Більше відгуків', 'Меньше відгуків')}
                </button>
            </>}
            setIsOpenModal={setIsOpenModalSort}
            isOpenModal={isOpenModalSort}
        />
    );
};

export default SortButton;