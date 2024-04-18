import React from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../Hooks/useMenu';
import SETTitle from '../SETTitle';
import MainCategory from '../MainCategory';
import img from '../../assets/menu/salad-bg.jpg'
import img2 from '../../assets/menu/dessert-bg.jpeg'
import Cover from '../Cover/Cover';
const Menu = () => {
    let [menu] = useMenu();
    let salad = menu.filter(i => i.category === 'salad')
    let dessert = menu.filter(i => i.category === 'dessert')
    return (
        <div className='pt-20'>

            <Helmet>
                <title>Bristo | Menu</title>
            </Helmet>

            <p>This is menu</p>

            <Cover img={img} title='Our Menu' ></Cover>

            <SETTitle
                heading='TOdays offer'
            ></SETTitle>
            <MainCategory
                items={salad}
                img={img}
                title='Salad'
            ></MainCategory>
            <MainCategory
                items={dessert}
                img={img2}
                title='dessert'
            ></MainCategory>

        </div>
    );
};

export default Menu;