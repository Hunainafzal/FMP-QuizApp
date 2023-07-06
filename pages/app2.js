import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase , set , ref , push} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBbj7oysepJ3WjlDVk82vAk7c60dP5lv1Q",
  authDomain: "quiz-app-3d66b.firebaseapp.com",
  databaseURL: "https://quiz-app-3d66b-default-rtdb.firebaseio.com",
  projectId: "quiz-app-3d66b",
  storageBucket: "quiz-app-3d66b.appspot.com",
  messagingSenderId: "853717161614",
  appId: "1:853717161614:web:a0430314a44a23cc9a5bdf"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()

var question = document.getElementById('question');
var option = document.getElementById('option');
var optionParent = document.getElementById('optionParent');
var correctAns = document.getElementById('correctAns');

var options = [];
var correctAnswer;

function renderQuestion() {
  optionParent.innerHTML = ''; // Clear previous options

  for (var i = 0; i < options.length; i++) {
    optionParent.innerHTML += `<li onclick="setCorrectAns('${options[i]}')" 
    class="p-2 bg-warning fs-4 my-2 rounded shadow" id="option">${options[i]}</li>`;
  }
}

window.addOption = function() {
  options.push(option.value);
  console.log(options);

  renderQuestion();
};

window.setCorrectAns = function(a) {
  correctAnswer = a;
  correctAns.innerHTML = correctAnswer;
};

window.submitQuestion = function(){
  var obj = {
    question: question.value,
    options: options,
    correctAnswer: correctAnswer
  }

  obj.id = push(ref(db , 'question/')).key 

  const reference = ref(db , `question/${obj.id}`)
 set(reference , obj)


  console.log(obj)
}












