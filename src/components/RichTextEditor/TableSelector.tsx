'use client';
import React, { useState } from 'react';

const TableSelector = () => {
  const [rows, setRows] = useState(0); // For hover effect
  const [cols, setCols] = useState(0); // For hover effect
  const [selectedRows, setSelectedRows] = useState(0); // For locked selection
  const [selectedCols, setSelectedCols] = useState(0); // For locked selection
  const [isLocked, setIsLocked] = useState(false); // Lock state

  const handleMouseOver = (index: number) => {
    if (isLocked) return; // Stop hover if locked
    const row = Math.floor(index / 8);
    const col = index % 8;
    setRows(row + 1);
    setCols(col + 1);
  };

  const handleClick = () => {
    if (isLocked) {
      // If already locked, reset the state to allow a new selection
      setIsLocked(false);
      setRows(0);
      setCols(0);
    } else {
      // Lock the current selection
      setIsLocked(true);
      setSelectedRows(rows);
      setSelectedCols(cols);
    }
  };

  return (
    <div className="bg-secondary p-2 rounded-sm shadow-md">
      <div className="box-container w-[140px] h-auto bg-white grid grid-cols-8 grid-rows-8 gap-1">
        {Array.from({ length: 64 }).map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isHighlighted = row < rows && col < cols; // Hover effect
          const isSelected = row < selectedRows && col < selectedCols; // Locked selection

          return (
            <div
              key={index}
              className={`box w-[15px] h-[15px] border m-0 p-0 ${
                isSelected || isHighlighted ? 'bg-blue-500' : 'bg-white'
              }`}
              onMouseOver={() => handleMouseOver(index)}
              onClick={handleClick} // Lock or reset selection on click
            />
          );
        })}
      </div>
      <p className="mt-2">
        {isLocked ? `Selected: ${selectedRows} x ${selectedCols} (Click again to reselect)` : `${rows} x ${cols}`}
      </p>
    </div>
  );
};

export default TableSelector;
