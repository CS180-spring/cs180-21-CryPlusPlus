"use client";

import Table from '@components/Table'
import SortBy from '@components/SortBy';
import Menu from '@components/Menu';
import { useState } from 'react';
import DropdownMenu from '@components/DropdownMenu';
import AddDocuments from '@components/AddDocuments';
import Queries from '@components/Queries';

const data = [
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Bowen",
    lastName: "Tang",
    major: "Computer Science",
  },
  {
    firstName: "Ethan",
    lastName: "Ortega",
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Zinal",
    lastName: "Patel",
    major: "Bioengineering",
  },
  {
    firstName: "Eddie",
    lastName: "Vargas",
    major: "Psychology",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
  {
    firstName: "Daniel",
    lastName: "Castaneda",
    age: 20,
    year: 3,
    major: "Computer Science",
  },
];
const cols = [
  {
    Header: "firstName",
    accessor: "firstName",
  },
  {
    Header: "lastName",
    accessor: "lastName",
  },
  {
    Header: "age",
    accessor: "age",
  },
  {
    Header: "year",
    accessor: "year",
  },
  {
    Header: "major",
    accessor: "major",
  },
];
const collections = ["Recipes", "Employees", "Movies"];

const Main = () => {
  const [addDocument, setAddDocument] = useState(false);
  const [selectedCollection, setCollection] = useState('');

  
  
  return (
    <div>
      <div className='bg-figma-purple w-full h-40' />
      <div className='flex flex-row h-screen'>
        <div className='flex flex-col p-8 gap-4 w-96 h-full'>
          <Menu setAddDocument={setAddDocument}/>
          <hr className='border-b border-black' />
          <SortBy fields={cols.map(obj => obj.Header)} />
          <hr className='border-b border-black' />
          <Queries columns={cols} />
        </div>
        <div className='flex-1 w-full justify-center p-8'>
          <div className='flex pb-10'>
            <div className='font-bold text-2xl pr-16'>
              Collection: 
            </div>
            <DropdownMenu options={collections} onOptionSelect={(option) => setCollection(option)}/>
          </div>
          <Table columns={cols} data={data} />
        </div>
      </div>
      <AddDocuments setAddDocument={setAddDocument} visible={addDocument} name={selectedCollection} />
    </div>
  )
}

export default Main