export const getOtpHtml = ({ email, otp }) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your email</title>
        <style>
            html, body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
        <div style="max-width: 600px; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Verify Your Email</h2>
            <p style="color: #555;">Thank you for registering. Please use the following OTP to verify your email address(${email}):</p>
            <h3 style="color: #333; background-color: #f0f0f0; padding: 10px; border-radius: 4px; text-align: center;">${otp}</h3>
            <p style="color: #555;">This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
            <p style="color: #555;">Best regards,<br>Your Company Team</p>
        </div>
    </body>
    </html>
    `;

    return html;
}

export const getVerifyEmailHtml = ({ email, token }) => {
    const appName = process.env.APP_NAME || "Authentication App";
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(token)}`

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your email</title>
        <style>
            html, body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
        <div style="max-width: 600px; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">Verify Your Email</h2>
            <p style="color: #555;">Thank you for registering with ${appName}. Please click the button below to verify your email address (${email}):</p>
            <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 4px;">Verify Email</a>
            <p style="color: #555; margin-top: 20px;">This link is valid for 5 minutes. If you did not request this, please ignore this email.</p>
            <p style="color: #555;">Best regards,<br>Your Company Team</p>
        </div>
    </body>
    </html>
    `;

    return html;
}

