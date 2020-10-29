import firebaseAdmin from 'firebase-admin'
import firebaseCredentialDevelop from '../../firebaseCredentialDevelop'
import 'firebase/auth'
import 'node-fetch'

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredentialDevelop),
  databaseURL: 'https://santacruz-a164a.firebaseio.com'
})

export const database = firebaseAdmin.firestore()
export const auth = firebaseAdmin.auth()

export const snapShotParser = snapshot => {
  if (snapshot.docs) {
    if (snapshot.empty) return []
    return snapshot.docs.map(doc => {
      const data = doc.data()
      if (!data.id) data.id = doc.id
      return data
    })
  } else {
    if (!snapshot.exists) return null
    const data = snapshot.data()
    return data
  }
}
