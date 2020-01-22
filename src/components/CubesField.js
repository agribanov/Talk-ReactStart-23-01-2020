import React from 'react';
import CubeContainer from './CubeContainer';

function CubesField({ list, onCubeClick, onClick }) {
    return (
        <div className="cubes-field" onClick={onClick}>
            {list.map(item => {
                return (
                    <CubeContainer
                        key={item.id}
                        cube={item}
                        onClick={onCubeClick}
                    />
                );
            })}
        </div>
    );
}

export default CubesField;
