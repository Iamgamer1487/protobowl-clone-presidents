// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDocs, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqv7V-Ije1gsRW4mKRqmZiVimGBNO1BMQ",
  authDomain: "protobowl-clone.firebaseapp.com",
  projectId: "protobowl-clone",
  storageBucket: "protobowl-clone.firebasestorage.app",
  messagingSenderId: "921210626977",
  appId: "1:921210626977:web:a87910f52a6b73a2e8a1e0",
  measurementId: "G-B1E2VHP3KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);

// Assuming you're using Firebase Firestore SDK correctly

// Function to get a random question with answer and category
const getRandomQuestionAndAnswer = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Questions")); // Adjust 'db' if necessary
    const questions = querySnapshot.docs.map((doc) => doc.data());

    if (questions.length === 0) {
      console.error("No questions found in the collection.");
      return null;
    }

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    console.log("Random Question Data:", randomQuestion);

    return randomQuestion;
  } catch (error) {
    console.error("Error fetching question from Firestore:", error);
    return null;
  }
};


export {getRandomQuestionAndAnswer}
