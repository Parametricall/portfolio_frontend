import React from 'react';
import { GRID_SIZE } from '../constants';
import Cell from './Cell';

function Canvas(props) {
    const grid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            currentRow.push('O');
        }
        grid.push(currentRow);
    }

    return (
        <div>
            Hello Snake World
            <hr />
            {grid.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, cellIndex) => <Cell key={cellIndex} cell={cell} />)}
                </div>
            ))}
        </div>
    );
}

export default Canvas;
