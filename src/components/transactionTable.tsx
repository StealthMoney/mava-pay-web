import React from "react";
import {
  Box,
  Table,
  Tbody,
  Thead,
  Tr,
  TableContainer,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";

type TransactionTableProps<T> = {
  data: T[] | undefined;
};

const TransactionTable = ({ data }: TransactionTableProps<any>) => {
  function formatDate(inputDate: string) {
    const date = new Date(inputDate);

    const options: any = { year: "numeric", month: "long", day: "numeric" };

    return date.toLocaleDateString(undefined, options);
  }

  function shortInvoice(invoice: string) {
    return `${invoice.substring(0, 4)}***${invoice.substring(
      invoice.length - 5
    )}`;
  }

  function koboToNaira(value: number) {
    return value / 100;
  }
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Amount</Th>
            <Th>Rate</Th>
            <Th>Date</Th>
            <Th>Invoice</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((txn, index) => (
            <Tr key={index}>
              <Td>{txn.transactionMetadata.order.id}</Td>
              <Td>₦{koboToNaira(txn.amount).toLocaleString()}</Td>
              <Td>
                ₦
                {txn.transactionMetadata.order.quote.exchangeRate.toLocaleString()}
              </Td>
              <Td>{formatDate(txn.transactionMetadata.order.quote.expiry)}</Td>
              <Td>
                {shortInvoice(
                  txn.transactionMetadata.order.quote.paymentBtcDetail
                )}
              </Td>
              <Td>
                <TnxStatus status={txn.status} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;

function determineContent(status: string) {
  if (status === "SUCCESS") {
    return { color: "#199B2E", text: "Success" };
  } else if (status === "PENDING") {
    return { color: "#F2B246", text: "Pending" };
  } else {
    return { color: "#FF4201", text: "Failed" };
  }
}

const TnxStatus = <T extends object>({ status }: { status: string }) => {
  const { color, text } = determineContent(status);
  return (
    <Box
      as="button"
      border="1px"
      borderColor={color}
      borderRadius="lg"
      width={"9rem"}
      py={2}
    >
      <Text color={color}>{text}</Text>
    </Box>
  );
};
