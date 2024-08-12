import React from 'react';

const CustomHeaderGroupComponent = ({ displayName, columnGroup }) => {
    const groupStyle = {
    };

    return (
        <div style={groupStyle}>
            {displayName}
        </div>
    );
};

export default CustomHeaderGroupComponent;
