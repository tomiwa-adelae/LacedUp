import { WEBSITE_URL } from "@/constants";

export const generateNewsLetterEmail = () => `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Lacedup</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #000000; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Lacedup</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">You're in!</h2>
        <p style="font-size: 16px; color: #555555;">
          Hey there,
        </p>
        <p style="font-size: 16px; color: #555555;">
          Thanks for subscribing to <strong>Lacedup</strong> – your one-stop shop for the freshest kicks on the block.
        </p>
        <p style="font-size: 16px; color: #555555;">
          From now on, you'll be the first to know about:
          <ul style="color: #555555;">
            <li>🔥 New arrivals</li>
            <li>💸 Exclusive deals</li>
            <li>👟 Style tips and trends</li>
          </ul>
        </p>
        <p style="font-size: 16px; color: #555555;">
          We're excited to have you as part of the Lacedup family. Stay tuned – great things are coming your way!
        </p>
        <p style="font-size: 16px; color: #555555;">
          - The Lacedup Team
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #999999; text-align: center;">
          You’re receiving this email because you subscribed at <a href="${WEBSITE_URL}" style="color: #999999;">Lacedup</a>.
          <br>
          Don’t want these emails? <a href="#" style="color: #999999;">Unsubscribe</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
