"use client";

import { useState } from 'react'

const TextInput = ({ value, setValue }) => {
  return (
    <input placeholder='Type here' className="w-full border-2 py-1.5 px-4 drop-shadow-md text-sm text-black bg-white font-inter font-light" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

export default TextInput