import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import styled, { keyframes } from 'styled-components';

// Keyframes for text shadow animation
const textShadowAnimation = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  100% {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

// Styled components
const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5; /* Background color */
`;

const Title = styled.h2`
  font-size: 2.5em; /* Font size */
  font-weight: bold;
  color: #333; /* Text color */
  background: linear-gradient(45deg, #ff5733, #ffcc00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${textShadowAnimation} 2s infinite alternate; /* Shadow animation */
  margin: 0 0 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const ProductContainer = styled.div`
  flex-basis: 300px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.02); /* Scale up on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow */
  }
`;

const Figure = styled.figure`
  margin: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Figcaption = styled.figcaption`
  margin-top: 10px;
  font-size: 1.2em; /* Adjust font size */
  color: #555; /* Text color */
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Subtle text shadow */
`;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const { products } = this.state;
    return (
      <Container>
        <Title>DANH SÁCH SẢN PHẨM</Title>
        <ProductList>
          {products.map((item) => (
            <ProductContainer key={item._id}>
              <Figure>
                <Link to={'/product/' + item._id}>
                  <ProductImage src={"data:image/jpg;base64," + item.image} alt={item.name} />
                </Link>
                <Figcaption>
                  {item.name}<br />Giá: {item.price.toLocaleString()}₫
                </Figcaption>
              </Figure>
            </ProductContainer>
          ))}
        </ProductList>
      </Container>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // APIs
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data });
    });
  }
}

export default withRouter(Product);
