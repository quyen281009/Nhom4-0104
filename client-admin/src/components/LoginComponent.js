import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const SubmitButton = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
`;

class Login extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'quyen',
      txtPassword: '123',
      errorMessage: ''
    };
  }

  render() {
    if (this.context.token === '') {
      return (
        <Container>
          <FormContainer>
            <Title>ADMIN ĐĂNG NHẬP</Title>
            <form>
              <Input
                type="text"
                placeholder="Tên đăng nhập"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
              />
              {this.state.errorMessage && <ErrorMessage>{this.state.errorMessage}</ErrorMessage>}
              <SubmitButton
                type="submit"
                value="ĐĂNG NHẬP"
                onClick={(e) => this.btnLoginClick(e)}
              />
            </form>
          </FormContainer>
        </Container>
      );
    }
    return (<div />);
  }

  // Event handlers
  btnLoginClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      this.apiLogin(account);
    } else {
      this.setState({ errorMessage: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
    }
  }

  // APIs
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        this.setState({ errorMessage: result.message, txtUsername: '', txtPassword: '' });
      }
    }).catch(error => {
      this.setState({ errorMessage: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    });
  }
}

export default Login;
