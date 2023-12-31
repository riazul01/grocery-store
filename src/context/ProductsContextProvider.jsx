import React, { createContext, useEffect, useState } from 'react';

// firebase
import { fs } from '../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";

export const ProductsContext = createContext();

const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    const top = [];
    const recent = [];
    const popular = [];
    const vegetables = [];
    const fruits = [];
    const meat = [];
    const fish = [];
    const eggs = [];
    const rice = [];
    const spices = [];
    const flour = [];
    const oil = [];
    const teaCoffe = [];
    const dryFruits = [];
    const biscuits = [];
    const cakes = [];
    const jams = [];
    const breads = [];

    useEffect(() => {
        const q = query(collection(fs, "products"));
        onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()});
            });
            setProducts(data);
        });
    }, []);

    for (let i = 0; i < products.length; i ++) {
        let product = products[i];

        // filter by status
        if (product.status === 'top') {
            top.push(product);
        } else if (product.status === 'recent') {
            recent.push(product);
        } else if (product.status === 'popular') {
            popular.push(product);
        }

        // filter by category
        if (product.category === 'vegetables') { 
            vegetables.push(product);
        } else if (product.category === 'fruits') {
            fruits.push(product);
        } else if (product.category === 'meat') {
            meat.push(product);
        } else if (product.category === 'fish') {
            fish.push(product);
        } else if (product.category === 'eggs') {
            eggs.push(product);
        } else if (product.category === 'tea-coffe') {
            teaCoffe.push(product);
        } else if (product.category === 'spices') {
            spices.push(product);
        } else if (product.category === 'dry-fruits') {
            dryFruits.push(product);
        } else if (product.category === 'biscuits') {
            biscuits.push(product);
        } else if (product.category === 'cakes') {
            cakes.push(product);
        } else if (product.category === 'jams') {
            jams.push(product);
        } else if (product.category === 'breads') {
            breads.push(product);
        } else if (product.category === 'rice') {
            rice.push(product);
        } else if (product.category === 'flour') {
            flour.push(product);
        } else if (product.category === 'oil') {
            oil.push(product);
        }
    }

    return (
        <ProductsContext.Provider value={{products, top, recent, popular, vegetables, fruits, meat, fish, eggs, teaCoffe, spices, dryFruits, biscuits, cakes, jams, breads, rice, flour, oil}}>
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;