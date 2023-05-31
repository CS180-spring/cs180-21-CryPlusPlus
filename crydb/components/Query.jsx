import DropdownMenu from "@components/DropdownMenu";
import TextInput from "@components/TextInput";
import { useUserContext } from "@app/context/UserContext";

const Query = ({ columns }) => {
  const { dataColumns } = useUserContext();

  return (
    <div className="flex w-full flex-col gap-2 font-inter text-sm font-bold">
      Field
      <DropdownMenu options={dataColumns} />
      Condition
      <DropdownMenu
        options={[
          "Equal",
          "Not Equal",
          "Greater Than",
          "Less Than",
          "Greater than or Equal to",
          "Less Than or Equal To",
        ]}
      />
      Value
      <TextInput />
      <hr className="my-2 border-b border-figma-black-grey500" />
    </div>
  );
};

export default Query;
