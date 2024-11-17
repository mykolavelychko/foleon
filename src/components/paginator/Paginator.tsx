import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/shared/constants";
import { HStack } from "@chakra-ui/react";
interface PaginationProps {
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  total,
  onPageChange,
}: PaginationProps) => {
  if (total <= PAGE_SIZE) return null;
  return (
    <PaginationRoot count={total} pageSize={PAGE_SIZE} defaultPage={1} maxW="240px">
      <HStack gap="4">
        <PaginationPageText format="long" flex="1" />
        <PaginationPrevTrigger onClick={() => onPageChange(currentPage - 1)} />
        <PaginationNextTrigger onClick={() => onPageChange(currentPage + 1)} />
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;
