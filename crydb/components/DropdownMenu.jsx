"use client";

import React from "react";
import { useState, useEffect } from "react";
import { RxCaretDown, RxCaretUp, RxCube } from "react-icons/rx";

const DropdownMenu = ({ options, onOptionSelect, data, queries, attri }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select");

  const handleSelection = (option) => {
    setSelectedOption(option);
    if (onOptionSelect) onOptionSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (data) setSelectedOption(`${attri == "" ? "Select" : attri}`);
  }, [queries]);

  return (
    <div className="relative flex w-full flex-col font-inter font-light text-black">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded border-2 bg-white px-4 py-1.5 drop-shadow-md"
      >
        <div
          className={`${
            selectedOption == "Select"
              ? "text-figma-black-grey600"
              : "text-black"
          }`}
        >
          {selectedOption}
        </div>
        {!isOpen ? (
          <RxCaretDown className="text-2xl" />
        ) : (
          <RxCaretUp className="text-2xl" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-[40px] z-10 w-full bg-figma-black-grey300">
          {options.map((option, index) => {
            if (option != selectedOption) {
              return (
                <button
                  key={index}
                  className="flex w-full flex-row items-center gap-2 px-4 py-1.5 text-left text-sm text-figma-black-grey900 hover:bg-figma-black-grey400"
                  onClick={() => handleSelection(option)}
                >
                  <RxCube className="text-lg" />
                  {option}
                </button>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
