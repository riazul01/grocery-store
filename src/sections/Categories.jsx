import React from 'react';
import Category from '../components/Category';

import FastFoodImg from '../assets/images/fast-food.png';
import MealImg from '../assets/images/meal.png';
import GrillImg from '../assets/images/grill.png';
import NaanImg from '../assets/images/naan.png';
import RiceImg from '../assets/images/rice.png';
import CurryImg from '../assets/images/curry.png';
import SaladImg from '../assets/images/salad.png';
import BiryaniImg from '../assets/images/biryani.png';
import JuicesImg from '../assets/images/juices.png';
import ChowmeinImg from '../assets/images/chowmein.png';
import SoupImg from '../assets/images/soup.png';
import SweetsImg from '../assets/images/sweets.png';
import FishImg from '../assets/images/fish.png';
import MeatImg from '../assets/images/meat.png';

const Categories = () => {
    return (
        <div className="max-w-[1420px] mx-auto px-[0.4rem]">
            <div className="w-full my-[2rem] py-[2rem] flex flex-wrap gap-[1.4rem] justify-center border-[2px] border-dashed border-red-300 bg-red-50 rounded-lg">
                <Category Category="Fast Foods" CategoryImg={FastFoodImg}/>
                <Category Category="Meals" CategoryImg={MealImg}/>
                <Category Category="Kabab & Grills" CategoryImg={GrillImg}/>
                <Category Category="Parata & Naan" CategoryImg={NaanImg}/>
                <Category Category="Rice" CategoryImg={RiceImg}/>
                <Category Category="Curry" CategoryImg={CurryImg}/>
                <Category Category="Salad" CategoryImg={SaladImg}/>
                <Category Category="Biryani" CategoryImg={BiryaniImg}/>
                <Category Category="Juices" CategoryImg={JuicesImg}/>
                <Category Category="Chowmein" CategoryImg={ChowmeinImg}/>
                <Category Category="Soup" CategoryImg={SoupImg}/>
                <Category Category="Dairy & Sweets" CategoryImg={SweetsImg}/>
                <Category Category="Fish" CategoryImg={FishImg}/>
                <Category Category="Meat" CategoryImg={MeatImg}/>
            </div>
        </div>
    );
}

export default Categories;