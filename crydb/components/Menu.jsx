import Link from "next/link";
import { HiHome } from "react-icons/Hi";
import { AiFillFileText } from "react-icons/Ai";
import { BiExport, BiSave } from "react-icons/Bi";
import { BsFillCollectionFill } from "react-icons/Bs";
import { VscDebugRestart } from "react-icons/vsc";
import { ImCross } from "react-icons/Im";
import { useUserContext } from "@app/context/UserContext";
import { addToLog } from "@utils/helpers";

const exportTable = (selectedCollection, tableData, setConsoleLogs) => {
  // Download
  const jsonDataStr = JSON.stringify(tableData);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
    jsonDataStr
  )}`;

  const link = document.createElement("a");
  link.href = dataUri;
  link.download = selectedCollection + ".json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const data = {
    message: "Downloaded table from " + selectedCollection,
    time: Math.floor(Date.now() / 1000),
  };
  // Create log
  addToLog(data, setConsoleLogs);
};

const Menu = () => {
  const {
    setCreateCollection,
    setAddDocument,
    setDeleteCollection,
    setConsoleLogs,
    tableData,
    selectedCollection,
    userCollections,
  } = useUserContext();
  return (
    <div className="m-0 w-full p-0">
      <Link
        className="flex w-full flex-row items-center gap-2 py-2 font-inter hover:bg-figma-black-grey300"
        href=""
      >
        <HiHome />
        Home
      </Link>
      <button
        className="flex w-full flex-row items-center gap-2 py-2 font-inter hover:bg-figma-black-grey300"
        onClick={() => setCreateCollection(true)}
      >
        <BsFillCollectionFill />
        Create Collection
      </button>
      <button
        className="flex w-full flex-row items-center gap-2 py-2 font-inter hover:bg-figma-black-grey300"
        onClick={() => {
          if (selectedCollection != "") setAddDocument(true);
        }}
      >
        <AiFillFileText />
        Add Document(s)
      </button>
      <button
        className="flex w-full flex-row items-center gap-2 py-2 font-inter hover:bg-figma-black-grey300"
        onClick={() => {
          if (userCollections.length > 0) setDeleteCollection(true);
        }}
      >
        <ImCross />
        Delete Collection
      </button>
      {/* <button className="flex w-full flex-row items-center gap-2 py-2 font-inter hover:bg-figma-black-grey300">
        <VscDebugRestart />
        Restart Table
      </button> */}
      <button
        className="flex w-full flex-row items-center gap-2 py-2 font-inter hover:bg-figma-black-grey300"
        onClick={() =>
          exportTable(selectedCollection, tableData, setConsoleLogs)
        }
      >
        <BiExport />
        Export Table
      </button>
    </div>
  );
};

export default Menu;
