const moment = require("moment");
const db = require("../models");
const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD } = require('../common')

const { email : Email } = db;

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,   // 메일 보내는 곳
    prot: 465,
    host: 'smtp.naver.com',  
    secure: false,  
    requireTLS: true ,
    auth: {
      user: EMAIL_USER,  // 보내는 메일의 주소
      pass: EMAIL_PASSWORD   // 보내는 메일의 비밀번호
    }
});

exports.postEmail = async (req, res) => {
    const { name, company, phone, email, products } = req.body
    await transporter.sendMail({
        from: EMAIL_USER, // sender address
        to: 'mewtwogo@naver.com', // list of receivers
        // subject: "TKTrade Product Inquiries", // Subject line
        subject: "TKTrade Product Inquiries", // Subject line
        // text: `name : ${ name }, company : ${ company }, phone : ${ phone }, email : ${ email }, products : ${ products }`, // plain text body
        html: `<div style='
                text-align: center;
                width: 50%;
                margin: 30px auto;
                padding: 80px 50px;
                border: 1px solid #777;
                border-radius: 10px;
                background: #EDEDED;
                box-sizing: border-box;
            '>
            <h2 style='font-size : 24px; font-weight : 600;'>TKTrade 문의 내역</h2> 
            <br/>
            <p style='font-size : 18px;'>Name : <span style='font-weight : 600; margin-right: 10px;'>${ name }</span></p>
            <p style='font-size : 18px;'>Company : <span style='font-weight : 600; margin-right: 10px;'>${ company }</span></p> 
            <p style='font-size : 18px;'>Phone : <span style='font-weight : 600; margin-right: 10px;'>${ phone }</span></p> 
            <p style='font-size : 18px;'>Email : <span style='font-weight : 600; margin-right: 10px;'>${ email }</span></p> 
            <p style='font-size : 18px;'>Products : <span style='font-weight : 600; margin-right: 10px;'>${ products }</span></p>
        </div>`,
    })
    .then(response => {
        console.log('Email sent: ' + response.response)
        res.status(200).json({message : 'Success'})
    })
    .catch(error=>console.log(error))

}
