import { Box, VStack, Text } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { Status } from "@/components/ui/status";
import { Tag } from "@/components/ui/tag";

const DocumentTile = ({ doc }) => {
  return (
    <Box backgroundColor="#1a1a1a" borderRadius="md" p={4}>
      <VStack gap={4}>
        <Text fontWeight="bold" truncate maxW="100%">
          {doc.name}
        </Text>
        <DataListRoot orientation="horizontal" gapY="2">
          <DataListItem
            label="Created"
            value={new Date(doc.created_on).toLocaleDateString()}
          ></DataListItem>
          <DataListItem
            label="Modified"
            value={new Date(doc.modified_on).toLocaleDateString()}
          ></DataListItem>
          <DataListItem
            label="Category"
            value={
              doc.category ? (
                <Tag backgroundColor="#242424">{doc.category}</Tag>
              ) : (
                "-"
              )
            }
          ></DataListItem>
          <DataListItem
            label="Status"
            value={
              <Status
                value={
                  doc.status === "draft"
                    ? "info"
                    : doc.status === "published"
                    ? "success"
                    : "error"
                }
              >
                {doc.status}
              </Status>
            }
          ></DataListItem>
        </DataListRoot>
      </VStack>
    </Box>
  );
};

export default DocumentTile;
