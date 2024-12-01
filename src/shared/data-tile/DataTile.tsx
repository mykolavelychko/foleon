import { Box, VStack, Text } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { Status } from "@/components/ui/status";
import { Tag } from "@/components/ui/tag";

const DataTile = ({ data }) => {
  return (
    <Box backgroundColor="#1a1a1a" borderRadius="md" p={4}>
      <VStack gap={4}>
        <Text fontWeight="bold" truncate maxW="100%">
          {data.name}
        </Text>
        <DataListRoot orientation="horizontal" gapY="2">
          <DataListItem
            label="Created"
            value={new Date(data.created_on).toLocaleDateString()}
          ></DataListItem>
          <DataListItem
            label="Modified"
            value={new Date(data.modified_on).toLocaleDateString()}
          ></DataListItem>
          <DataListItem
            label="Category"
            value={
              data.category ? (
                <Tag backgroundColor="#242424">{data.category}</Tag>
              ) : (
                "-"
              )
            }
          ></DataListItem>
          {data.status && (
            <DataListItem
              label="Status"
              value={
                <Status
                  value={
                    data.status === "draft"
                      ? "info"
                      : data.status === "published"
                      ? "success"
                      : "error"
                  }
                >
                  {data.status}
                </Status>
              }
            ></DataListItem>
          )}
        </DataListRoot>
      </VStack>
    </Box>
  );
};

export default DataTile;
