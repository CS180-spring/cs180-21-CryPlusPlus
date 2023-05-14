import Link from 'next/link';
import { HiHome } from 'react-icons/Hi';
import { AiFillFileText } from 'react-icons/Ai';
import { MdDeleteForever } from 'react-icons/Md';
import { BiExport, BiSave } from 'react-icons/Bi';
import { BsFillCollectionFill } from 'react-icons/Bs'
import { ImCross } from 'react-icons/Im'

const Menu = () => {
  return (
    <div className='m-0 p-0 w-full'>
      <Link className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' href=''>
        <HiHome />
        Home
      </Link>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <BsFillCollectionFill />
        Create Collection
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <ImCross />
        Delete Collection
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <AiFillFileText />
        Add Document(s)
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <MdDeleteForever />
        Delete Document
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <BiSave />
        Save Changes
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <BiExport />
        Export Table
      </button>
    </div>
  )
}

export default Menu