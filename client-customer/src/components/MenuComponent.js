import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import withRouter from '../utils/withRouter';

// Styled components
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(to right, #4a90e2, #50e3c2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center; /* Căn giữa các mục menu */
`;

const MenuItem = styled.li`
  margin: 0 15px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.4em; /* Tăng kích thước font */
  font-weight: bold;
  transition: color 0.3s ease;
  font-family: 'Arial', sans-serif; /* Thay đổi font chữ nếu cần */

  &:hover {
    color: #ffcc00;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
  font-family: 'Arial', sans-serif; /* Thay đổi font chữ nếu cần */
`;

const SearchButton = styled.input`
  padding: 8px 16px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #ffcc00;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Arial', sans-serif; /* Thay đổi font chữ nếu cần */

  &:hover {
    background-color: #e0a800;
  }
`;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // Xử lý sự kiện
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // API
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <MenuItem key={item._id}>
        <MenuLink to={'/product/category/' + item._id}>{item.name}</MenuLink>
      </MenuItem>
    ));

    return (
      <MenuContainer>
        <MenuList>
          <MenuItem>
            <MenuLink to='/'>Trang chủ</MenuLink>
          </MenuItem>
          {cates}
          <MenuItem>
            <MenuLink to='/gmap'>Bản đồ</MenuLink>
          </MenuItem>
        </MenuList>
        <SearchForm onSubmit={(e) => this.btnSearchClick(e)}>
          <SearchInput 
            type="search" 
            placeholder="Nhập từ khóa" 
            value={this.state.txtKeyword} 
            onChange={(e) => this.setState({ txtKeyword: e.target.value })}
          />
          <SearchButton 
            type="submit" 
            value="TÌM KIẾM"
          />
        </SearchForm>
      </MenuContainer>
    );
  }
}

export default withRouter(Menu);
