import Query from '@components/Query';
import { useState } from 'react';
import { useUserContext } from '@app/context/UserContext';
import { addToLog } from '@utils/helpers';

const Queries = () => {
    const { setTableData, setConsoleLogs } = useUserContext();

    const [queries, setQueries] = useState([]);
    const addQuery = () => {
        const prevQueries = [...queries, <Query />];
        setQueries(prevQueries);
        console.log("adding query");
    }
    const deleteQuery = (i) => {
        console.log(`Deleting ${i}`);
        const prevQueries = [...queries];
        prevQueries.splice(i, 1);
        setQueries(prevQueries);
    }
    const handleQueries = async() => {
        console.log("front-end: handleQueries")
        let queryJSON = {
            "field": "Name",
            "condition": 1,
            "value": "Daniel"
        }
        const jsonString = JSON.stringify(queryJSON);
        try {
            const response = await fetch('http://localhost/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonString
            });
            const data = JSON.parse(await response.text());
            const queryResults = JSON.parse(data.data);
            
            console.log('Response from the server:', data);
            setTableData(queryResults);
            addToLog(data, setConsoleLogs);
        } catch (error) {
            console.error('Error fetching from the server:', error);
        }
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
            <button className='flex justify-center items-center hover:bg-figma-black-grey400 font-inter font-light border-2 w-full' onClick={() => handleQueries()}>
                Query!
            </button>
            </div>
        </div>
    )
}

export default Queries