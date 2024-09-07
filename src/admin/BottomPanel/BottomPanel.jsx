import React, {useState} from 'react';
import classes from './BottomPanel.module.css';
import Pagination from '../../components/ui/Pagination/Pagination'
import {ReactComponent as IcoArrow} from './../../assets/images/arrows/ico_arrow3.svg'
import useMouseOutsideForBtns from "../../common/hooks/useMouseOutsideForBtns";

const BottomPanel = ({currentPage, amount, totalCount, setCurrentPage, setAmount, amountTitle}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleClickByAmount = (number) => {
        setAmount(number);
        setIsOpenModal(false);
    }
    const handlePageChange = page => setCurrentPage(page);

    const amountRef = useMouseOutsideForBtns(setIsOpenModal);

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <div className={classes.amount} ref={amountRef}>
                    <button onClick={() => setIsOpenModal(!isOpenModal)}
                            className={`${classes.button} ${isOpenModal ? classes.isOpen : ''}`}
                    >
                        {amount}
                        <IcoArrow/>
                    </button>
                    <div className={`${classes.modal} ${isOpenModal ? classes.isOpen : ''}`}>
                        <div className={classes.content}>
                            <span onClick={() => handleClickByAmount(5)}>5</span>
                            <span onClick={() => handleClickByAmount(10)}>10</span>
                            <span onClick={() => handleClickByAmount(15)}>15</span>
                            <span onClick={() => handleClickByAmount(20)}>20</span>
                            <span onClick={() => handleClickByAmount(25)}>25</span>
                            <span onClick={() => handleClickByAmount(30)}>30</span>
                            <span onClick={() => handleClickByAmount(35)}>35</span>
                            <span onClick={() => handleClickByAmount(40)}>40</span>
                            <span onClick={() => handleClickByAmount(45)}>45</span>
                            <span onClick={() => handleClickByAmount(50)}>50</span>
                        </div>
                    </div>
                </div>
                <p>{amountTitle}</p>
            </div>
            <Pagination currentPage={currentPage} amount={amount} totalCount={totalCount}
                        onPageChange={handlePageChange}/>
        </div>
    );
};

export default BottomPanel;