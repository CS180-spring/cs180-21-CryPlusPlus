import DropdownMenu from "./DropdownMenu"
import { useUserContext } from "@app/context/UserContext";
import { addToLog } from '@utils/helpers';

const DisplayCollection = () => {
  const { userCollections, setCollection, setConsoleLogs } = useUserContext();

  const handleOptionSelect = async (option) => {
    // Set the current collection
    setCollection(option);

    // Send the selected collection to your server
    const response = await fetch('http://localhost/changeCollection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedCollection: option })
    });

    const data = JSON.parse(await response.text());
    console.log('Response from localhost:', data);
    addToLog(data, setConsoleLogs);
  };

  return (
    <div className='flex pb-10'>
      <div className='font-bold text-2xl pr-16'>
        Collection: 
      </div>
      <DropdownMenu options={userCollections} onOptionSelect={handleOptionSelect}/>
    </div>
  )
}

export default DisplayCollection;
