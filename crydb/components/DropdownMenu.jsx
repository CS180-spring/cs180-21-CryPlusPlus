"use client";

import React from "react"
import { useState } from "react"
import { RxCaretDown, RxCaretUp, RxCube } from "react-icons/rx"

const DropdownMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select');

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className="font-inter font-light flex flex-col w-64 text-black">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full gap-2 justify-between bg-white py-1.5 px-4 items-center border-2 rounded drop-shadow-md"
      >
        <div className={`${selectedOption == 'Select' ? 'text-figma-black-grey600' : 'text-black'}`}>
          {selectedOption}
        </div>
        {!isOpen ? (
          <RxCaretDown className="text-2xl" />
        ) : (
          <RxCaretUp className="text-2xl" />
        )}
      </button>
      {isOpen && (
        <div className="bg-figma-black-grey300">
          {options.map((option, index) => {
              if (option != selectedOption) {
                return (
                  <button
                    key={index}
                    className="flex flex-row gap-2 py-1.5 px-4 hover:bg-figma-black-grey400 w-full text-left items-center text-sm text-figma-black-grey900"
                    onClick={() => handleSelection(option)}
                  >
                    <RxCube className="text-lg"/>
                    {option}
                  </button>
                );
              }
            })}
          </div>
        )}
      </div>
  )
}

export default DropdownMenu