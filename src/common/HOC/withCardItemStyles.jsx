import React from 'react';

const withCardItemStyles = (WrappedComponent, classes) => {
    return (props) => (
        <div className={classes.wrapper}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withCardItemStyles;