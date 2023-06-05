import React from "react";
import JSONView from "react-json-view";
import { useState } from "react";

const DocumentModal = ({ visible, setVisible, jsonString }) => {
  if (!visible) return null;

  const [displayObjectSize, setDisplayObjectSize] = useState(false);
  const [displayDataTypes, setDisplayDataTypes] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);

  let data = JSON.parse(jsonString);
  const UUID = data.__UUID__;
  console.log(UUID);
  delete data["__UUID__"];

  const onDelete = (e) => {
    let fieldPath = null;
    e.namespace.forEach((field) => (fieldPath += field + "/"));
    const requestData = {
      uuid: UUID,
      action: "remove",
      field: fieldPath + e.name,
      newValue: null,
    };
    console.log("deleting", requestData);
  };
  const onEdit = (e) => {
    let fieldPath = "";
    e.namespace.forEach((field) => (fieldPath += field + "/"));
    console.log(e);
    const requestData = {
      uuid: UUID,
      action: "edit",
      field: fieldPath + e.name,
      newValue: e.new_value,
    };
    console.log("editted", requestData);
  };
  const onAdd = (e) => {
    let fieldPath = "";
    e.namespace.forEach((field) => (fieldPath += field + "/"));
    console.log(e);
    const requestData = {
      uuid: UUID,
      action: "add",
      field: fieldPath + e.name,
      newValue: e.new_value,
    };
    console.log("adding", requestData);
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
      onClick={(e) => (e.target.id === "container" ? setVisible(false) : null)}
    >
      <div className="flex h-4/5 w-1/2 flex-col items-center gap-4 border-4 border-figma-purple bg-white px-8 py-16 text-2xl">
        <div className="flex flex-row gap-16 pb-8">
          <div>
            <input
              type="checkbox"
              onChange={() => setDisplayObjectSize(!displayObjectSize)}
            />{" "}
            Show Size
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => setDisplayDataTypes(!displayDataTypes)}
            />{" "}
            Show Type
          </div>
          <div>
            <input type="checkbox" onChange={() => setSortKeys(!sortKeys)} />{" "}
            Sort Keys
          </div>
        </div>
        <JSONView
          src={data}
          name={UUID}
          displayDataTypes={displayDataTypes}
          displayObjectSize={displayObjectSize}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
          sortKeys={sortKeys}
          displayArrayKey={false}
          indentWidth={12}
        />
      </div>
    </div>
  );
};

export default DocumentModal;
