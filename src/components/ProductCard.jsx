import React, { useContext } from 'react';

// context
import { CartContext } from '../context/CartContextProvider';

// icons
import { HiPlus, HiMinus } from 'react-icons/hi';
import { BsLightningFill } from "react-icons/bs";

const ProductCard = ({ data }) => {
    const { cartItems, dispatch } = useContext(CartContext);

    // check if cartItem is already exist in shopping cart
    const cartItem = cartItems.find((elem) => elem.id === data.id);
    const addedToCart = (cartItem !== undefined) ? true : false;

    // add product to cart
    const handleAddToCart = () => {
        dispatch({type: 'ADD_PRODUCT', payload: data});
    }

    // increase product quantity
    const handleIncrement = () => {
        dispatch({type: 'CONTROL_QUANTITY', payload: {...data, quantity: cartItem.quantity + 1}});
    }

    // decrease product quantity
    const handleDecrement = () => {
        if (cartItem.quantity <= 1) {
            dispatch({type: 'REMOVE_PRODUCT', payload: cartItem});
        } else {
            dispatch({type: 'CONTROL_QUANTITY', payload: {...data, quantity: cartItem.quantity - 1}});
        }
    }

    return (
        <>
        {data && <div className="relative w-[100%] max-w-[280px] h-[360px] p-[0.2rem] border-[1px] border-gray-200 rounded-md shadow-lg overflow-hidden">
            {/* product image */}
            <div className="w-full h-[55%] rounded-sm overflow-hidden">
                <img src={data.imgUrl} className="w-full h-full object-cover" alt={data.name}/>
            </div>

            {/* product desc */}
            <div className="relative w-full h-[45%] pl-[0.6rem] pt-[0.6rem]">
                <h1 className="text-[1.2rem] font-bold">{data.name}</h1>
                <p className="pt-[0.5rem] text-[1rem] font-[500]">{`${data.weight} ${data.unit}`}</p>
                <p className="pt-[0.5rem]">
                    {data.discount !== '0' && <del className="mr-[0.4rem] text-[#888] text-[1.1rem] font-bold">{data.price} Tk</del>}
                    <ins className="text-[#0c2a2b] text-[1.1rem] font-bold no-underline">{parseInt(data.price - (data.price * (data.discount / 100)))} Tk</ins>
                </p>
                <button onClick={handleAddToCart} className={`absolute left-0 bottom-0 py-[0.4rem] ${addedToCart ? 'w-[45%]': 'w-full'} bg-[#0d2e2f] text-[1.1rem] text-[orange] font-[500] outline-none rounded-sm z-[99]`}>{addedToCart ? 'Added' : <span className="flex items-center justify-center"><BsLightningFill/>Add to Cart</span>}</button>
                <div className={`absolute right-0 bottom-0 flex items-center`}>
                    <button onClick={handleDecrement} className="px-[0.7rem] py-[0.62rem] border-none outline-none bg-[#222] rounded-sm"><HiMinus className="text-white text-[1.2rem]"/></button>
                    <span className="text-[1.2rem] text-center font-bold w-[2.5rem]">{`${(cartItem !== undefined) ? cartItem.quantity : 0}`}</span>
                    <button onClick={handleIncrement} className="px-[0.7rem] py-[0.62rem] border-none outline-none bg-[#222] rounded-sm"><HiPlus className="text-white text-[1.2rem]"/></button>
                </div>
            </div>

            {/* discount tag */}
            {data.discount !== '0' && <p className="absolute top-[1.4rem] left-0 py-[0.2rem] px-[0.8rem] text-[1.1rem] font-bold bg-[orange] rounded-r-[0.1rem]" style={{boxShadow: '0.015rem 0.015rem 0.4rem 0 #444'}}>{`${data.discount}% off`}</p>}
        </div>}
        </>
    );
}

export default ProductCard;