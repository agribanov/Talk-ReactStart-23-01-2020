import React from 'react';
import CubeContainer from './CubeContainer';

function CubesField({ cubesList, selectedCube, onSelect, onClick }) {
    return (
        <div className="cubes-field" onClick={onClick}>
            {cubesList.map(item => (
                <CubeContainer
                    key={item.id}
                    cube={item}
                    onSelect={onSelect}
                    isSelected={item === selectedCube}
                />
            ))}
        </div>
    );
}

export default CubesField;
