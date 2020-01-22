import React from 'react';

function Cube({ cube }) {
    return <div className={`cube ${cube.type}`}></div>;
}

export default Cube;
