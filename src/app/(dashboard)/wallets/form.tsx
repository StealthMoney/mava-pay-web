"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import QRCode from "react-qr-code";

interface WalletProps {
  submitBank: ({
    bankName,
    accountName,
    accountNumber,
    walletId,
  }: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    walletId: string;
  }) => Promise<{ success: boolean; message?: string }>;
  walletId: string;
  withdraw: ({
    accountNumber,
    amount,
    walletId,
  }: {
    accountNumber: string;
    amount: string;
    walletId: string;
  }) => Promise<{ success: boolean; message?: string }>;
  getQuote: ({
    amount,
  }: {
    amount: string;
  }) => Promise<{ success: boolean; data?: any; message?: string }>;
  getOrder: (
    quoteId: string,
  ) => Promise<{ success: boolean; data?: any; message?: string }>;
  getOrderById: (orderId: string) => Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }>;
}

interface Order {
  amountInSourceCurrency: number;
  amountInTargetCurrency: string;
  exchangeRate: number;
  paymentMethod: string;
  paymentBtcDetail: string;
  expiry: Date;
  transactionFeesInSourceCurrency: number;
  transactionFeesInTargetCurrency: string;
}

interface Transaction {
  status: "PENDING" | "SUCCESS" | "FAILED";
  transactionMetadata: {
    id: string;
    order: {
      id: string;
    };
  };
}

const WalletForms = ({
  submitBank,
  walletId,
  withdraw,
  getQuote,
  getOrder,
  getOrderById,
}: WalletProps) => {
  const [bankName, setBankName] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [modalType, setModalType] = useState<string>("");
  const [needAmount, setNeedAmount] = useState<string>("");
  const style =
    "bg-brand-primary py-4 px-12 rounded-md text-white font-semibold";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [order, setOrder] = useState<Order>();

  const initialRef = React.useRef(null);

  let interval: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      interval && clearInterval(interval);
    };
  }, []);

  function handleOpenBank() {
    setModalType("bank");
    onOpen();
  }

  function handleOpenWithdraw() {
    setModalType("withdraw");
    onOpen();
  }

  function handleOpenGetNaira() {
    setModalType("getNaira");
    onOpen();
  }

  const handleWithdraw = async () => {
    try {
      const res = await withdraw({ accountNumber, amount, walletId });
      if (res.success) {
        toast({
          position: "top",
          title: "Withdraw",
          description: "Withdrawal Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAmount("");
        setAccountNumber("");
      } else {
        toast({
          position: "top",
          title: "Withdraw",
          description: res?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
    } finally {
      onClose();
    }
  };

  const handleSubmitBank = async () => {
    try {
      const res = await submitBank({
        bankName,
        accountName,
        accountNumber,
        walletId,
      });
      if (res.success) {
        toast({
          position: "top",
          title: "Add Bank",
          description: "Bank Added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAccountName("");
        setBankName("");
        setAccountNumber("");
      } else {
        toast({
          position: "top",
          title: "Add Bank",
          description: res?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.log(error.message);
      toast({
        position: "top",
        title: "Get Naira",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  let counter = 0;
  const checkOrderStatus = async (orderId: string) => {
    try {
      const res = await getOrderById(orderId);
      if (res.success) {
        const newOrder = res.data;

        if (newOrder.status === "PAID") {
          toast({
            position: "top",
            title: "Get Naira",
            description: "Invoice paid Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
          setModalType("");
          clearInterval(interval);
          counter = 0;
        } else if (newOrder.status === "EXPIRED") {
          toast({
            position: "top",
            title: "Get Naira",
            description: "Invoice has Expired",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setModalType("");
          clearInterval(interval);
          counter = 0;
          onClose();
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleGetNaira = async () => {
    try {
      const res = await getQuote({ amount: needAmount });
      if (res.success) {
        //get order
        const quote = res.data;
        const response = await getOrder(quote.id);
        if (response.success) {
          const newOrder = response.data;
          setOrder({
            exchangeRate: quote.exchangeRate,
            expiry: quote.expiry,
            transactionFeesInSourceCurrency:
              quote.transactionFeesInSourceCurrency,
            transactionFeesInTargetCurrency:
              quote.transactionFeesInTargetCurrency,
            paymentMethod: quote.paymentMethod,
            paymentBtcDetail: newOrder.paymentBtcDetail,
            amountInSourceCurrency: quote.amountInSourceCurrency,
            amountInTargetCurrency: quote.amountInTargetCurrency,
          });
          setModalType("order");
          interval = setInterval(async () => {
            if (counter < 100) {
              await checkOrderStatus(newOrder.orderId);
              counter += 1;
            } else {
              toast({
                position: "top",
                title: "Expired invoice",
                description: "Invoice has Expired",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              onClose();
              setModalType("");
              clearInterval(interval);
              counter = 0;
            }
          }, 3000);
        } else {
          toast({
            position: "top",
            title: "Get Naira",
            description: res?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          position: "top",
          title: "Get naira",
          description: res?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        position: "top",
        title: "Get Naira",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCloseInvoice = async () => {
    console.log(interval);
    interval && clearInterval(interval);
    counter = 0;
    onClose();
  };
  return (
    <div>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />(
        {modalType === "bank" && (
          <ModalContent>
            <ModalHeader>Add Bank Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Bank name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Bank name"
                  value={bankName}
                  onChange={(e: any) => setBankName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Account name</FormLabel>
                <Input
                  placeholder="Account name"
                  value={accountName}
                  onChange={(e: any) => setAccountName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Account number</FormLabel>
                <Input
                  placeholder=" Account number"
                  value={accountNumber}
                  onChange={(e: any) => setAccountNumber(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Curreny</FormLabel>
                <Input placeholder="Currency" value={"NGN"} readOnly />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={handleSubmitBank}
                className="bg-brand-primary"
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
        {modalType === "withdraw" && (
          <ModalContent>
            <ModalHeader>Withdraw</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput>
                  <NumberInputField
                    ref={initialRef}
                    placeholder="Amount"
                    value={amount}
                    onChange={(e: any) => setAmount(e.target.value)}
                  />
                </NumberInput>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Account Number</FormLabel>
                <Input
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={(e: any) => setAccountNumber(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Curreny</FormLabel>
                <Input placeholder="Currency" value={"NGN"} readOnly />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={handleWithdraw}
                className="bg-brand-primary"
              >
                Withdraw
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
        ) (
        {modalType === "getNaira" && (
          <ModalContent>
            <ModalHeader>Get Naira</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput>
                  <NumberInputField
                    ref={initialRef}
                    placeholder="Amount"
                    value={needAmount}
                    onChange={(e: any) => setNeedAmount(e.target.value)}
                  />
                </NumberInput>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>From</FormLabel>
                <Input placeholder="Source Currency" value={"BTC"} readOnly />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Payment Method</FormLabel>
                <Input placeholder="Currency" value={"LIGHTNING"} readOnly />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="orange"
                mr={3}
                onClick={handleGetNaira}
                className="bg-brand-primary"
              >
                Get Invoice
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
        )(
        {modalType === "order" && (
          <ModalContent>
            <ModalHeader className="flex justify-center items-center">
              Pay Invoice
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box className="flex items-center justify-center mb-4">
                <Text>This Invoice expires in 5 minutes</Text>
              </Box>
              <Box className="flex items-center justify-center">
                <QRCode value={order?.paymentBtcDetail!} />
              </Box>

              <Box className="flex flex-col mt-4 items-center justify-center">
                <Box className="flex gap-x-16 justify-center items-center mt-2">
                  <Text>Naira Amount:</Text>
                  <Text>₦{order?.amountInTargetCurrency!}</Text>
                </Box>
                <Box className="flex gap-x-16 justify-center items-center mt-2">
                  <Text>Total Sat Amount:</Text>
                  <Text>{order?.amountInSourceCurrency!} SAT</Text>
                </Box>
                <Box className="flex gap-x-16 justify-center items-center mt-2">
                  <Text>Fee: </Text>
                  <Text>
                    ₦{order?.transactionFeesInTargetCurrency!}{" "}
                    {`(${order?.transactionFeesInSourceCurrency!} SAT)`}
                  </Text>
                </Box>
                <Box className="flex gap-x-16 justify-center items-center mt-2">
                  <Text>Exchange Rate:</Text>
                  <Text>₦{order?.exchangeRate.toLocaleString()}</Text>
                </Box>
                <Box className="flex gap-x-16 justify-center items-center mt-2">
                  <Text>Payment Method:</Text>
                  <Text>{order?.paymentMethod}</Text>
                </Box>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleCloseInvoice}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
        )
      </Modal>
      <div className="flex justify-between items-center">
        <button className={style} onClick={handleOpenBank}>
          Add Bank
        </button>
        <button className={style} onClick={handleOpenWithdraw}>
          Withdraw
        </button>

        <button className={style} onClick={handleOpenGetNaira}>
          Get Naira
        </button>
      </div>
    </div>
  );
};

export default WalletForms;
