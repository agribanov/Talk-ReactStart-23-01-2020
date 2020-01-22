import React from 'react';
import Cube from './Cube';

function CubeContainer({ cube, onClick }) {
    return (
        <div
            onClick={() => onClick(cube)}
            className="cube-container"
            style={{
                top: cube.y,
                left: cube.x
            }}
        >
            <Cube cube={cube} />
        </div>
    );
}

export default CubeContainer;
