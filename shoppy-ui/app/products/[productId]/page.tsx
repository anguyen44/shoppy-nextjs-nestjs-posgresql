import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";
import UpdateButton from "../update-product/update-button";

interface SingleProductProps {
  params: {
    productId: string;
  };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const { productId } = await params;
  const product = await getProduct(+productId);
  return (
    <Grid container rowGap={3} marginBottom={"2rem"}>
      {product.imageExists && (
        <Grid size={{ md: 6, xs: 12 }}>
          <Image
            src={getProductImage(product.id)}
            width={0}
            height={0}
            className="w-auto md:w-1/2 h-auto"
            alt="Picture of product"
            sizes="100vw"
          />
        </Grid>
      )}

      <Grid size={{ md: 6, xs: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">$ {product.price}</Typography>
        </Stack>
        <UpdateButton product={product} />
      </Grid>
    </Grid>
  );
}
