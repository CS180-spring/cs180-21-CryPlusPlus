import React from "react";
import Table from "./Table";
import { useState } from "react";
import Console from "./Console";

const DisplayToggleSwitch = () => {
  const [toggle, setToggle] = useState("Table");

  return (
    <div className="h-full w-full">
      <div className="z-10 flex flex-row gap-1">
        <button
          className={`${
            toggle === "Table" ? "z-10" : ""
          } absolute translate-y-[-4px] rounded-t-lg border-4 border-b-0 border-figma-purple border-b-white bg-white px-6 py-2`}
          onClick={() => setToggle("Table")}
        >
          Table
        </button>
        <button
          className={`${
            toggle === "Console" ? "z-10" : ""
          } absolute translate-x-24 translate-y-[-4px] rounded-t-lg border-4 border-b-0 border-figma-purple border-b-white bg-white px-6 py-2`}
          onClick={() => setToggle("Console")}
        >
          Console
        </button>
      </div>
      <div className="relative mt-9 h-full w-full border-4 border-figma-purple">
        {toggle === "Table" && <Table />}
        {toggle === "Console" && <Console />}
      </div>
    </div>
  );
};

export default DisplayToggleSwitch;
