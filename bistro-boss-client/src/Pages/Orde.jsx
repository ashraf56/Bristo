import React, { useState } from 'react';
import img from '../../src/assets/shop/banner2.jpg'
import Cover from './Cover/Cover';
import { Helmet } from 'react-helmet-async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../Hooks/useMenu';
import Foodcard from './Foodcard';
import Ordeitem from './Ordeitem';
import { useParams } from 'react-router-dom';

const Orde = () => {
  
  const categories = ['salad','dessert']; 
     let {category}=useParams();

    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    let [menu]=useMenu();
    let salad=menu.filter(i=> i.category==='salad')
    let dessert=menu.filter(i=> i.category==='dessert')

    return (
        <div>
            <Helmet
            
            >
    <title>Bristo | Order</title>

            </Helmet>
            <Cover img={img} title='Orders'>

            </Cover>


            <Tabs>
    <TabList>
      <Tab>salad</Tab>
      <Tab>dessert</Tab>
    </TabList>

    <TabPanel>
       <Ordeitem is={salad} ></Ordeitem>
    
    </TabPanel>
    <TabPanel>
       <Ordeitem is={dessert} ></Ordeitem>
    
    </TabPanel>
  
  </Tabs>

        </div>
    );
};

export default Orde;