const quizBox = document.getElementById("quiz-box");
const startBtn = document.getElementById("start-btn");

let currentQuestion = 0;
let scores = {};

const princesses = {
  "白雪公主 Snow White": {
    icon: "🍎",
    text: "你溫柔善良，重視陪伴，總是願意照顧身邊的人。"
  },
  "灰姑娘 Cinderella": {
    icon: "👠",
    text: "你相信希望，即使遇到困難，也會努力撐下去。"
  },
  "奧蘿拉 Aurora": {
    icon: "🌹",
    text: "你浪漫感性，喜歡安靜、美好又有想像力的生活。"
  },
  "愛麗兒 Ariel": {
    icon: "🧜‍♀️",
    text: "你充滿好奇心，勇敢探索未知，也願意追求自己的夢想。"
  },
  "貝兒 Belle": {
    icon: "📚",
    text: "你聰明獨立，喜歡思考，不會只用外表判斷事情。"
  },
  "茉莉 Jasmine": {
    icon: "🐯",
    text: "你有主見、重視自由，不喜歡被別人的期待限制。"
  },
  "寶嘉康蒂 Pocahontas": {
    icon: "🍃",
    text: "你重視自然與內心的聲音，常常能做出成熟的判斷。"
  },
  "木蘭 Mulan": {
    icon: "⚔️",
    text: "你勇敢、有責任感，願意為重要的人挺身而出。"
  },
  "蒂安娜 Tiana": {
    icon: "⭐",
    text: "你務實努力，清楚自己的目標，願意一步一步完成夢想。"
  },
  "樂佩 Rapunzel": {
    icon: "🎨",
    text: "你樂觀、有創意，對生活充滿熱情與想像力。"
  },
  "梅莉達 Merida": {
    icon: "🏹",
    text: "你自由直接，不喜歡被控制，勇於選擇自己的道路。"
  },
  "莫娜 Moana": {
    icon: "🌊",
    text: "你有冒險精神，相信自己，也願意探索更大的世界。"
  },
  "拉雅 Raya": {
    icon: "🐉",
    text: "你堅強謹慎，重視信任，也懂得保護重要的人。"
  }
};

const questions = [
  {
    question: "1. 面對新環境時，你通常會？",
    options: [
      { text: "先觀察，再慢慢適應", points: ["白雪公主 Snow White", "奧蘿拉 Aurora", "拉雅 Raya"] },
      { text: "主動探索，想看看有什麼新鮮事", points: ["愛麗兒 Ariel", "莫娜 Moana", "樂佩 Rapunzel"] },
      { text: "保持冷靜，先想清楚怎麼做", points: ["貝兒 Belle", "蒂安娜 Tiana", "寶嘉康蒂 Pocahontas"] },
      { text: "照自己的想法行動，不想被限制", points: ["茉莉 Jasmine", "梅莉達 Merida", "木蘭 Mulan"] }
    ]
  },
  {
    question: "2. 朋友遇到困難時，你會？",
    options: [
      { text: "溫柔陪伴，讓對方安心", points: ["白雪公主 Snow White", "灰姑娘 Cinderella", "奧蘿拉 Aurora"] },
      { text: "直接站出來幫忙解決", points: ["木蘭 Mulan", "拉雅 Raya", "梅莉達 Merida"] },
      { text: "理性分析，幫對方找方法", points: ["貝兒 Belle", "蒂安娜 Tiana", "寶嘉康蒂 Pocahontas"] },
      { text: "鼓勵對方勇敢嘗試", points: ["愛麗兒 Ariel", "樂佩 Rapunzel", "莫娜 Moana", "茉莉 Jasmine"] }
    ]
  },
  {
    question: "3. 你最重視的是什麼？",
    options: [
      { text: "希望與善良", points: ["白雪公主 Snow White", "灰姑娘 Cinderella", "奧蘿拉 Aurora"] },
      { text: "自由與選擇", points: ["茉莉 Jasmine", "梅莉達 Merida", "愛麗兒 Ariel"] },
      { text: "努力與目標", points: ["蒂安娜 Tiana", "木蘭 Mulan", "貝兒 Belle"] },
      { text: "信任與內心信念", points: ["拉雅 Raya", "寶嘉康蒂 Pocahontas", "莫娜 Moana", "樂佩 Rapunzel"] }
    ]
  },
  {
    question: "4. 遇到壓力時，你比較常？",
    options: [
      { text: "安靜消化，需要一點自己的空間", points: ["奧蘿拉 Aurora", "貝兒 Belle", "寶嘉康蒂 Pocahontas"] },
      { text: "告訴自己再撐一下，會變好的", points: ["灰姑娘 Cinderella", "白雪公主 Snow White", "蒂安娜 Tiana"] },
      { text: "開始行動，把問題解決掉", points: ["木蘭 Mulan", "拉雅 Raya", "梅莉達 Merida"] },
      { text: "出去走走，換個地方找答案", points: ["莫娜 Moana", "愛麗兒 Ariel", "樂佩 Rapunzel", "茉莉 Jasmine"] }
    ]
  },
  {
    question: "5. 你最想成為哪一種人？",
    options: [
      { text: "溫柔又能帶給別人力量的人", points: ["白雪公主 Snow White", "灰姑娘 Cinderella", "奧蘿拉 Aurora"] },
      { text: "勇敢追求自由的人", points: ["茉莉 Jasmine", "梅莉達 Merida", "愛麗兒 Ariel"] },
      { text: "有目標、能靠自己完成夢想的人", points: ["蒂安娜 Tiana", "貝兒 Belle", "木蘭 Mulan"] },
      { text: "相信自己，願意探索未知的人", points: ["莫娜 Moana", "拉雅 Raya", "寶嘉康蒂 Pocahontas", "樂佩 Rapunzel"] }
    ]
  }
];

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestion = 0;
  scores = {};

  for (let princess in princesses) {
    scores[princess] = 0;
  }

  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];

  quizBox.innerHTML = `
    <div class="progress">第 ${currentQuestion + 1} 題 / 共 ${questions.length} 題</div>
    <div class="question">${q.question}</div>
    <div class="options">
      ${q.options.map((option, index) => `
        <button class="option-btn" onclick="selectAnswer(${index})">
          ${option.text}
        </button>
      `).join("")}
    </div>
  `;
}

function selectAnswer(index) {
  const selected = questions[currentQuestion].options[index];

  selected.points.forEach(princess => {
    scores[princess]++;
  });

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let resultPrincess = "";
  let highestScore = -1;

  for (let princess in scores) {
    if (scores[princess] > highestScore) {
      highestScore = scores[princess];
      resultPrincess = princess;
    }
  }

  const result = princesses[resultPrincess];

  quizBox.innerHTML = `
    <div class="result">
      <div class="princess-icon">${result.icon}</div>
      <h2>你的測驗結果是</h2>
      <h1>${resultPrincess}</h1>
      <p>${result.text}</p>
      <button id="restart-btn" onclick="startQuiz()">重新測驗</button>
    </div>
  `;
}
