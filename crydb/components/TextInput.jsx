"use client";

import { useState, useEffect } from "react";

const TextInput = ({ onOptionSelect, queries, data, attri }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelection = (option) => {
    setSelectedValue(option);
    if (onOptionSelect) onOptionSelect(option);
  };

  useEffect(() => {
    if (data) setSelectedValue(attri);
  }, [queries]);

  return (
    <input
      placeholder="Type here"
      className="w-full border-2 bg-white px-4 py-1.5 font-inter text-sm font-light text-black drop-shadow-md"
      type="text"
      value={selectedValue}
      onChange={(e) => handleSelection(e.target.value)}
    />
  );
};

export default TextInput;
