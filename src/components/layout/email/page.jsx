export const generatePasswordResetEmail = (resetLink, name, supportemail) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #1f2736; /* Dark background */
        margin: 0;
        padding: 0;
        color: #ffffff;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #2e384d;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        border: 1px solid #3a455c;
      }
      .header {
        background: linear-gradient(135deg, #2d73ff, #157af6);
        color: #ffffff;
        padding: 24px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 1px;
      }
      .content {
        padding: 24px;
        line-height: 1.8;
        color: #eaeaea;
        font-size: 16px;
      }
      .content h2 {
        color: #4daaff;
        font-size: 24px;
        margin-bottom: 16px;
      }
      .button-container {
        text-align: center;
        margin: 24px 0;
      }
      .reset-button {
        display: inline-block;
        background-color: #2d73ff;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 8px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
      .reset-button:hover {
        background-color: #195ddc;
      }
      .footer {
        background-color: #252f41;
        color: #bbbbbb;
        text-align: center;
        padding: 16px;
        font-size: 12px;
        border-top: 1px solid #3a455c;
      }
      .footer a {
        color: #4daaff;
        text-decoration: none;
        font-weight: bold;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Password Reset Request</div>
      <div class="content">
        <h2>Hello ${name},</h2>
        <p>
          We received a request to reset your password. Click the button below to reset it. If you didn’t request this, you can safely ignore this email.
        </p>
        <div class="button-container">
          <a href="${resetLink}" class="reset-button">Reset Your Password</a>
        </div>
        <p>
          For your security, this link will expire in 30 minutes. If the button doesn't work, copy and paste the following link into your browser:
        </p>
        <p><strong>${resetLink}</strong></p>
      </div>
      <div class="footer">
        <p>
          If you have any questions, feel free to contact us at
          <a href="mailto:${supportemail}">${supportemail}</a>.
        </p>
        <p>&copy; 2025 RASHED Services. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
export default EmailTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #1a1a2e;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 25px;
      color: #333333;
    }
    .section {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
      color: #555555;
    }
    .value {
      display: block;
      padding: 10px;
      background-color: #f9f9f9;
      border: 1px solid #eeeeee;
      border-radius: 4px;
    }
    .footer {
      background-color: #f1f1f1;
      text-align: center;
      font-size: 12px;
      color: #777777;
      padding: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Message</h2>
    </div>
    <div class="content">
      <div class="section">
        <span class="label">Name</span>
        <span class="value">${firstName} ${lastName}</span>
      </div>
      <div class="section">
        <span class="label">Email</span>
        <span class="value">${email}</span>
      </div>
      <div class="section">
        <span class="label">Phone</span>
        <span class="value">${phone}</span>
      </div>
      <div class="section">
        <span class="label">Subject</span>
        <span class="value">${subject}</span>
      </div>
      <div class="section">
        <span class="label">Message</span>
        <span class="value">${message}</span>
      </div>
    </div>
    <div class="footer">
      This message was sent from your website contact form.
    </div>
  </div>
</body>
</html>
`;
