import React from "react";

const Table = ({ data, collections }) => {
  console.log("test");
  return (
    <div className="h-full">
      <div className="flex justify-center font-bold text-3xl">
        {collections}
      </div>
      {data.map((element, i) => {
        let document = JSON.stringify(element);
        return (
          <div className="hover:bg-figma-lightpink" key={i}>
              Entry: {document} 
          </div>
        )
      })}
    </div>
  )
};

export default Table