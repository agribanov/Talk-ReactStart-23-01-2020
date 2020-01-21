import React from 'react';
import Cube from './Cube';

function CubesHeader({ selectedCube, onChange }) {
    function onTypeChange(e) {
        onChange({
            id: selectedCube.id,
            type: e.target.value
        });
    }
    function renderCubeInfo() {
        return (
            <>
                <div className="avatar">
                    <Cube cube={selectedCube} />
                </div>
                <select
                    name="cubeType"
                    value={selectedCube.type}
                    onChange={onTypeChange}
                >
                    <option value="creeper">Creeper</option>
                    <option value="zombie">Zombie</option>
                </select>
            </>
        );
    }

    return (
        <div className="cubes-header">
            {selectedCube ? renderCubeInfo() : <div>Select a Cube </div>}
        </div>
    );
}

export default CubesHeader;
