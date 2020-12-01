import { Router } from 'express'
import send from './constrolers/send'

const email = new Router()
email.post('/send', send)

export default email
