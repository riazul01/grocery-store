import React from 'react';
import { Link } from 'react-router-dom';

// components
import ProductCard from '../components/ProductCard';

// skeleton loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// icons
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const SectionProducts = ({ title, path, products }) => {
    return (
        <div className="mx-auto px-[0.4rem] pb-[5rem] max-w-[1420px]">

            {/* header */}
            <div className="py-[1.2rem] flex items-center justify-between">
                <h1 className="text-[1.4rem] font-bold capitalize">{title}</h1>
                <Link to={path} className="flex items-center">
                    <p className="text-[1rem] font-bold text-[green]">View more</p>
                    <MdKeyboardDoubleArrowRight className="ms-[0.4rem] text-[1.2rem] text-[green] font-bold"/>
                </Link>
            </div>

            {/* products */}
            {products.length !== 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1.2rem] place-items-center">
                {products && products.slice(0, 10).reverse().map((item) => {
                    return <ProductCard key={item.id} data={item}/>
                })}
            </div> : <div className="flex gap-[1.2rem] items-center justify-center">
                <Skeleton containerClassName="flex-1" className="w-full h-[360px]"/>
                <Skeleton containerClassName="flex-1" className="w-full h-[360px]"/>
                <Skeleton containerClassName="flex-1" className="w-full h-[360px]"/>
                <Skeleton containerClassName="flex-1" className="w-full h-[360px]"/>
                <Skeleton containerClassName="flex-1" className="w-full h-[360px]"/>
            </div>}
        </div>
    );
}

export default SectionProducts;