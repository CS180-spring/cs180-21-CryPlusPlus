import Link from 'next/link';
import { HiHome } from 'react-icons/Hi';
import { AiFillFileText } from 'react-icons/Ai';
import { MdDeleteForever } from 'react-icons/Md';
import { BiExport } from 'react-icons/Bi';

const Menu = () => {
  return (
    <div className='m-0 p-0 w-full'>
      <Link className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' href=''>
        <HiHome />
        Home
      </Link>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <AiFillFileText />
        Add Document
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <MdDeleteForever />
        Delete Document
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <BiExport />
        Export Document
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        ...
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        ...
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        ...
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        ...
      </button>
    </div>
  )
}

export default Menu