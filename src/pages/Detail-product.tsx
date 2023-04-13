import React from "react";
import { Page } from "zmp-ui";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import AddToCart from "../components/Buttons/AddToCart";
import { ConvertPrice } from "../utils/Prices";
const DetailProduct = () => {
  const param = useParams();
  const productList = useAppSelector((store) => store.products);
  const product = productList.Products.find((item) => {
    return item.id === param.code;
  })!;
  const htmlString = product.description;
  return (
    <Page hideScrollbar={true} className="pt-4">
      <div className="absolute bottom-0 bg-white w-full flex justify-around px-4 py-1 ">
        <div className="w-10/12">
          <AddToCart {...product} />
        </div>
      </div>
      <img
        src={product.photo_links}
        alt="Product's image"
        className="w-3/4 rounded-lg mx-auto "
      />
      <section className="bg-white rounded-lg mt-2 p-2">
        <div className="px-2">
          <h2>{product.name}</h2>
          <p style={{ borderBottom: "0.5px solid grey" }} className="pb-3">
            <span className="text-red-600 pr-2">
              {ConvertPrice(product.price, 1)}VNĐ
            </span>
          </p>
        </div>
        <section className="bg-white pt-3 px-2 text-justify">
          <p
            dangerouslySetInnerHTML={{ __html: htmlString }}
            style={{ wordSpacing: "-2px" }}
          ></p>
        </section>
      </section>
      <div className="h-16"></div>
    </Page>
  );
};

export default DetailProduct;
