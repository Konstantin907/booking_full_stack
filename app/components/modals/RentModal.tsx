"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

export default function RentModal() {
    const rentModal = useRentModal();
  return (
    <div>
      <Modal 
        isOpen = {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel="Submit"
        title="Here for you!"
      />
    </div>
  )
}
