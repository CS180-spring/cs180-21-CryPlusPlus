"use client";

import { useState } from 'react'
import { BiErrorAlt } from 'react-icons/bi'

const TextInput = ( props ) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <input className="w-64 border-2 py-1.5 px-4 drop-shadow-md text-sm text-black bg-white font-inter font-light" type="text" value={value} onChange={handleChange} {...props} />
  )
}

export default TextInput