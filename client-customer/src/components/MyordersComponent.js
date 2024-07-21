import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
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
  text-align: center;
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
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 8px;
`;

const TableImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

class Myorders extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập trạng thái toàn cục

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    const orders = this.state.orders.map((item) => (
      <TableRow key={item._id} onClick={() => this.trItemClick(item)}>
        <TableData>{item._id}</TableData>
        <TableData>{new Date(item.cdate).toLocaleString()}</TableData>
        <TableData>{item.customer.name}</TableData>
        <TableData>{item.customer.phone}</TableData>
        <TableData>{item.total}</TableData>
        <TableData>{item.status}</TableData>
      </TableRow>
    ));

    const items = this.state.order ? this.state.order.items.map((item, index) => (
      <TableRow key={item.product._id}>
        <TableData>{index + 1}</TableData>
        <TableData>{item.product._id}</TableData>
        <TableData>{item.product.name}</TableData>
        <TableData>
          <TableImage src={"data:image/jpg;base64," + item.product.image} alt="" />
        </TableData>
        <TableData>{item.product.price}</TableData>
        <TableData>{item.quantity}</TableData>
        <TableData>{item.product.price * item.quantity}</TableData>
      </TableRow>
    )) : null;

    return (
      <Container>
        <Heading>ORDER LIST</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <th>ID</th>
              <th>Creation date</th>
              <th>Cust.name</th>
              <th>Cust.phone</th>
              <th>Total</th>
              <th>Status</th>
            </TableRow>
          </TableHeader>
          <tbody>
            {orders}
          </tbody>
        </Table>
        {this.state.order && (
          <Container>
            <Heading>ORDER DETAIL</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </TableRow>
              </TableHeader>
              <tbody>
                {items}
              </tbody>
            </Table>
          </Container>
        )}
      </Container>
    );
  }

  // Event handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  // API
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;
