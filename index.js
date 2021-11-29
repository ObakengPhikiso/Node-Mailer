const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'lethabosithole01@gmail.com',
        pass: 'Lesedi199010?',
    },
    from: 'lethabosithole01@gmail.com',
    secure: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

route.post('/email', (req, res) => {
    const { to, subject, text, name, surname } = req.body;
    console.log(req.body);
    const mailData = {
        from: 'lethabosithole01@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: `<b>Hey ${name} ${surname}</b><br> ${text}<br/>`,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});
