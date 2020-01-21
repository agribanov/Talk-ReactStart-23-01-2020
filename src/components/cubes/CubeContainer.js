import React from 'react';
import Cube from './Cube';

function CubeContainer({ cube, isSelected, onSelect }) {
    return (
        <div
            className={`cube-container ${isSelected ? 'selected' : ''}`}
            style={{ top: cube.y, left: cube.x }}
            onClick={e => {
                e.stopPropagation();
            }}
        >
            <Cube cube={cube} />
        </div>
    );
}

export default CubeContainer;
