"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateProductModal from "./create-product-modal";
import { useState } from "react";

export default function CreateProductFab() {
  const [modalVisible, setModalVisible] = useState(false);

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <CreateProductModal open={modalVisible} handleClose={onCloseModal} />
      <div className="absolute left-10 bottom-10">
        <Fab color="primary" onClick={onOpenModal}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
