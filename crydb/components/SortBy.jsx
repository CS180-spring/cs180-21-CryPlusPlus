import DropdownMenu from "./DropdownMenu";
import TextInput from "./TextInput";
import { useUserContext } from "@app/context/UserContext";

const SortBy = () => {
  const { dataColumns } = useUserContext();

  const ordering = ["ascending order", `descending order`];
  return (
    <div className="flex flex-col gap-2 font-inter text-sm">
      <div className="font-bold">Sort By</div>
      <DropdownMenu options={dataColumns} />
      in
      <DropdownMenu options={ordering} />
    </div>
  );
};

export default SortBy;
