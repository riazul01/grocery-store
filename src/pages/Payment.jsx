import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

// context
import { CartContext } from '../context/CartContextProvider';
import { UserDetailsContext } from '../context/UserDetailsContextProvider';

// firebase
import { fs } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

// icons
import { GoCreditCard } from 'react-icons/go';
import { IoWalletOutline } from 'react-icons/io5';

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
    const { cartItems, subTotal, shippingCost, discount, totalCost, dispatch } = useContext(CartContext);
    const userDetails = useContext(UserDetailsContext);
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    // handle payment method input
    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    }

    // store order details to firestore
    const storeOrderDetails = async (orderDetails) => {
        try {
            const docRef = await addDoc(collection(fs, "orders"), orderDetails);
            
            let orderList = [];
            
            if (userDetails.orderList) {
                orderList = [...userDetails.orderList, docRef.id];
            } else {
                orderList = [docRef.id];
            }
            
            const userRef = doc(fs, 'users', userDetails.id);
            setDoc(userRef, {orderList}, {merge: true});
            setTimeout(() => {
                toast.success('Order placed successfully!');
            }, 100);
            localStorage.setItem("orderConfirmed", true);
            dispatch({type: 'ORDER_CONFIRMED'});
            setTimeout(() => {
                navigate('/');
                dispatch({type: 'MAKE_CART_EMPTY'});
                dispatch({type: 'RESET_CHECKOUT_STATE'});
            }, 3000);
        } catch (err) {
            toast.err('An error occured!');
        }
    }

    // confirm order
    const handleConfirmOrder = () => {
        if (cartItems.length === 0) {
            toast.error('Cart is empty!');
            return;
        }
        if (paymentMethod === '') {
            toast.error('Please select payment method!');
            return;
        }
        if (paymentMethod === 'cashon') {
            const orderDetails = {
                orderItems: cartItems,
                status: 'pending',
                subTotal: subTotal,
                shippingCost: shippingCost,
                discount: discount,
                totalCost: totalCost,
                time: new Date().toUTCString(),
                paymentMethod: paymentMethod,
                paymentStatus: 'unpaid',
                shippingInfo: JSON.parse(localStorage.getItem('checkoutUserDetails'))
            }
            storeOrderDetails(orderDetails);
        } else if (paymentMethod === 'stripe') {
            toast.error('Sorry! Payment method not included yet!');
        }
    }

    return (
        <AppLayout>
            <div className="mx-auto px-[0.4rem] pb-[3rem] w-full max-w-[1420px] flex items-start justify-between gap-[1rem]">
                
                {/* cart products */}
                <div className="w-[60%]">
                    <p className="text-[1.3rem] font-[600]">Select Payment Method</p>
                    <form className="mt-[1rem]">
                        <label htmlFor="stripe" className="p-[1rem] w-[380px] h-[80px] flex items-center justify-between border-[1px] border-[#ddd] rounded-md shadow-md cursor-pointer">
                            <div className="flex items-center justify-start">
                                <GoCreditCard className="text-[1.8rem]" />
                                <p className="ml-[0.4rem] text-[1.2rem] font-bold">Stripe</p>
                            </div>
                            <input className="h-[1.3rem] w-[1.3rem]" type="radio" name="payment" id="stripe" value="stripe" onChange={handleChange} required /> 
                        </label>
                        <label htmlFor="cashon" className="mt-[1.2rem] p-[1rem] w-[380px] h-[80px] flex items-center justify-between border-[1px] border-[#ddd] rounded-md shadow-md cursor-pointer">
                            <div className="flex items-center justify-start">
                                <IoWalletOutline className="text-[1.8rem]" />
                                <p className="ml-[0.4rem] text-[1.2rem] font-bold">Cash On delevery</p>
                            </div>
                            <input className="h-[1.3rem] w-[1.3rem]" type="radio" name="payment" id="cashon" value="cashon" onChange={handleChange} />
                        </label>
                    </form>
                </div>
                
                {/* amount details */}
                <div className="cartCard p-[0.8rem] w-[40%] max-w-[400px] border-[1px] border-[#ddd] shadow-lg rounded-lg">
                    <div className="border-b-[1px] border-b-[#ddd]">
                        <div className="mb-[0.6rem] flex items-center justify-between">
                            <p className="text-[1.2rem] font-[600]">Sub Total</p>
                            <p className="text-[1.1rem] font-[600]">{subTotal} Tk</p>
                        </div>
                        <div className="mb-[0.6rem] flex items-center justify-between">
                            <p className="text-[1.2rem] font-[600]">Shipping Cost</p>
                            <p className="text-[1.1rem] font-[600]">{shippingCost} Tk</p>
                        </div>
                        <div className="mb-[0.6rem] flex items-center justify-between">
                            <p className="text-[1.2rem] font-[600]">Discount</p>
                            <p className="text-[1.1rem] font-[600]">{discount} Tk</p>
                        </div>
                    </div>
                    <div className="mt-[0.6rem] flex items-center justify-between">
                        <p className="text-[1.2rem] font-[600]">Total Cost</p>
                        <p className="text-[1.1rem] font-[600]">{totalCost} Tk</p>
                    </div>
                    <button onClick={handleConfirmOrder} className="mt-[0.6rem] h-[40px] w-full text-[#fff] text-[1.2rem] font-[500] bg-[#327e16] rounded-md">Confirm Order</button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </AppLayout>
    );
}

export default Payment;