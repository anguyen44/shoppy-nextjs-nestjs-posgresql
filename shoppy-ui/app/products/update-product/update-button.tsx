"use client";

import { Button } from "@mui/material";
import UpdateProductModal from "./update-product-modal";
import { useState } from "react";
import { Product as IProduct } from "../interfaces/product.interface";

export default function UpdateButton({ product }: { product: IProduct }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <UpdateProductModal
        product={product}
        open={modalVisible}
        handleClose={onCloseModal}
      />
      <Button
        variant="contained"
        color="success"
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          onOpenModal();
        }}
      >
        Update
      </Button>
    </>
  );
}
