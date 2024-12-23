import Grid from "@mui/material/Grid2";
import getProducts from "./actions/get-products";
import Product from "./product";

export default async function Products() {
  const products = await getProducts();

  return (
    <Grid
      container
      spacing={3}
      sx={{ height: "85vh", overflowY: "scroll", overflowX: "hidden" }}
    >
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Product {...{ product }} />
        </Grid>
      ))}
    </Grid>
  );
}
