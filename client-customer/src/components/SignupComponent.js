import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  text-align: center;
  margin: 20px auto;
  width: 80%;
  background-color: #e0f2e0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  margin: 0 auto;
  text-align: left;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

const Label = styled.td`
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin: 5px 0;
`;

class Signup extends Component {
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

  render() {
    return (
      <Container>
        <Title>ĐĂNG KÝ</Title>
        <Form>
          <Table>
            <tbody>
              <tr>
                <Label>Tên đăng nhập</Label>
                <td><Input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
              </tr>
              <tr>
                <Label>Mật khẩu</Label>
                <td><Input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></td>
              </tr>
              <tr>
                <Label>Họ và tên</Label>
                <td><Input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
              </tr>
              <tr>
                <Label>Số điện thoại</Label>
                <td><Input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></td>
              </tr>
              <tr>
                <Label>Email</Label>
                <td><Input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></td>
              </tr>
              <tr>
                <td></td>
                <td><Input type="submit" value="ĐĂNG KÝ" onClick={(e) => this.btnSignupClick(e)} /></td>
              </tr>
            </tbody>
          </Table>
        </Form>
      </Container>
    );
  }

  // Xử lý sự kiện
  btnSignupClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
      this.apiSignup(account);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập, mật khẩu, họ và tên, số điện thoại và email');
    }
  }

  // APIs
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Signup;
