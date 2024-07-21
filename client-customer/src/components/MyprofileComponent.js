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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  margin: 20px 0;
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const SubmitButton = styled.input`
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

class Myprofile extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập trạng thái toàn cục

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    return (
      <Container>
        <Heading>THÔNG TIN CÁ NHÂN</Heading>
        <Form onSubmit={(e) => this.btnUpdateClick(e)}>
          <Table>
            <tbody>
              <tr>
                <td>Tên đăng nhập</td>
                <TableCell>
                  <input 
                    type="text" 
                    value={this.state.txtUsername} 
                    onChange={(e) => this.setState({ txtUsername: e.target.value })} 
                  />
                </TableCell>
              </tr>
              <tr>
                <td>Mật khẩu</td>
                <TableCell>
                  <input 
                    type="password" 
                    value={this.state.txtPassword} 
                    onChange={(e) => this.setState({ txtPassword: e.target.value })} 
                  />
                </TableCell>
              </tr>
              <tr>
                <td>Họ và tên</td>
                <TableCell>
                  <input 
                    type="text" 
                    value={this.state.txtName} 
                    onChange={(e) => this.setState({ txtName: e.target.value })} 
                  />
                </TableCell>
              </tr>
              <tr>
                <td>Số điện thoại</td>
                <TableCell>
                  <input 
                    type="tel" 
                    value={this.state.txtPhone} 
                    onChange={(e) => this.setState({ txtPhone: e.target.value })} 
                  />
                </TableCell>
              </tr>
              <tr>
                <td>Email</td>
                <TableCell>
                  <input 
                    type="email" 
                    value={this.state.txtEmail} 
                    onChange={(e) => this.setState({ txtEmail: e.target.value })} 
                  />
                </TableCell>
              </tr>
              <tr>
                <td></td>
                <TableCell>
                  <SubmitButton type="submit" value="CẬP NHẬT" />
                </TableCell>
              </tr>
            </tbody>
          </Table>
        </Form>
      </Container>
    );
  }

  // Xử lý sự kiện
  btnUpdateClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const customer = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Vui lòng nhập tên đăng nhập, mật khẩu, họ và tên, số điện thoại và email');
    }
  }

  // APIs
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Cập nhật thành công!');
        this.context.setCustomer(result);
      } else {
        alert('Cập nhật thất bại!');
      }
    });
  }
}

export default Myprofile;
