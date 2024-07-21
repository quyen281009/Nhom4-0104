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
  background: #4CAF50;
  color: white;
  border-bottom: 2px solid #388E3C;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;

const MenuItem = styled.li`
  margin: 0 15px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const UserInfo = styled.div`
  font-size: 1em;
`;

const LogoutLink = styled(Link)`
  color: #ffcc00;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #e0a800;
  }
`;

class Menu extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập global state

  render() {
    return (
      <Container>
        <MenuList>
          <MenuItem><MenuLink to='/admin/home'>Trang Chủ</MenuLink></MenuItem>
          <MenuItem><MenuLink to='/admin/category'>Danh Mục</MenuLink></MenuItem>
          <MenuItem><MenuLink to='/admin/product'>Sản Phẩm</MenuLink></MenuItem>
          <MenuItem><MenuLink to='/admin/order'>Đơn Hàng</MenuLink></MenuItem>
          <MenuItem><MenuLink to='/admin/customer'>Khách Hàng</MenuLink></MenuItem>
        </MenuList>
        <UserInfo>
          Xin chào <b>{this.context.username}</b> | <LogoutLink to='/login' onClick={() => this.lnkLogoutClick()}>Đăng Xuất</LogoutLink>
        </UserInfo>
      </Container>
    );
  }

  // Event handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;
