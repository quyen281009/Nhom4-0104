import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import styled, { keyframes } from 'styled-components';

// Keyframes for the gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

// Styled components
const HomeContainer = styled.div`
  padding: 20px;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  text-align: center; /* Canh giữa nội dung trong HomeContainer */
`;

const Section = styled.div`
  margin: 20px 0;
`;

const FireText = styled.h2`
  font-size: 2.5em; /* Cỡ chữ lớn */
  background: linear-gradient(45deg, #ff5733, #ffcc00, #ff5733);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: ${gradientAnimation} 3s linear infinite; /* Hiệu ứng gradient động */
  margin: 0;
`;

const ProductItem = styled.div`
  display: inline-block;
  margin: 10px;
  text-align: center;
`;

const ProductImage = styled.img`
  border: 2px solid #ff5733; /* Đường viền sáng màu */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Hiệu ứng lấp lánh */
  transition: transform 0.3s ease;
  width: 300px;
  height: 300px;

  &:hover {
    transform: scale(1.05); /* Phóng to ảnh khi hover */
  }
`;

const ProductCaption = styled.figcaption`
  font-size: 1.5em; /* Cỡ chữ lớn hơn */
  color: #333; /* Màu chữ */
`;

class Home extends Component {
  static contextType = MyContext;

  state = {
    newprods: [],
    hotprods: []
  };

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts = () => {
    axios.get('/api/customer/products/new')
      .then(res => {
        this.setState({ newprods: res.data });
      })
      .catch(error => {
        console.error("There was an error fetching new products!", error);
      });
  }

  apiGetHotProducts = () => {
    axios.get('/api/customer/products/hot')
      .then(res => {
        this.setState({ hotprods: res.data });
      })
      .catch(error => {
        console.error("There was an error fetching hot products!", error);
      });
  }

  render() {
    const { newprods, hotprods } = this.state;
    
    return (
      <HomeContainer>
        <Section>
          <FireText>SẢN PHẨM MỚI</FireText>
          {newprods.map(item => (
            <ProductItem key={item._id}>
              <figure>
                <Link to={'/product/' + item._id}>
                  <ProductImage src={"data:image/jpg;base64," + item.image} alt={item.name} />
                </Link>
                <ProductCaption>{item.name}<br />Giá: {item.price}</ProductCaption>
              </figure>
            </ProductItem>
          ))}
        </Section>
        {hotprods.length > 0 &&
          <Section>
            <FireText>SẢN PHẨM NỔI BẬT</FireText>
            {hotprods.map(item => (
              <ProductItem key={item._id}>
                <figure>
                  <Link to={'/product/' + item._id}>
                    <ProductImage src={"data:image/jpg;base64," + item.image} alt={item.name} />
                  </Link>
                  <ProductCaption>{item.name}<br />Giá: {item.price}</ProductCaption>
                </figure>
              </ProductItem>
            ))}
          </Section>
        }
      </HomeContainer>
    );
  }
}

export default Home;
