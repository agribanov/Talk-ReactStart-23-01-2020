import React, { useState, useEffect } from 'react';

import CubesField from './CubesField';
import CubesHeader from './CubesHeader';

import openSocket from 'socket.io-client';
const socket = openSocket('https://agtalks.herokuapp.com/');

function Bricks() {
    const [cubesList, setCubesList] = useState([]);
    const [selectedCube, setSelectedCube] = useState({
        type: 'zombie',
        id: Math.random(),
        x: 100,
        y: 100
    });

    useEffect(() => {
        socket.on('addCube', onSocketAdd);
        socket.on('removeCube', onSocketRemove);
        socket.on('changeCube', onSocketChange);
        console.log('effect');

        socket.emit('addCube', selectedCube);

        function onSocketAdd(msg) {
            console.log('add', msg);

            setCubesList(cubesList => [...cubesList, msg]);
        }

        function onSocketChange(msg) {
            console.log('changeCube', msg);

            setCubesList(cubesList => {
                return cubesList.map(item => {
                    return item.id !== msg.id ? item : msg;
                });
            });
        }

        function onSocketRemove(id) {
            setCubesList(cubesList => {
                return cubesList.filter(item => {
                    return item.id !== id;
                });
            });
        }
    }, [selectedCube]);

    function changeCube(changedCube) {
        socket.emit('changeCube', changedCube);

        setSelectedCube(Object.assign(selectedCube, changedCube));
    }

    function onFieldClick(e) {
        if (!selectedCube) return;

        const rect = e.target.getBoundingClientRect();

        changeCube({
            id: selectedCube.id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    }

    return (
        <div className="cubes">
            <CubesHeader selectedCube={selectedCube} onChange={changeCube} />
            <CubesField
                cubesList={cubesList}
                selectedCube={selectedCube}
                onSelect={setSelectedCube}
                onClick={onFieldClick}
            />
        </div>
    );
}

export default Bricks;
