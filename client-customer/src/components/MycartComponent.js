import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import withRouter from '../utils/withRouter';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  text-align: center;
  margin: 20px auto;
  width: 80%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 2.5em; /* Font size */
  color: #333; /* Text color */
  margin-bottom: 20px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.thead`
  background-color: #4CAF50;
  color: white;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:nth-child(even) {
    background-color: #f2f2f2; /* Alternating row colors */
  }
`;

const TableFooter = styled.tr`
  font-weight: bold;
  background-color: #e0f2f1; /* Footer background */
`;

const TableData = styled.td`
  padding: 12px;
  text-align: center;
`;

const ProductImage = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 70px;
  height: 70px;
`;

const RemoveLink = styled.span`
  color: red;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    color: darkred; /* Darker color on hover */
  }
`;

const CheckoutLink = styled.span`
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    color: darkblue; /* Darker color on hover */
  }
`;

class Mycart extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập trạng thái toàn cục

  render() {
    const mycart = this.context.mycart.map((item, index) => (
      <TableRow key={item.product._id}>
        <TableData>{index + 1}</TableData>
        <TableData>{item.product._id}</TableData>
        <TableData>{item.product.name}</TableData>
        <TableData>{item.product.category.name}</TableData>
        <TableData>
          <ProductImage src={"data:image/jpg;base64," + item.product.image} alt={item.product.name} />
        </TableData>
        <TableData>{item.product.price.toLocaleString()}₫</TableData>
        <TableData>{item.quantity}</TableData>
        <TableData>{(item.product.price * item.quantity).toLocaleString()}₫</TableData>
        <TableData>
          <RemoveLink onClick={() => this.lnkRemoveClick(item.product._id)}>Xóa</RemoveLink>
        </TableData>
      </TableRow>
    ));

    return (
      <Container>
        <Heading>DANH SÁCH SẢN PHẨM</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <th>STT</th>
              <th>ID</th>
              <th>Tên</th>
              <th>Danh mục</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng cộng</th>
              <th>Hành động</th>
            </TableRow>
          </TableHeader>
          <tbody>
            {mycart}
            <TableFooter>
              <TableData colSpan="7">Tổng</TableData>
              <TableData>{CartUtil.getTotal(this.context.mycart).toLocaleString()}₫</TableData>
              <TableData>
                <CheckoutLink onClick={() => this.lnkCheckoutClick()}>THANH TOÁN</CheckoutLink>
              </TableData>
            </TableFooter>
          </tbody>
        </Table>
      </Container>
    );
  }

  // Xử lý sự kiện
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // tìm thấy, xóa mục
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  lnkCheckoutClick() {
    if (window.confirm('BẠN CÓ CHẮC CHẮN KHÔNG?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Giỏ hàng của bạn đang trống');
      }
    }
  }

  // APIs
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THANH TOÁN THÀNH CÔNG!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('THANH TOÁN THẤT BẠI!');
      }
    });
  }
}

export default withRouter(Mycart);
