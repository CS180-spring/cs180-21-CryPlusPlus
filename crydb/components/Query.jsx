import React from 'react'
import DropdownMenu from '@components/DropdownMenu';
import TextInput from '@components/TextInput';

const Query = ({ columns }) => {
  return (
    <div className="flex flex-col gap-2 text-sm font-inter">
        <strong>Field</strong>
        <DropdownMenu options={columns.map(obj => obj.Header)} />
        <strong>Condition</strong>
        <DropdownMenu options={['Greater Than', `Less Than`, `Equal To`]} />
        <strong>Value</strong>
        <TextInput placeholder="Enter value"/>
    </div>
  )
}

export default Query