const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOrderConfirmation(to, order) {
    const address = order.Address
      ? `${order.Address.address}, ${order.Address.commune}, ${order.Address.district}, ${order.Address.province}`
      : 'Không xác định';
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Xác nhận đơn hàng #${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #1976d2; color: #fff; padding: 20px 30px;">
            <h2 style="margin: 0;">Cảm ơn bạn đã đặt hàng tại GeekUp!</h2>
          </div>
          <div style="padding: 24px 30px;">
            <p>Đơn hàng <b>#${order.id}</b> đã được tạo thành công.</p>
            <p><b>Địa chỉ giao hàng:</b><br>${address}</p>
            <p><b>Tổng tiền:</b> <span style="color: #1976d2; font-size: 1.2em;">${
              order.total
            } VND</span></p>
            <p><b>Trạng thái:</b> <span style="color: #388e3c;">${
              order.status
            }</span></p>
            <hr style="margin: 24px 0;">
            <h3 style="margin-bottom: 8px;">Chi tiết đơn hàng:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th align="left" style="padding: 8px; border-bottom: 1px solid #eee;">Sản phẩm</th>
                  <th align="center" style="padding: 8px; border-bottom: 1px solid #eee;">Số lượng</th>
                  <th align="right" style="padding: 8px; border-bottom: 1px solid #eee;">Đơn giá (VND)</th>
                </tr>
              </thead>
              <tbody>
                ${order.OrderItems.map(
                  (item) =>
                    `<tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${
                        item.ProductVariant?.Product?.name || ''
                      }</td>
                      <td align="center" style="padding: 8px; border-bottom: 1px solid #eee;">${
                        item.quantity
                      }</td>
                      <td align="right" style="padding: 8px; border-bottom: 1px solid #eee;">${
                        item.price
                      }</td>
                    </tr>`
                ).join('')}
              </tbody>
            </table>
            <p style="margin-top: 32px; color: #888; font-size: 0.95em;">Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ bộ phận CSKH của GeekUp.</p>
          </div>
        </div>
      `,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();
