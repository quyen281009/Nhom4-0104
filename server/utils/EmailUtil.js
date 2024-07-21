// CLI: npm install nodemailer --save
const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: MyConstants.EMAIL_PASS
  }
});

const EmailUtil = {
  send(email, id, token) {
    const text = `Cảm ơn bạn đã đăng ký, vui lòng nhập các thông tin sau để kích hoạt tài khoản của bạn:\n\t .ID: ${id}\n\t .Token: ${token}`;
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: 'Đăng ký | Xác nhận',
        text: text
      };
      transporter.sendMail(mailOptions, (err, result) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
};

module.exports = EmailUtil;
