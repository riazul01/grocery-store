import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// context
import { LoginContext } from '../context/LoginContextProvider';

const Topbar = () => {
    const { currentUser } = useContext(LoginContext);

    return (
        <div className="pt-[0.8rem] h-[auto] w-full bg-[#173334]">
            <div className="mx-[auto] px-[0.4rem] text-[#fff] flex justify-between max-w-[1420px]">
                <p className="text-[1rem] font-[500]">Need Help? Call Us: <span className="text-[orange] font-bold">+88 01234567890</span></p>
                <p className="text-[1rem] font-[500]">Get <span className="text-[orange] font-bold">30% off</span> for first order with exciting gift box! <Link to="/offer-details" className="underline">Learn more</Link></p>
                
                {/* topbar links */}
                <div className="flex items-center">
                    {currentUser && <Link to="/user/profile" className="text-[#fff] font-[500]">
                        My Account
                    </Link>}
                    {currentUser && <span className="mx-[0.8rem]">|</span>}
                    {!currentUser && <Link to="/user/login" className="text-[#fff] font-[500]">
                        Login
                    </Link>}
                    {!currentUser && <span className="mx-[0.8rem]">|</span>}
                    {!currentUser && <Link to="/user/register" className="text-[#fff] font-[500]">
                        Register
                    </Link>}
                    {!currentUser && <span className="mx-[0.8rem]">|</span>}
                    <Link to="/about" className="text-[#fff] font-[500]">
                        About Us
                    </Link>
                    <span className="mx-[0.8rem]">|</span>
                    <Link to="/help" className="text-[#fff] font-[500]">
                        Help
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Topbar;