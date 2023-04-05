import React from "react";
import { Page } from "zmp-ui";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import IMAGES from "../static/products";
import AddToCart from "../components/Buttons/AddToCart";
const DetailProduct = () => {
  const param = useParams();
  const productList = useAppSelector((store) => store.products);
  const product = productList.Products.find((item) => item.id === param.id)!;
  return (
    <Page hideScrollbar={true} className="pt-4">
      <div className="absolute bottom-0 bg-white w-full flex justify-around px-4 py-1 ">
        <div className="w-10/12">
          <AddToCart />
        </div>
      </div>
      <img
        src={IMAGES["p" + product.id]}
        alt="Product's image"
        className="w-3/4 rounded-lg mx-auto "
      />
      <section className="bg-white rounded-lg mt-2 p-2">
        <div className="px-2">
          <h2>{product.nameProduct}</h2>
          <p style={{ borderBottom: "0.5px solid grey" }} className="pb-3">
            <span className="text-red-600 pr-2">
              {product.salePrice}.000VNĐ
            </span>
            |
            <span className="text-gray-500 text-xs pl-2">
              {product.retailPrice}.000VNĐ
            </span>
          </p>
        </div>
        <section className="bg-white pt-3 px-2 text-justify">
          <p>{product.description}</p>
        </section>
      </section>
      <div className="h-10"></div>
    </Page>
  );
};

export default DetailProduct;
