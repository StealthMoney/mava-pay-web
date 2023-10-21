import { Box, Flex, Heading, Table, Tbody, Thead, Tr } from "@chakra-ui/react";
// import {
//   QueryObserverResult,
//   RefetchOptions,
//   RefetchQueryFilters,
// } from "@tanstack/react-query";
import React from "react";
import {
  DataEmpty,
  LoadingSkeleton,
  RowData,
  TableHeader,
} from "./tableItems";
import type { TableStructure } from "@/types/table";

type Props<T> = {
  data: T[] | undefined;
  emptyView?: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  actionState?: {
    rowId: number;
  };
  tableStructure: TableStructure<T>[];
};

const BaseTable = <T extends object>({
  data,
  emptyView,
  isLoading,
  actionState,
  tableStructure,
}: Props<T>) => {
  return (
    <Box fontSize="sm" py={4} isolation="isolate">

      <Table
        boxShadow="lg"
        borderTop="4px solid"
        borderTopColor="orange.400"
        borderRadius="xl"
      >
        <Thead>
          <TableHeader tableStructure={tableStructure} />
        </Thead>
        <Tbody fontWeight="medium">
          {isLoading ? (
            <LoadingSkeleton rowsLength={tableStructure.length} />
          ) : !data ? (
            <DataEmpty />
          ) : data?.length ? (
            data.map((dataRow, idx) => (
              <TableRow
                key={`data-id-${
                  "id" in dataRow ? dataRow.id : ""
                }-data-row-${idx}`}
                row={dataRow}
                ts={tableStructure}
                actionState={actionState}
              />
            ))
          ) : (
            <DataEmpty message={emptyView} />
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

const TableRow = <T extends {}>({
  row,
  ts,
  actionState,
  showControls,
}: {
  row: T;
  ts: TableStructure<T>[];
  actionState: Props<T>["actionState"];
  showControls: boolean;
}) => {
  return (
    <Tr>
      {ts.map((tableItem) => (
        <RowData
          showControls={showControls}
          key={tableItem.name}
          tableItem={tableItem}
          row={row}
          actionState={actionState}
        />
      ))}
    </Tr>
  );
};

export default BaseTable;
