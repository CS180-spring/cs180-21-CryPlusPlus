import DropdownMenu from "./DropdownMenu";
import TextInput from "./TextInput";

const SortBy = ({ fields }) => {
  const ordering = ['ascending order', `descending order`];
  return (
    <div className="flex flex-col gap-2 text-sm font-inter">
      <div className="font-bold">
        Sort By
      </div>
      <DropdownMenu options={fields} />
      in
      <DropdownMenu options={ordering} />
    </div>
  )
}

export default SortBy