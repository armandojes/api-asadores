import { Router } from 'express'
import card from './controllers/card'
import getStatus from './controllers/get_status'
import spei from './controllers/spei'
import store from './controllers/store'
import webhook from './controllers/webhook'
import webhookpaypal from './controllers/webhookpaypal'

const payments = Router()

payments.post('/card', card)
payments.post('/store', store)
payments.post('/spei', spei)
payments.post('/webhook', webhook)
payments.post('/webhookpaypal', webhookpaypal)
payments.get('/:id', getStatus)

export default payments
