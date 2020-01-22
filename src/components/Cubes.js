import React, { useState } from 'react';
import data from './data';
import CubesField from './CubesField';
import CubesHeader from './CubesHeader';
function Cubes() {
    const [cubesList, setCubesList] = useState(data);
    const [selectedCube, setSelectedCube] = useState({});

    function onCubeClick(cube) {
        console.log(cube);
        setSelectedCube(cube);
    }

    function onCubeChange(changedCube) {
        console.log(changedCube);

        const newList = cubesList.map(item => {
            return item.id !== changedCube.id
                ? item
                : {
                      ...item,
                      ...changedCube
                  };
        });

        setCubesList(newList);
        setSelectedCube(newList.find(item => item.id === changedCube.id));
    }

    function onFieldClick(e) {
        if (!selectedCube.id) return;

        const rect = e.target.getBoundingClientRect();

        console.log(rect);

        onCubeChange({
            id: selectedCube.id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }

    return (
        <div className="cubes">
            <CubesHeader cube={selectedCube} onCubeChange={onCubeChange} />
            <CubesField
                list={cubesList}
                onCubeClick={onCubeClick}
                onClick={onFieldClick}
            />
        </div>
    );
}

export default Cubes;
