import { firebase } from '@firebase/app'
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCa933NRbj9LFOvwOi2WXzjbpSdUkF9Nxg',
  authDomain: 'todo-6f0e8.firebaseapp.com',
  databaseURL: 'https://todo-6f0e8.firebaseio.com',
  projectId: 'todo-6f0e8',
  storageBucket: 'todo-6f0e8.appspot.com',
  messagingSenderId: '642956354750',
  appId: '1:642956354750:web:a9793d47fda8d4dfa2eaef',
  measurementId: 'G-HL0E253N2G',
})

export const db = firebaseApp.firestore()
