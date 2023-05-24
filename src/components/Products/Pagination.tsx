import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "zmp-ui";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getProducts, setPage } from "../../features/Products/ProductSlice";

export default function ProductPagination() {
  const dispatch = useAppDispatch();
  const [page, setChangePage] = useState(1);
  const [previousPage, setPreviousPage] = useState(-1);
  const products = useAppSelector((store) => store.products);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== page) {
      setChangePage(value);
    }
  };
  useEffect(() => {
    if (page !== previousPage) {
      setPreviousPage(page);
      if (!products.loadedPages.includes(page)) {
        dispatch(setPage(page - 1));
        dispatch(getProducts((page - 1) * 20));
      }
    }
  }, [page]);
  return (
    <Box mt={4}>
      <Stack spacing={2}>
        <Pagination count={4} onChange={handleChange} />
      </Stack>
    </Box>
  );
}
