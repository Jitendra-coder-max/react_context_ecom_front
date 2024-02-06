import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";

const Cart = () => {
    const REACT_APP_STRIPE_PUBLISHABLE_KEY=`pk_test_51OgXoaSAlePVykvhOdzeG5hqQGd1kQDHU9fCwh2lOE6rUKVpqcxP8CpJZFH8K3QmB1LIO2RWgDKNzRJPCC8kFmmu00cWop2CvL`;
    const { cartItems, setShowCart, cartSubTotal } = useContext(Context);
    // console.log("Stripe Publishable Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);



    // const stripePromise = loadStripe(
    //     `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
    // );


    const stripePromise = loadStripe(
        REACT_APP_STRIPE_PUBLISHABLE_KEY
    )
     console.log(REACT_APP_STRIPE_PUBLISHABLE_KEY)


    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems,
                
               
            });
            console.log(res)
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart-panel">
            <div
                className="opac-layer"
                onClick={() => setShowCart(false)}
            ></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span
                        className="close-btn"
                        onClick={() => setShowCart(false)}
                    >
                        <MdClose className="close-btn" />
                        <span className="text">close</span>
                    </span>
                </div>

                {!cartItems.length && (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No products in the cart.</span>
                        <button className="return-cta" onClick={() => {}}>
                            RETURN TO SHOP
                        </button>
                    </div>
                )}

                {!!cartItems.length && ( // in cout not zero
                    <>
                        <CartItem />
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal:</span>
                                <span className="text total">
                                    &#8377;{cartSubTotal}
                                </span>
                            </div>
                            <div className="button">
                                <button
                                    className="checkout-cta"
                                    onClick={handlePayment}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
