import Firebase from 'firebase';
let firebaseConfig = {
      apiKey: "AIzaSyDlkUnLpnf6Yb7bIec5OLeOeS-oVeKZKQs",
      authDomain: "rodarme-cs-su19.firebaseapp.com",
      databaseURL: "https://rodarme-cs-su19.firebaseio.com",
      projectId: "rodarme-cs-su19",
      storageBucket: "rodarme-cs-su19.appspot.com",
      messagingSenderId: "47603361844",
      appId: "1:47603361844:web:9398ecdcf1291c3c"
    };
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();