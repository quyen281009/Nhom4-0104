import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import styled from 'styled-components';
import withRouter from '../utils/withRouter';

// Styled components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  width: 80%;
  max-width: 500px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: ${props => props.align || 'left'};
`;

const Label = styled(TableCell)`
  text-align: right;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.input`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #0056b3;
  }
`;

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      <LoginContainer>
        <Title>KHÁCH HÀNG ĐĂNG NHẬP</Title>
        <Form>
          <Table>
            <tbody>
              <tr>
                <Label>Tên đăng nhập</Label>
                <TableCell>
                  <Input 
                    type="text" 
                    value={this.state.txtUsername} 
                    onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
                  />
                </TableCell>
              </tr>
              <tr>
                <Label>Mật khẩu</Label>
                <TableCell>
                  <Input 
                    type="password" 
                    value={this.state.txtPassword} 
                    onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
                  />
                </TableCell>
              </tr>
              <tr>
                <TableCell colSpan="2">
                  <SubmitButton 
                    type="submit" 
                    value="ĐĂNG NHẬP" 
                    onClick={(e) => this.btnLoginClick(e)} 
                  />
                </TableCell>
              </tr>
            </tbody>
          </Table>
        </Form>
      </LoginContainer>
    );
  }

  btnLoginClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;
    if (txtUsername && txtPassword) {
      this.apiLogin({ username: txtUsername, password: txtPassword });
    } else {
      alert('Vui lòng nhập tên đăng nhập và mật khẩu');
    }
  }

  apiLogin = (account) => {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    }).catch(error => {
      console.error("There was an error during login!", error);
    });
  }
}

export default withRouter(Login);
