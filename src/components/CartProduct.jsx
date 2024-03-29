import React, { useContext } from 'react';

// context
import { CartContext } from '../context/CartContextProvider';

// icons
import { HiPlus } from 'react-icons/hi';
import { HiMinus } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CartProduct = ({ cartItem }) => {
    const { dispatch } = useContext(CartContext);

    const handleRemove = () => {
        dispatch({type: 'REMOVE_PRODUCT', payload: cartItem});
    }

    const handleIncrement = () => {
        dispatch({type: 'CONTROL_QUANTITY', payload: {...cartItem, quantity: cartItem.quantity + 1}});
    }

    const handleDecrement = () => {
        if (cartItem.quantity > 1) {
            dispatch({type: 'CONTROL_QUANTITY', payload: {...cartItem, quantity: cartItem.quantity - 1}});
        }
    }

    return (
        <div className="gradient-bg relative mb-[1.4rem] w-full h-[110px] sm:h-[140px] flex items-start border-[1px] border-[#ddd] shadow-lg rounded-lg">
            {/* product image */}
            <div className="p-[0.2rem] h-full w-[120px] sm:w-[180px]">
                <img src={cartItem.imgUrl} alt="cart-img" className="h-full w-full object-cover rounded-[0.2rem]"/>
            </div>

            {/* product details */}
            <div className="mt-[0.45rem] pl-[0.2rem] sm:pl-[0.6rem]">
                <h1 className="text-[#0c2a2b] text-[1.1rem] sm:text-[1.3rem] font-bold">{cartItem.name}</h1>
                <p className="my-[0.5rem] sm:my-[1rem] text-[1rem] sm:text-[1.1rem] text-[#555] font-bold">{`${cartItem.weight} ${cartItem.unit} * ${cartItem.quantity}`}</p>
                <p className="text-[#0f3b3c] text-[1.1rem] sm:text-[1.2rem] font-bold">{((cartItem.price - (cartItem.price * (cartItem.discount) / 100)) * cartItem.quantity).toFixed(1)} Tk</p>
            </div>

            {/* product delete button */}
            <button onClick={handleRemove} className="absolute top-0 right-0 mt-[0.2rem] mr-[0.2rem] p-[0.2rem] sm:mt-[0.4rem] sm:mr-[0.6rem] sm:p-[0.4rem] cursor-pointer">
                <RiDeleteBin6Line className="text-[1.2rem] sm:text-[1.4rem] text-red-600"/>
            </button>

            {/* control product quantity */}
            <div className="absolute bottom-[0.2rem] right-[0.2rem] sm:bottom-[1rem] sm:right-[1rem] flex items-center justify-center border-[1px] border-[#ccc] rounded-md">
                <button onClick={handleDecrement} className="px-[0.4rem] py-[0.1rem] sm:px-[0.6rem] sm:py-[0.2rem]"><HiMinus className="ctrlIcon" /></button>
                <span className="py-[0.175rem] font-[500] w-[2.4rem] sm:w-[3rem] flex items-center justify-center border-x-[1px] border-x-[#ccc]">{cartItem.quantity}</span>
                <button onClick={handleIncrement} className="px-[0.4rem] py-[0.1rem] sm:px-[0.6rem] sm:py-[0.2rem]"><HiPlus className="ctrlIcon" /></button>
            </div>

            {/* discount tag */}
            {cartItem.discount > 0 && <p className="absolute top-[0.8rem] left-[0.8rem] px-[0.4rem] py-[0.1rem] text-[0.8rem] text-[#fff] bg-[#ec0000] drop-shadow-xl shadow-xl rounded-md">-{cartItem.discount}%</p>}
        </div>
    );
}

export default CartProduct;