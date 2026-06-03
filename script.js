let devices = [];
let currentQuestion = null;

// JSON 불러오기
fetch("device.json")
  .then((response) => response.json())
  .then((data) => {
    devices = data;
  })
  .catch((error) => {
    console.error("JSON 로딩 실패:", error);
  });

// 랜덤 문제 선택
function loadRandomQuestion() {
  if (devices.length === 0) {
    alert("문제 데이터를 불러오는 중입니다.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * devices.length);
  currentQuestion = devices[randomIndex];

  document.getElementById("question").textContent = currentQuestion.name;

  document.getElementById("answerInput").value = "";
  document.getElementById("result").textContent = "";
  document.getElementById("answerInput").focus();
}

// 정답 확인
function checkAnswer() {
  if (!currentQuestion) {
    alert("먼저 재시작 버튼을 눌러 문제를 시작하세요.");
    return;
  }

  const userAnswer = document.getElementById("answerInput").value.trim();

  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    document.getElementById("result").textContent = "정답입니다!";
    document.getElementById("result").style.color = "green";
    loadRandomQuestion();
  } else {
    document.getElementById("result").textContent = `오답! 정답은 ${currentQuestion.answer}`;
    document.getElementById("result").style.color = "red";
  }
}

document.getElementById("restartBtn").addEventListener("click", loadRandomQuestion);

document.getElementById("checkBtn").addEventListener("click", checkAnswer);

document.getElementById("answerInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
