import React from "react";
import { Page } from "zmp-ui";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import AddToCart from "../components/Buttons/AddToCart";
import { ConvertPrice } from "../utils/Prices";
import { setAcceptRenderNavBar } from "../features/App/AppSlice";
const DetailProduct = () => {
  const param = useParams();
  const productList = useAppSelector((store) => store.products);

  const dispatch = useAppDispatch();
  dispatch(setAcceptRenderNavBar(false));
  const product = productList.Products.find((item) => {
    return item.id === param.code;
  })!;
  const htmlString = product.description;
  return (
    <Page hideScrollbar={true} className="pt-4">
      <div className="fixed bottom-0 z-50 bg-white w-full flex justify-between  px-4 py-1 ">
        <AddToCart {...product} />
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

      <div className="h-24"></div>
    </Page>
  );
};

export default DetailProduct;
