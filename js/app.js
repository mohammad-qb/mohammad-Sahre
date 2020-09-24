const dataElement = document.querySelector('#latest-data');
const formElement = document.querySelector('#form');
const loginElement = document.querySelector('#login')
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8V4oKEo-kKas1l4RaIPtu7Xvb4UF6-nM",
  authDomain: "coding-garden-share-a62a7.firebaseapp.com",
  databaseURL: "https://coding-garden-share-a62a7.firebaseio.com",
  projectId: "coding-garden-share-a62a7",
  storageBucket: "coding-garden-share-a62a7.appspot.com",
  messagingSenderId: "768803558452",
  appId: "1:768803558452:web:dd4681522cbff32b5b2661",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function updateSharedList(data){
    dataElement.textContent = JSON.stringify(data, null, 2);
}

function init(authResult) {
    formElement.style.display = "";
    loginElement.style.display = "none";
    const userDBRef = db.collection('users').doc(authResult.user.uid);
    userDBRef.onSnapshot((doc) =>{
        updateSharedList(doc.data())
    });
    formElement.addEventListener('submit', (evt) =>{
        evt.preventDefault();
        const formData = new FormData(formElement);
        const itemText = formData.get('item');
        console.log(itemText)
        userDBRef.collection('items').add({
            text: itemText
        });

        formElement.reset()
    })
}

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#login", {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        init(authResult);
      return true;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },

  signInFlow: "popup",
  signInSuccessUrl: "/#loggid-in",
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  // Other config options...
});
