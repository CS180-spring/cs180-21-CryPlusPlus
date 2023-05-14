import Query from '@components/Query';
import { useState } from 'react';

const Queries = ({ columns }) => {
    const [queries, setQueries] = useState([]);
    const addQuery = () => {
        const prevQueries = [...queries, <Query columns={columns} />];
        setQueries(prevQueries);
        console.log("adding query");
    }
    const deleteQuery = (i) => {
        console.log(`Deleting ${i}`);
        const prevQueries = [...queries];
        prevQueries.splice(i, 1);
        setQueries(prevQueries);
    }
    return (
        <div className='flex flex-col gap-4'>
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
            <div className='flex flex-row pb-20'>
            <button className='flex justify-center items-center hover:bg-figma-black-grey400 font-inter font-light border-2 w-full' onClick={() => addQuery()}>
                Add New Query
            </button>
            <button className='flex justify-center items-center hover:bg-figma-black-grey400 font-inter font-light border-2 w-full'>
                Query!
            </button>
            </div>
        </div>
    )
}

export default Queries