import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: '',
      txtDescription: '',
      txtPrice: '',
      txtImageUrl: ''
    };
  }

  render() {
    return (
      <div className="float-right">
        <h2 className="text-center">CHI TIẾT SẢN PHẨM</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => this.setState({ txtID: e.target.value })}
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Tên</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => this.setState({ txtName: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td>Mô tả</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtDescription}
                    onChange={(e) => this.setState({ txtDescription: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td>Giá</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) => this.setState({ txtPrice: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td>URL Hình Ảnh</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtImageUrl}
                    onChange={(e) => this.setState({ txtImageUrl: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="THÊM MỚI"
                    onClick={(e) => this.btnAddClick(e)}
                  />
                  <input
                    type="submit"
                    value="CẬP NHẬT"
                    onClick={(e) => this.btnUpdateClick(e)}
                  />
                  <input
                    type="submit"
                    value="XÓA"
                    onClick={(e) => this.btnDeleteClick(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtDescription: this.props.item.description,
        txtPrice: this.props.item.price,
        txtImageUrl: this.props.item.imageUrl
      });
    }
  }

  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const { txtName, txtDescription, txtPrice, txtImageUrl } = this.state;
    if (txtName && txtDescription && txtPrice && txtImageUrl) {
      const product = { name: txtName, description: txtDescription, price: txtPrice, imageUrl: txtImageUrl };
      this.apiPostProduct(product);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtID, txtName, txtDescription, txtPrice, txtImageUrl } = this.state;
    if (txtID && txtName && txtDescription && txtPrice && txtImageUrl) {
      const product = { name: txtName, description: txtDescription, price: txtPrice, imageUrl: txtImageUrl };
      this.apiPutProduct(txtID, product);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('BẠN CÓ CHẮC CHẮN KHÔNG?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Vui lòng nhập ID');
      }
    }
  }

  // apis
  apiPostProduct(product) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', product, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('THÊM THÀNH CÔNG!');
        this.apiGetProducts();
      } else {
        alert('THÊM THẤT BẠI!');
      }
    });
  }

  apiPutProduct(id, product) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, product, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('CẬP NHẬT THÀNH CÔNG!');
        this.apiGetProducts();
      } else {
        alert('CẬP NHẬT THẤT BẠI!');
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('XÓA THÀNH CÔNG!');
        this.apiGetProducts();
      } else {
        alert('XÓA THẤT BẠI!');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products', config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result);
    });
  }
}

export default ProductDetail;
