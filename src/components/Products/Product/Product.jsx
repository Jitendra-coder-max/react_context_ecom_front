import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
    const navigate = useNavigate();
    return (
        <div
            className="product-card"
            onClick={() => navigate("/product/" + id)}
        >
            <div className="thumbnail">
                <img
                    src={
                        process.env.REACT_APP_STRIPE_APP_DEV_URL +
                        data.img.data[0].attributes.url
                    }
                />

{/* <img
    src={
        process.env.REACT_APP_STRIPE_APP_DEV_URL +
        (data && data.image && data.image.data && data.image.data[0] && data.image.data[0].attributes
            ? data.image.data[0].attributes.url
            : "")
    }
/> */}

            </div>
            <div className="prod-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </div>
    );
};

export default Product;
