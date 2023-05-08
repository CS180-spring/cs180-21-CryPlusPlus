"use client";

import Table from '@components/Table'
import SortBy from '@components/SortBy';
import Menu from '@components/Menu';
import Query from '@components/Query';
import { useState } from 'react';

const data = [
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
]

const Main = () => {
  const [queries, setQueries] = useState([]);
  const addQuery = () => {
    const prevQueries = [...queries, <Query columns={cols} />];
    setQueries(prevQueries);
    console.log(prevQueries);
  }
  const deleteQuery = (i) => {
    console.log(`Deleting ${i}`);
    const prevQueries = [...queries];
    prevQueries.splice(i, 1);
    setQueries(prevQueries);
  }
  return (
    <div>
      <div className='bg-figma-purple w-full h-40' />
      <div className='flex flex-row'>
        <div className='flex flex-col p-8 gap-4 w-full'>
          <Menu />
          <SortBy fields={cols.map(obj => obj.Header)} />
          <hr className='border-b border-black' />
          <div className='font-bold text-xl'>
            Queries
          </div>
          {queries.map((data, i) => {
            return (
              <div className='flex flex-row items-center'>
                <button key={i} className='py-2 px-4 m-2 font-inter font-light border-2 hover:bg-figma-black-grey400' onClick={() => deleteQuery(i)}>x</button>
                {data}
              </div>
            )
          })}
          <div className='flex flex-row'>
            <button className='flex justify-center items-center hover:bg-figma-black-grey400 font-inter font-light border-2 w-full' onClick={() => addQuery()}>
                Add New Query
            </button>
            <button className='flex justify-center items-center hover:bg-figma-black-grey400 font-inter font-light border-2 w-full'>
                Query!
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center p-8 w-full'>
          <Table columns={cols} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Main