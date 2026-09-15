import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
    const [page, setPage] = useState('home');

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const handleGetStarted = () => {
        setPage('products');
    };

    const handleHome = () => {
        setPage('home');
    };

    const handleCart = () => {
        setPage('cart');
    };

    const handleContinueShopping = () => {
        setPage('products');
    };

    return (
        <div className="app-container">

            {/* HOME PAGE */}
            {page === 'home' && (
                <div className="landing-page">

                    <div className="background-image"></div>

                    <div className="content">

                        <div className="landing_content">

                            <h1>
                                Welcome To Paradise Nursery
                            </h1>

                            <div className="divider"></div>

                            <p>
                                Where Green Meets Serenity
                            </p>

                            <button
                                className="get-started-button"
                                onClick={handleGetStarted}
                            >
                                Get Started
                            </button>

                        </div>

                        <div className="aboutus_container">
                            <AboutUs />
                        </div>

                    </div>

                </div>
            )}

            {/* PRODUCT PAGE */}
            {page === 'products' && (
                <ProductList
                    onHomeClick={handleHome}
                    onCartClick={handleCart}
                />
            )}

            {/* CART PAGE */}
            {page === 'cart' && (
                <CartItem
                    onContinueShopping={
                        handleContinueShopping
                    }
                    onHomeClick={handleHome}
                />
            )}

        </div>
    );
}

export default App;