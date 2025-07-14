import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Modal: React.FC<{
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  handleConfirmDelete: () => void;
  setSelectedBookId: (id: number | null) => void;
}> = ({ openModal, setOpenModal, handleConfirmDelete, setSelectedBookId }) => {
    return (
    <>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogDescription>
          Voulez-vous vraiment supprimer ce livre ?
        </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button
          variant="destructive"
          onClick={handleConfirmDelete}
        >
          Confirmer
          </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpenModal(false);
            setSelectedBookId(null);
          }}
        >
          Annuler
        </Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>
      </>
    )

}

export default Modal;