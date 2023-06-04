import DropdownMenu from "./DropdownMenu";
import { useUserContext } from "@app/context/UserContext";
import { useState } from "react";
import { addToLog, updateTable } from "@utils/helpers";

const SortBy = () => {
  const { dataColumns, setTableData, setConsoleLogs, setDataColumns } =
    useUserContext();
  const [field, setField] = useState("");
  const [order, setOrder] = useState("");

  const handleSort = async () => {
    const jsonSort = {
      field: field,
      order: order,
    };

    try {
      const response = await fetch("http://localhost/sortBy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonSort),
      });
      const data = JSON.parse(await response.text());
      const table = data.data;

      console.log("Response from the server:", data);
      updateTable(table.data, setTableData);
      setDataColumns(table.columns);
      addToLog(data, setConsoleLogs);
    } catch (error) {
      console.error("Error fetching from the server:", error);
    }
  };

  const ordering = ["ascending order", `descending order`];
  return (
    <div className="flex flex-col gap-2 font-inter text-sm">
      <div className="font-bold">Sort By</div>
      <DropdownMenu options={dataColumns} onOptionSelect={setField} />
      in
      <DropdownMenu options={ordering} onOptionSelect={setOrder} />
      <div className="mt-2 flex items-center justify-center">
        <button
          className="w-1/2 items-center border-2 font-inter font-light hover:bg-figma-black-grey400"
          onClick={handleSort}
        >
          Sort!
        </button>
      </div>
    </div>
  );
};

export default SortBy;
