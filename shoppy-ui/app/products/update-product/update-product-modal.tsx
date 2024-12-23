"use client";

import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import { useState } from "react";
import updateProduct from "../actions/update-product";
import { Product } from "../interfaces/product.interface";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface UpdateProductModalProps {
  open: boolean;
  handleClose: () => void;
  product: Product;
}

export default function UpdateProductModal({
  open,
  handleClose,
  product,
}: UpdateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();

  const onClose = () => {
    setResponse(undefined);
    handleClose();
  };

  const onSubmitUpdatedProduct = async (formData: FormData) => {
    const response = await updateProduct(product.id, formData);
    setResponse(response);
    if (!response.error) {
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form className="w-full max-w-xs" action={onSubmitUpdatedProduct}>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              defaultValue={product.name}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              defaultValue={product.description}
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              defaultValue={product.price}
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
