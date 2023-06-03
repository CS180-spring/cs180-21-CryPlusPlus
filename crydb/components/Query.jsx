import DropdownMenu from "@components/DropdownMenu";
import TextInput from "@components/TextInput";
import { useUserContext } from "@app/context/UserContext";

const Query = ({ index, data }) => {
  const { dataColumns, queries, setQueries } = useUserContext();

  const onFieldSelect = (input) => {
    setQueries((prevQueries) => {
      const updatedQueries = [...prevQueries];
      const queryToUpdate = { ...updatedQueries[index] };

      queryToUpdate.field = input;

      updatedQueries[index] = queryToUpdate;

      return updatedQueries;
    });
  };

  const onConditionSelect = (input) => {
    setQueries((prevQueries) => {
      const updatedQueries = [...prevQueries];
      const queryToUpdate = { ...updatedQueries[index] };

      queryToUpdate.condition = input;

      updatedQueries[index] = queryToUpdate;

      return updatedQueries;
    });
  };

  const onValueSelect = (input) => {
    setQueries((prevQueries) => {
      const updatedQueries = [...prevQueries];
      const queryToUpdate = { ...updatedQueries[index] };

      queryToUpdate.value = input;

      updatedQueries[index] = queryToUpdate;

      return updatedQueries;
    });
  };

  return (
    <div className="flex w-full flex-col gap-2 font-inter text-sm font-bold">
      Field
      <DropdownMenu
        options={dataColumns}
        onOptionSelect={onFieldSelect}
        data={data}
        queries={queries}
        attri={data.field}
      />
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
        onOptionSelect={onConditionSelect}
        data={data}
        queries={queries}
        attri={data.condition}
      />
      Value
      <TextInput
        onOptionSelect={onValueSelect}
        queries={queries}
        data={data}
        attri={data.value}
      />
      <hr className="my-2 border-b border-figma-black-grey500" />
    </div>
  );
};

export default Query;
