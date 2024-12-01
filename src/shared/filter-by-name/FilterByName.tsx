import { useEffect, useState } from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

export type FilterByNameType = {
  field: "name";
  type: "like";
  value: string;
};

export function FilterByName({
  onFilterChange,
}: {
  onFilterChange: (filter: FilterByNameType | null) => void;
}) {
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(
        filterValue
          ? { value: `%${filterValue}%`, field: "name", type: "like" }
          : null
      );
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filterValue, onFilterChange]);

  return (
    <>
      <Field label="Name">
        <Input
          variant="subtle"
          placeholder="Filter by name"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </Field>
    </>
  );
}
