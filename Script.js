const sections = [...document.querySelectorAll(".section")],
  navs = [...document.querySelectorAll(".nav")];
navs.forEach((n) => (n.onclick = () => showSection(n.dataset.section)));
function showSection(id) {
  sections.forEach((s) => s.classList.toggle("active", s.id === id));
  navs.forEach((n) => n.classList.toggle("active", n.dataset.section === id));
  document.getElementById("pageTitle").textContent =
    {
      dashboard: "Learning Dashboard",
      tutor: "AI Tutor",
      notes: "Notes & Summaries",
      quiz: "Quiz Generator",
      flashcards: "Flashcards",
      planner: "Study Planner",
      subjects: "Subjects & Topics",
    }[id] || "StudyAI";
}
function askTutor() {
  const input = document.getElementById("question"),
    q = input.value.trim();
  if (!q) return;
  const chat = document.getElementById("chat");
  chat.innerHTML += `<div class="user">${escapeHtml(q)}</div>`;
  let a =
    "AI Tutor: Start with the definition, understand the main concepts, and then practice with examples. For this demo, try breaking the topic into smaller parts and reviewing each part.";
  const l = q.toLowerCase();
  if (l.includes("machine learning"))
    a =
      "Machine Learning is a branch of AI where computers learn patterns from data and use those patterns to make predictions or decisions.";
  else if (l.includes("osi"))
    a =
      "The OSI model has seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.";
  else if (l.includes("database"))
    a =
      "A database is an organized collection of data. A DBMS is software used to store, retrieve, update, and manage that data.";
  chat.innerHTML += `<div class="bot">${a}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}
function generateNotes() {
  const t =
    document.getElementById("noteTopic").value.trim() ||
    "Artificial Intelligence";
  document.getElementById("noteResult").innerHTML = `<h3>${escapeHtml( t )} — Quick Notes</h3><ul><li>Understand the definition and basic purpose.</li><li>Learn the important concepts and terminology.</li><li>Study a simple real-world example.</li><li>Review advantages, limitations, and applications.</li><li>Practice questions after revision.</li></ul>`;
}
const quizzes = {
  "Artificial Intelligence": {
    q: "Which technique allows a model to learn from labeled training examples?",
    o: [
      "Supervised learning",
      "Unsupervised learning",
      "Data compression",
      "Encryption",
    ],
    a: 0,
  },
  "Computer Networks": {
    q: "Which OSI layer is responsible for routing packets?",
    o: ["Physical", "Network", "Session", "Presentation"],
    a: 1,
  },
  "Database Management": {
    q: "Which SQL command is used to retrieve data?",
    o: ["SELECT", "DELETE", "UPDATE", "DROP"],
    a: 0,
  },
  Python: {
    q: "Which symbol starts a comment in Python?",
    o: ["//", "#", "<!--", "/*"],
    a: 1,
  },
};
function startQuiz() {
  const x = quizzes[document.getElementById("quizSubject").value],
    box = document.getElementById("quizBox");
  box.innerHTML = `<div class="quiz-question"><h3>${x.q}</h3>${x.o .map( (v, i) => `<button class="quiz-option" onclick="checkAnswer(this,${i},${x.a})">${v}</button>` ) .join("")}</div>`;
}
function checkAnswer(btn, i, a) {
  document.querySelectorAll(".quiz-option").forEach((b) => (b.disabled = true));
  btn.textContent += i === a ? " ✓ Correct!" : " ✗ Try again";
  if (i === a) {
    let s = document.getElementById("dashScore");
    s.textContent = "85%";
  }
}
const cards = [
  [
    "What is Artificial Intelligence?",
    "AI is the field of creating systems that perform tasks requiring human-like intelligence.",
  ],
  [
    "What is Machine Learning?",
    "Machine Learning enables computers to learn patterns from data.",
  ],
  [
    "What is a database?",
    "A database is an organized collection of data that can be managed and retrieved.",
  ],
];
let ci = 0,
  front = true;
function flipCard() {
  const c = cards[ci];
  front = !front;
  document.getElementById("flashcard").textContent = front ? c[0] : c[1];
}
function nextCard() {
  ci = (ci + 1) % cards.length;
  front = true;
  document.getElementById("flashcard").textContent = cards[ci][0];
}
function addTask() {
  const i = document.getElementById("taskInput"),
    v = i.value.trim();
  if (!v) return;
  document.getElementById(
    "plannerList"
  ).innerHTML += `<div class="planner-item">☐ ${escapeHtml(v)}</div>`;
  i.value = "";
}
function subjectInfo(s) {
  document.getElementById(
    "subjectResult"
  ).innerHTML = `<b>${s}</b><br/>Select a topic to begin. Recommended: definitions → core concepts → examples → practice questions.`;
}
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[
        c
      ])
  );
}
