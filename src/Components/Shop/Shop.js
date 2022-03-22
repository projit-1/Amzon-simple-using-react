import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(reponse => reponse.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCard = getStoredCart();
        const savedCart = [];
        for (const id in storedCard) {
            const addProduct = products.find(product => product.id === id);
            if (addProduct) {
                const quantity = storedCard[id];
                addProduct.quantity = quantity;
                savedCart.push(addProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        // console.log(product);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        // const newCart = [...cart, selectedProduct];
        setCart(newCart);
        addToDb(selectedProduct.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} ></Product>)
                }

            </div>
            <div className="cart-conatiner">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;