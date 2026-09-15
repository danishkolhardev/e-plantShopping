import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount of all items in cart
    const calculateTotalAmount = () => {
        return cartItems
            .reduce((total, item) => {
                const price = parseFloat(
                    item.cost.replace('$', '')
                );

                return total + price * item.quantity;
            }, 0)
            .toFixed(2);
    };

    // Calculate total cost of one particular item
    const calculateTotalCost = (item) => {
        const price = parseFloat(
            item.cost.replace('$', '')
        );

        return (price * item.quantity).toFixed(2);
    };

    // Increase quantity
    const handleIncrement = (item) => {
        dispatch(
            updateQuantity({
                name: item.name,
                quantity: item.quantity + 1
            })
        );
    };

    // Decrease quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(
                updateQuantity({
                    name: item.name,
                    quantity: item.quantity - 1
                })
            );
        }
    };

    // Remove item from cart
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Continue shopping
    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    // Checkout
    const handleCheckout = () => {
        alert('Coming Soon');
    };

    return (
        <div className="cart-container">

            {/* Cart heading */}
            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            {/* Empty cart */}
            {cartItems.length === 0 ? (

                <div>
                    <h3 style={{ color: 'black' }}>
                        Your cart is empty.
                    </h3>
                </div>

            ) : (

                /* Cart items */
                cartItems.map((item) => (

                    <div
                        className="cart-item"
                        key={item.name}
                    >

                        {/* Plant image */}
                        <img
                            className="cart-item-image"
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="cart-item-details">

                            {/* Plant name */}
                            <div className="cart-item-name">
                                {item.name}
                            </div>

                            {/* Unit price */}
                            <div className="cart-item-cost">
                                Unit Price: {item.cost}
                            </div>

                            {/* Quantity controls */}
                            <div className="cart-item-quantity">

                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() =>
                                        handleDecrement(item)
                                    }
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>

                                <span className="cart-item-quantity-value">
                                    {item.quantity}
                                </span>

                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() =>
                                        handleIncrement(item)
                                    }
                                >
                                    +
                                </button>

                            </div>

                            {/* Total cost for this plant */}
                            <div className="cart-item-total">
                                Total: ${calculateTotalCost(item)}
                            </div>

                            {/* Delete */}
                            <button
                                className="cart-item-delete"
                                onClick={() =>
                                    handleRemove(item)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

            {/* Cart buttons */}
            <div className="continue_shopping_btn">

                <button
                    className="get-started-button"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>

                <button
                    className="get-started-button1"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>

            </div>

        </div>
    );
};

export default CartItem;
