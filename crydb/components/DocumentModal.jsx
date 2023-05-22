import React from 'react'
import JSONView from 'react-json-view'
import { useState } from 'react';

const DocumentModal = ({ visible, setVisible, jsonString }) => {
    if (!visible) return null;
    const onDelete = () => {
        console.log("deleting");
    }
    const onEdit = () => {
        console.log("editted");
    }
    const onAdd = () => {
        console.log("adding");
    }

    const [displayObjectSize, setDisplayObjectSize] = useState(false);
    const [displayDataTypes, setDisplayDataTypes] = useState(false);
    const [sortKeys, setSortKeys] = useState(false);
    return (
        <div id='container' className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm' onClick={(e) => e.target.id === 'container' ? setVisible(false) : null}>
            <div className='border-4 border-figma-purple flex flex-col gap-4 w-1/2 h-4/5 items-center px-8 bg-white py-16 text-2xl'>
                <div className='flex flex-row gap-16 pb-8'>
                    <div>
                        <input type="checkbox" onChange={() => setDisplayObjectSize(!displayObjectSize)} /> Show Size
                    </div>
                    <div>
                        <input type="checkbox" onChange={() => setDisplayDataTypes(!displayDataTypes)} /> Show Type
                    </div>
                    <div>
                        <input type="checkbox" onChange={() => setSortKeys(!sortKeys)} /> Sort Keys
                    </div>
                </div>
                <JSONView src={JSON.parse(jsonString)} name="UID_n" displayDataTypes={displayDataTypes} displayObjectSize={displayObjectSize} onDelete={onDelete} onEdit={onEdit} onAdd={onAdd} sortKeys={sortKeys} displayArrayKey={false} indentWidth={12} />
            </div>
        </div>
    )
}

export default DocumentModal