"use client";

import SortBy from "@components/SortBy";
import Menu from "@components/Menu";
import AddDocuments from "@components/AddDocuments";
import Queries from "@components/Queries";
import DisplayCollection from "@components/DisplayCollection";
import CreateCollection from "@components/CreateCollection";
import DeleteCollection from "@components/DeleteCollection";
import DeleteDocument from "@components/DeleteDocument";
import DisplayToggleSwitch from "@components/DisplayToggleSwitch";
import { useUserContext } from "@app/context/UserContext";

const Main = () => {
  const { selectedCollection } = useUserContext();
  return (
    <div>
      <div className="h-40 w-full bg-figma-purple" />
      <div className="flex h-screen flex-row">
        <div className="flex h-full w-96 flex-col gap-4 p-8">
          <Menu />
          <hr className="border-b border-black" />
          {selectedCollection != "" && (
            <div>
              <SortBy />
              <hr className="my-4 border-b border-black" />
              <Queries />
            </div>
          )}
        </div>
        <div className="mb-8 h-full w-full flex-1 justify-center p-8">
          <DisplayCollection />
          <DisplayToggleSwitch />
        </div>
      </div>
      <div className="absolute z-50">
        <CreateCollection />
        <AddDocuments />
        <DeleteCollection />
        <DeleteDocument />
      </div>
    </div>
  );
};

export default Main;
