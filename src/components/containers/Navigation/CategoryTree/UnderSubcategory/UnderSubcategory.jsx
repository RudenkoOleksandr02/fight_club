import React, { useRef, useEffect } from 'react';
import classes from "./UnderSubcategory.module.css";
import SecondaryButton from "../../../../ui/Buttons/SecondaryButton/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const UnderSubcategory = ({ subcategories, setShowCategoryTree }) => {
    const navigate = useNavigate();
    const nodeRefs = useRef({});
    const prevSelectedSubcategoryIdRef = useRef(null);

    const openSubcategory = subcategories.find(
        (subcategory) => subcategory.isOpen && subcategory.underSubcategories.length > 0
    );

    const isSwitchingSubcategories =
        prevSelectedSubcategoryIdRef.current !== null &&
        openSubcategory &&
        prevSelectedSubcategoryIdRef.current !== openSubcategory.subcategoryId;

    useEffect(() => {
        prevSelectedSubcategoryIdRef.current = openSubcategory ? openSubcategory.subcategoryId : null;
    }, [openSubcategory]);

    const underSubcategoriesJSX = (
        <TransitionGroup component={null}>
            {openSubcategory && openSubcategory.underSubcategories.map(underSubcategory => {
                const nodeRef = nodeRefs.current[underSubcategory.underSubcategoryId] || React.createRef();
                nodeRefs.current[underSubcategory.underSubcategoryId] = nodeRef;

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
            })}
        </TransitionGroup>
    );

    return (
        <div
            className={`${classes.underSubcategories} ${subcategories.some(subcategory => subcategory.isOpen) ? classes.isOpen : ''} ${isSwitchingSubcategories ? classes.switching : ''}`}
        >
            {underSubcategoriesJSX}
        </div>
    );
};

export default UnderSubcategory;
