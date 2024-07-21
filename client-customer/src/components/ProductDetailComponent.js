import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
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

const Title = styled.h2`
  text-align: center;
`;

const Figure = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProductImage = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Figcaption = styled.figcaption`
  max-width: 400px;
  text-align: left;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

const Label = styled.td`
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin: 5px 0;
`;

class ProductDetail extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập trạng thái toàn cục

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;
    if (prod) {
      return (
        <Container>
          <Title>CHI TIẾT SẢN PHẨM</Title>
          <Figure>
            <ProductImage src={"data:image/jpg;base64," + prod.image} alt={prod.name} />
            <Figcaption>
              <form>
                <Table>
                  <tbody>
                    <tr>
                      <Label>ID:</Label>
                      <td>{prod._id}</td>
                    </tr>
                    <tr>
                      <Label>Tên:</Label>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <Label>Giá:</Label>
                      <td>{prod.price.toLocaleString()}₫</td>
                    </tr>
                    <tr>
                      <Label>Danh mục:</Label>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <Label>Số lượng:</Label>
                      <td>
                        <Input 
                          type="number" 
                          min="1" 
                          max="99" 
                          value={this.state.txtQuantity} 
                          onChange={(e) => this.setState({ txtQuantity: e.target.value })} 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <Input 
                          type="submit" 
                          value="THÊM VÀO GIỎ" 
                          onClick={(e) => this.btnAdd2CartClick(e)} 
                          style={{ cursor: 'pointer' }} 
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </form>
            </Figcaption>
          </Figure>
        </Container>
      );
    }
    return <div />;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // Xử lý sự kiện
  btnAdd2CartClick(e) {
    e.preventDefault();
    const { product, txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // kiểm tra xem _id có tồn tại trong giỏ hàng không
      if (index === -1) { // không tìm thấy, thêm mục mới
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // tăng số lượng
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Đã thêm vào giỏ hàng!');
    } else {
      alert('Vui lòng nhập số lượng');
    }
  }

  // APIs
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}

export default withRouter(ProductDetail);
