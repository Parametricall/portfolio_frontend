import React from 'react';
import { GRID_SIZE } from '../constants';
import Cell from './Cell';

function Canvas() {
    const grid = [];
    // eslint-disable-next-line no-plusplus
    for (let row = 0; row < GRID_SIZE; row++) {
        const currentRow = [];
        // eslint-disable-next-line no-plusplus
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
                // eslint-disable-next-line react/no-array-index-key
                <div key={rowIndex}>
                    {/* eslint-disable-next-line react/no-array-index-key */}
                    {row.map((cell, cellIndex) => <Cell key={cellIndex} cell={cell} />)}
                </div>
            ))}
        </div>
    );
}

export default Canvas;
