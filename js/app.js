 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { getDatabase , ref , onChildAdded} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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

 var questions = [
    {
        question: "Which property is used to change the text color in CSS",
        options: ["color", "font-color", "text-color", "text-style"],
        correctans: "color"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["let", "var", "const", "all of the above"],
        correctans: "all of the above"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["link", "a", "href", "hyperlink"],
        correctans: "<a>"
    },
    {
        question: "How do you select an element with id 'myElement' in CSS?",
        options: ["#myElement", ".myElement", "*myElement", "~myElement"],
        correctans: "#myElement"
    },
    {
        question: "Which attribute is used to define inline styles in HTML?",
        options: ["class", "id", "style", "inline"],
        correctans: "style"
    },
 ];

 function getDataFromDatabase(){
     const reference = ref(db , 'question/')
    onChildAdded(reference , function(data){
        console.log(data.val())
        questions.push(data.val())
        renderQuestion()
    })
 }

 getDataFromDatabase()


 document.addEventListener('DOMContentLoaded', function() {
    

    var currentQuestion = document.getElementById('currentQuestion');
    var totalQuestion = document.getElementById('totalQuestion');
    var questionElement = document.getElementById('question');
    var answerParent = document.getElementById('answerParent');

    var indexNum = 0;
    var score = 0;

    window.checkQuestion = function(a, b) {
        if (a == b) {
            score++;
            console.log(score);
        }

        nextQuestion();
    }

    window.renderQuestion = function() {
        currentQuestion.innerHTML = indexNum + 1;
        totalQuestion.innerHTML = questions.length;

        var object = questions[indexNum];

        questionElement.innerHTML = object.question;
        answerParent.innerHTML = '';
        for (var i = 0; i < object.options.length; i++) {
            answerParent.innerHTML += `<div class="col-md-4">
            <div class="py-3">
                <button onclick="checkQuestion('${object.options[i]}' , '${object.correctans}')"   class="btn btn-dark rounded-pill w-100 fs-4">
                ${object.options[i]}
                </button>
            </div>
        </div>`;
        }
    }

    window.nextQuestion = function() {
     if(indexNum + 1 == questions.length){
        alert("your score is " + score)
     }else{
        indexNum++;
        renderQuestion();
     }


    }

    renderQuestion();
});
