import { getTransactions } from "@/app/services/transaction";
import TransactionTable from "@/components/transactionTable";
import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";

const TransactionPage = async () => {
  const res = await getTransactions(0);

  const txs = res.data.data ?? [];
  const recentTxns = txs.reverse();

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Input placeholder="Search" size={"md"} w={"14.5rem"} />
        </div>
        <Box
          w={"7.3rem"}
          py={"0.5rem"}
          px={"1.19rem"}
          border={"1px"}
          borderColor={"#F2B246"}
          borderRadius="md"
          className="flex justify-center items-center"
        >
          <Text color={"#F2B246"} className="text-base font-medium">
            Filter
          </Text>
        </Box>
      </div>
      <div className="p-6 bg-white w-full h-full rounded-2xl shadow-lg mt-4">
        <TransactionTable data={recentTxns} />
      </div>
    </div>
  );
};

export default TransactionPage;
