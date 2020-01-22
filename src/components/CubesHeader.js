import React from 'react';
import Cube from './Cube';

function CubesHeader({ cube, onCubeChange }) {
    function onTypeChange(e) {
        console.log(e.target.value);
        onCubeChange({
            id: cube.id,
            type: e.target.value
        });
    }

    function renderCubeInfo() {
        return (
            <div className="avatar">
                <Cube cube={cube} />
                <select
                    name="cubeType"
                    value={cube.type}
                    onChange={onTypeChange}
                >
                    <option value="zombie">Zombie</option>
                    <option value="creeper">Creeper</option>
                    <option value="enderman">Enderman</option>
                    <option value="skeleton">Skeleton</option>
                    <option value="player">Player</option>
                    <option value="citizen">Citizen</option>
                    <option value="pig">Pig</option>
                    <option value="cow">Cow</option>
                    <option value="spider">Spider</option>
                    <option value="sheep">Sheep</option>
                    <option value="dog">Dog</option>
                </select>
            </div>
        );
    }
    return (
        <div className="cubes-header">
            {cube.id ? renderCubeInfo() : 'Select a Cube'}
        </div>
    );
}

export default CubesHeader;
