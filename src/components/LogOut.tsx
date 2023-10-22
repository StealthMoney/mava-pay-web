"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useState } from "react";

const LogOut = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogout = () => {
    setLoggingOut(true)
    setTimeout(() => {
      signOut()
    }, 1000);
  }
  return (
    <>
      <div
        onClick={handleLogout}
        // data-active-route={isActive || null}
        className="flex group data-[active-route]:text-brand-primary items-center gap-4 font-medium text-custom-gray-400 p-4 w-full rounded-sm hover:bg-brand-primary-transparent"
      >
        <ExitIcon width={24} height={24}/>
        <div>Logout</div>
      </div>
      <Modal closeOnOverlayClick={false} closeOnEsc={false} isCentered={true} isOpen={loggingOut} onClose={() => setLoggingOut(false)}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex flex-col gap-4 w-full my-10 items-center justify-center">
            <Spinner
              thickness="4px"
              emptyColor="white"
              color="blue.500"
              size="xl"
            />
            <p className="text-xl font-medium text-custom-gray-800">Logging you out!</p>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogOut;
