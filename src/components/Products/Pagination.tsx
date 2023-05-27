import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getProducts, setPage } from "../../features/Products/ProductSlice";

export default function ProductPagination() {
  const dispatch = useAppDispatch();
  const [page, setChangePage] = useState(1);
  const products = useAppSelector((store) => store.products);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    if (value !== page) {
      setChangePage(value);
      if (!products.loadedPages.includes(page)) {
        dispatch(setPage(value - 1));
        dispatch(getProducts((value - 1) * 20));
      }
    }
  };
  return (
    <Box mt={4}>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(products.total / 20)}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}
