import React, {useRef} from 'react';
import classes from "./UnderSubcategory.module.css";
import SecondaryButton from "../../../../ui/Buttons/SecondaryButton/SecondaryButton";
import {useNavigate} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const UnderSubcategory = ({subcategories, setShowCategoryTree}) => {
    const navigate = useNavigate();

    const generateRef = () => React.createRef();

    const underSubcategoriesJSX = (
        <TransitionGroup component={null}>
            {subcategories.flatMap(subcategory => {
                if (subcategory.isOpen && subcategory.underSubcategories) {
                    return subcategory.underSubcategories.map(underSubcategory => {
                        const nodeRef = generateRef();
                        return (
                            <CSSTransition
                                key={underSubcategory.underSubcategoryId}
                                nodeRef={nodeRef}
                                timeout={300}
                                classNames={{
                                    enter: classes.underSubcategoryEnter,
                                    enterActive: classes.underSubcategoryEnterActive,
                                    exit: classes.underSubcategoryExit,
                                    exitActive: classes.underSubcategoryExitActive
                                }}
                            >
                                <div ref={nodeRef}>
                                    <SecondaryButton
                                        handleClick={() => {
                                            setShowCategoryTree(false);
                                            navigate(`/category/${underSubcategory.underSubcategoryId}`);
                                        }}
                                    >
                                        {underSubcategory.underSubcategoryName}
                                    </SecondaryButton>
                                </div>
                            </CSSTransition>
                        );
                    });
                }
                return [];
            })}
        </TransitionGroup>
    );

    return (
        <div
            className={`${classes.underSubcategories} ${subcategories.some(subcategory => subcategory.isOpen) ? classes.isOpen : ''}`}
        >
            {underSubcategoriesJSX}
        </div>
    );
};

export default UnderSubcategory;
