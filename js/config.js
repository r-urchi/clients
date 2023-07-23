const firebaseConfig = {
  apiKey: "AIzaSyCqkr4yy1mXop6AZws5XoNwC-k4CECi8jg",
  authDomain: "lista-clientes-52174.firebaseapp.com",
  projectId: "lista-clientes-52174",
  storageBucket: "lista-clientes-52174.appspot.com",
  messagingSenderId: "214680717675",
  appId: "1:214680717675:web:a833de40a9bf1b981e642e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();