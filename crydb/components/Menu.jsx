import Link from 'next/link';
import { HiHome } from 'react-icons/Hi';
import { AiFillFileText } from 'react-icons/Ai';
import { MdDeleteForever } from 'react-icons/Md';
import { BiExport, BiSave } from 'react-icons/Bi';
import { BsFillCollectionFill } from 'react-icons/Bs'
import { ImCross } from 'react-icons/Im'
import { useUserContext } from '@app/context/UserContext';
import { addToLog } from '@utils/helpers';

const exportTable = (selectedCollection, tableData, setConsoleLogs) => {

  // Download
  const jsonDataStr = JSON.stringify(tableData);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonDataStr)}`;

  const link = document.createElement('a');
  link.href = dataUri;
  link.download = selectedCollection + '.json';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const data = {
    "message": "Downloaded table from " + selectedCollection,
    "time": Math.floor(Date.now() / 1000),
  }
  // Create log
  addToLog(data, setConsoleLogs);
}

const Menu = () => {
  const { setCreateCollection, setAddDocument, setDeleteDocument, setDeleteCollection, setConsoleLogs, tableData, selectedCollection } = useUserContext();
  return (
    <div className='m-0 p-0 w-full'>
      <Link className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' href=''>
        <HiHome />
        Home
      </Link>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' onClick={() => setCreateCollection(true)}>
        <BsFillCollectionFill />
        Create Collection
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' onClick={() => setAddDocument(true)}>
        <AiFillFileText />
        Add Document(s)
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' onClick={() => setDeleteCollection(true)}>
        <ImCross />
        Delete Collection
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' onClick={() => setDeleteDocument(true)}>
        <MdDeleteForever />
        Delete Document
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full'>
        <BiSave />
        Save Changes
      </button>
      <button className='flex flex-row items-center gap-2 font-inter py-2 hover:bg-figma-black-grey300 w-full' onClick={() => exportTable(selectedCollection, tableData, setConsoleLogs)}>
        <BiExport />
        Export Table
      </button>
    </div>
  )
}

export default Menu