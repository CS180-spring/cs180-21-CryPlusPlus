import DropdownMenu from "./DropdownMenu"

const DisplayCollection = ({ collections, setCollection }) => {

  const handleOptionSelect = async (option) => {
    // Set the current collection
    setCollection(option);

    // Send the selected collection to your server
    const response = await fetch('/changeCollection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedCollection: option })
    });

    const data = await response.json();

    // Do something with the response data
  };

  return (
    <div className='flex pb-10'>
      <div className='font-bold text-2xl pr-16'>
        Collection: 
      </div>
      <DropdownMenu options={collections} onOptionSelect={handleOptionSelect}/>
    </div>
  )
}

export default DisplayCollection;
