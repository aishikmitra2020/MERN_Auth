import { createTransport } from 'nodemailer'

const sendMail = async ({ email, subject, html }) => {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "kljsancdkjol",
            pass: "ekjmdoiwe"
        },
    });

    await transport.sendMail({
        from: "asdcdcasd",
        to: email,
        subject,
        html,
    });
};

export default sendMail;
