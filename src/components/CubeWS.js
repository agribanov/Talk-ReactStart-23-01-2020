import React, { useState, useEffect } from 'react';
import data from './data';
import CubesField from './CubesField';
import CubesHeader from './CubesHeader';
import openSocket from 'socket.io-client';
const socket = openSocket('https://agtalks.herokuapp.com/');

function CubesWS() {
    const [cubesList, setCubesList] = useState([]);
    const [playerCube, setPlayerCube] = useState({
        id: Math.random(),
        type: 'skeleton',
        x: 200,
        y: 200
    });

    useEffect(() => {
        socket.emit('addCube', playerCube);

        socket.on('addCube', onSocketAddCube);
        socket.on('removeCube', onSocketRemoveCube);
        socket.on('changeCube', onSocketChangeCube);

        function onSocketRemoveCube(id) {
            setCubesList(cubesList => cubesList.filter(item => item.id != id));
        }

        function onSocketAddCube(msg) {
            console.log(msg);
            setCubesList(cubesList => [...cubesList, msg]);
        }

        function onSocketChangeCube(changedCube) {
            setCubesList(cubesList => {
                return cubesList.map(item => {
                    return item.id !== changedCube.id
                        ? item
                        : {
                              ...item,
                              ...changedCube
                          };
                });
            });
        }
    }, []);

    function onFieldClick(e) {
        const rect = e.target.getBoundingClientRect();

        console.log(rect);

        onCubeChange({
            id: playerCube.id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }

    function onCubeChange(changedCube) {
        console.log('onCubeChange', changedCube);
        const newCube = {
            ...playerCube,
            ...changedCube
        };
        setPlayerCube(newCube);

        socket.emit('changeCube', newCube);
    }

    return (
        <div className="cubes">
            <CubesHeader cube={playerCube} onCubeChange={onCubeChange} />
            <CubesField
                list={cubesList}
                selectedCube={playerCube}
                onClick={onFieldClick}
            />
        </div>
    );
}

export default CubesWS;
