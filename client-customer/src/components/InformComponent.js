import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LinkText = styled(Link)`
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

class Inform extends Component {
  static contextType = MyContext;

  lnkLogoutClick = () => {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  render() {
    return (
      <Container>
        <LeftSection>
          {this.context.token === '' ?
            <>
              <LinkText to='/login'>Đăng nhập</LinkText> | 
              <LinkText to='/signup'>Đăng ký</LinkText> | 
              <LinkText to='/active'>Kích hoạt</LinkText>
            </>
            :
            <>
              Xin chào <b>{this.context.customer?.name}</b> | 
              <LinkText to='/home' onClick={this.lnkLogoutClick}>Đăng xuất</LinkText> | 
              <LinkText to='/myprofile'>Hồ sơ của tôi</LinkText> | 
              <LinkText to='/myorders'>Đơn hàng của tôi</LinkText>
            </>
          }
        </LeftSection>
        <RightSection>
          <LinkText to='/mycart'>Giỏ hàng của tôi</LinkText> có <b>{this.context.mycart.length}</b> sản phẩm
        </RightSection>
      </Container>
    );
  }
}

export default Inform;
