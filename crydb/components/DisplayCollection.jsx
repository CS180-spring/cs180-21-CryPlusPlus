import DropdownMenuState from "./DropdownMenuState";
import { useUserContext } from "@app/context/UserContext";
import { addToLog, updateTable } from "@utils/helpers";

const DisplayCollection = () => {
  const {
    userCollections,
    selectedCollection,
    setCollection,
    setConsoleLogs,
    setDataColumns,
    setTableData,
  } = useUserContext();

  const handleOptionSelect = async (option) => {
    // Set the current collection
    setCollection(option);

    // Send the selected collection to your server
    const response = await fetch("http://localhost/changeCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedCollection: option }),
    });

    const data = JSON.parse(await response.text());
    const table = data.data;
    console.log("Response from localhost:", data);
    updateTable(table.data, setTableData);
    setDataColumns(table.columns);
    addToLog(data, setConsoleLogs);
  };

  return (
    <div className="flex pb-10">
      <div className="pr-16 text-2xl font-bold">Collection:</div>
      <DropdownMenuState
        options={userCollections}
        onOptionSelect={handleOptionSelect}
        selectedOption={selectedCollection}
        setSelectedOption={setCollection}
      />
    </div>
  );
};

export default DisplayCollection;
