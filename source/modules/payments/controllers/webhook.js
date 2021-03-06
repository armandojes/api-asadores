import { database, snapShotParser } from 'core/index'
import firebase from 'firebase-admin'
import { log } from 'firebase-functions/lib/logger'

const webhook = async (request, response) => {
  var documentPath = null
  log('request', request.body)

  try {
    documentPath = request.body.transaction.order_id
    if (request.body.type !== 'charge.succeeded') return response.success()
  } catch (error) {
    return response.success()
  }

  // get document date
  try {
    var data = await database.doc(documentPath).get()
    data = snapShotParser(data)
  } catch (error) {
    return response.success()
  }

  // verify status
  if (data.status === 'payed') {
    return response.success()
  }

  // update status to payed
  await database.doc(documentPath).update({
    status: 'payed',
    isViewed: false
  })

  // update counter when isViewd is true
  // data.status is undefned when the pay is with card
  if (data.isViewed !== false || !data.status) {
    try {
      await database.doc('/Ordenes/Pedidos').update({ counter: firebase.firestore.FieldValue.increment(1) })
    } catch (error) {
      await database.doc('/Ordenes/Pedidos').set({ counter: 1 })
    }
  }

  response.success()
}

export default webhook
