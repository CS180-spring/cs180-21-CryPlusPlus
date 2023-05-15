import DropdownMenu from "./DropdownMenu"

const DisplayCollection = ({ collections, setCollection }) => {
  return (
    <div className='flex pb-10'>
      <div className='font-bold text-2xl pr-16'>
        Collection: 
      </div>
      <DropdownMenu options={collections} onOptionSelect={(option) => setCollection(option)}/>
    </div>
  )
}

export default DisplayCollection