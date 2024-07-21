import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import TawkMessenger from './TawkMessengerComponent';
import Gmap from './GmapComponent';

// Styled components
const BodyCustomer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #e0f2e0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #333;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

class Main extends Component {
  render() {
    return (
      <BodyCustomer>
        <Menu />
        <Inform />
        <Content>
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product/category/:cid' element={<Product />} />
            <Route path='/product/search/:keyword' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/active' element={<Active />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myprofile' element={<Myprofile />} />
            <Route path='/mycart' element={<Mycart />} />
            <Route path='/myorders' element={<Myorders />} />
            <Route path='/gmap' element={<Gmap />} />
          </Routes>
        </Content>
        <TawkMessenger />
      </BodyCustomer>
    );
  }
}

export default Main;
