import React from 'react';


function Cell(props) {
  const {cell} = props;
  return (
    <div>
      {cell}
    </div>
  );
}

export default Cell;