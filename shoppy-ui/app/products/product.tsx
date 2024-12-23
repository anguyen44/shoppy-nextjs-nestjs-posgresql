"use client"; // when having click event the component must become client component

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "./product-image";
import { useRouter } from "next/navigation";
import deleleProduct from "./actions/delete-product";
import UpdateButton from "./update-product/update-button";

export interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  const handleDelete = async (productId: number) => {
    await deleleProduct(productId);
  };

  return (
    <Card className="p-4">
      <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h4">{product.name}</Typography>
            <>
              {product.imageExists && (
                <Image
                  src={getProductImage(product.id)}
                  width={0}
                  height={0}
                  className="w-full h-auto"
                  alt="Picture of product"
                  sizes="100vw"
                />
              )}
            </>
            <Typography>{product.description}</Typography>
            <Typography>$ {product.price}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <UpdateButton product={product} />
        <Button
          variant="contained"
          color="error"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            handleDelete(product.id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
