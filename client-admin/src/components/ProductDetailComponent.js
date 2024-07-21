import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (
          <option
            key={cate._id}
            value={cate._id}
            selected={cate._id === this.props.item.category._id}
          >
            {cate.name}
          </option>
        );
      } else {
        return (
          <option key={cate._id} value={cate._id}>
            {cate.name}
          </option>
        );
      }
    });

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
                    onChange={(e) => {
                      this.setState({ txtID: e.target.value });
                    }}
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
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Giá</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) => {
                      this.setState({ txtPrice: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Hình ảnh</td>
                <td>
                  <input
                    type="file"
                    name="fileImage"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImage(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Danh mục</td>
                <td>
                  <select
                    onChange={(e) => {
                      this.setState({ cmbCategory: e.target.value });
                    }}
                  >
                    {cates}
                  </select>
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
              <tr>
                <td colSpan="2">
                  <img
                    src={this.state.imgProduct}
                    width="300px"
                    height="300px"
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image,
      });
    }
  }

  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    ); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Vui lòng nhập tên, giá, danh mục và hình ảnh');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    ); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Vui lòng nhập id, tên, giá, danh mục và hình ảnh');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('BẠN CÓ CHẮC CHẮN KHÔNG?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Vui lòng nhập id');
      }
    }
  }

  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm mới thành công!');
        this.apiGetProducts();
      } else {
        alert('Thêm mới thất bại!');
      }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Cập nhật thành công!');
        this.apiGetProducts();
      } else {
        alert('Cập nhật thất bại!');
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công!');
        this.apiGetProducts();
      } else {
        alert('Xóa thất bại!');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
}

export default ProductDetail;
