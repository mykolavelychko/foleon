import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type FilterByCategoryType = {
  field: "category";
  type: "eq";
  value: string;
};

// TODO: find a better way to define categories
const categories = createListCollection({
  items: [
    { label: "All Categories", value: "" },
    { label: "Annual Report", value: "annual_report" },
    { label: "Branded content", value: "branded_content" },
    { label: "Brochure", value: "brochure" },
    { label: "Case study", value: "case_study" },
    { label: "Customer magazine", value: "customer_magazine" },
    { label: "eBook", value: "ebook" },
    { label: "Event Magazine", value: "event_magazine" },
    { label: "Manual", value: "manual" },
    { label: "Member magazine", value: "member_magazine" },
    { label: "Newsletter", value: "newsletter" },
    { label: "Pitch document", value: "pitch_deck" },
    { label: "Presentation", value: "presentation" },
    { label: "Proposal", value: "proposal" },
    { label: "Product catalog", value: "product_catalog" },
    { label: "Report", value: "report" },
    { label: "Staff magazine", value: "staff_magazine" },
    { label: "White paper", value: "whitepaper" },
    { label: "Other", value: "other" },
  ],
});

export function FilterByCategory({
  onFilterChange,
}: {
  onFilterChange: (filter: FilterByCategoryType | null) => void;
}) {
  const [filterValue, setFilterValue] = useState<string[]>();

  useEffect(() => {
    onFilterChange(
      filterValue?.[0]
        ? { value: filterValue[0], field: "category", type: "eq" }
        : null
    );
  }, [filterValue, onFilterChange]);

  return (
    <>
      <SelectRoot
        variant="subtle"
        collection={categories}
        value={filterValue}
        onValueChange={(e) => setFilterValue(e.value)}
      >
        <SelectLabel>Category</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.items.map((category) => (
            <SelectItem item={category} key={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </>
  );
}

// export FilterByCategory;
