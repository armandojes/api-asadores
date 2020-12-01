/* eslint-disable no-unused-vars */
import nodemailer from 'nodemailer'
import path from 'path'
import * as os from 'os'
import * as pdf from 'html-pdf'
import * as fs from 'fs-extra'
import { log } from 'firebase-functions/lib/logger'

const send = async (request, response) => {
  const { html, email, subject } = request.body
  const transporter = nodemailer.createTransport('smtp://ventas@asadoresdelnorte.com:Asa23*mty@s77m-gqnv.accessdomain.com:587')

  pdf.create(html, {
    height: '14in',
    width: '12in',
    phantomArgs: ['--local-url-access=false']
  }).toBuffer(async (err, buffer) => {
    if (err) {
      log('err', err)
      const info = await transporter.sendMail({
        from: 'ventas@asadoresdelnorte.com',
        to: email,
        subject: subject || 'Confirmacion de compra',
        html: html
      })
      response.success({ info })
    } else {
      const info = await transporter.sendMail({
        from: 'ventas@asadoresdelnorte.com',
        to: email,
        subject: subject || 'Confirmacion de compra',
        html: html,
        attachments: [
          {
            filename: 'reibo.pdf',
            content: buffer,
            contentType: 'application/pdf'
          }
        ]
      })
      response.success({ info })
    }
  })
}

export default send
