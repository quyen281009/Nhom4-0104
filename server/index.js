// CLI: npm install express body-parser --save
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${PORT}`);
});

// middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// apis
app.get('/hello', (req, res) => { res.json({ message: 'Xin chào từ máy chủ!' }); });
app.use('/api/admin', require('./api/admin'));
app.use('/api/customer', require('./api/customer'));

// deployment
const path = require('path');

// '/admin' phục vụ các tệp tại client-admin/build/* dưới dạng tệp tĩnh
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'))
});

// '/' phục vụ các tệp tại client-customer/build/* dưới dạng tệp tĩnh
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});
