"use client";
import React, { useState } from "react";
import {
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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

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
}

const WalletForms = ({ submitBank, walletId, withdraw }: WalletProps) => {
  const [bankName, setBankName] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [modalType, setModalType] = useState<string>("");
  const style =
    "bg-brand-primary py-4 px-12 rounded-md text-white font-semibold";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialRef = React.useRef(null);

  function handleOpenBank() {
    setModalType("bank");
    onOpen();
  }

  function handleOpenWithdraw() {
    setModalType("withdraw");
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
        title: "Add Bank",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
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
        )
      </Modal>
      <div className="flex justify-between items-center">
        <button className={style} onClick={handleOpenBank}>
          Add Bank
        </button>
        <button className={style} onClick={handleOpenWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WalletForms;
