"use client";

import { useState } from "react";

const TextInput = ({ value, setValue }) => {
  return (
    <input
      placeholder="Type here"
      className="w-full border-2 bg-white px-4 py-1.5 font-inter text-sm font-light text-black drop-shadow-md"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextInput;
