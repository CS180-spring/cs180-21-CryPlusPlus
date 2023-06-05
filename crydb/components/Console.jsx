import React from "react";
import { useUserContext } from "@app/context/UserContext";
import { convertTimeToString } from "@utils/helpers";

const Console = () => {
  const { consoleLogs } = useUserContext();

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-8">
      <div className="flex flex-col gap-2 text-2xl">
        {consoleLogs.map((response, i) => {
          return (
            <div
              className="flex w-full flex-row gap-4 hover:bg-figma-lightpink"
              key={i}
            >
              <div className="font-bold">
                {convertTimeToString(response.time)}:
              </div>
              <div className="w-full">{response.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Console;
