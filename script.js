const quizBox = document.getElementById("quiz-box");
const startBtn = document.getElementById("start-btn");

let currentQuestion = 0;
let scores = {};

const princesses = {
    "白雪公主 Snow White": "你溫柔善良，重視身邊的人，總是能帶給別人安心的感覺。",
    "灰姑娘 Cinderella": "你相信希望，即使遇到困難也願意努力撐下去。",
    "奧蘿拉 Aurora": "你浪漫、感性，喜歡安靜美好的生活氛圍。",
    "愛麗兒 Ariel": "你充滿好奇心，勇敢追求自己想要的世界。",
    "貝兒 Belle": "你聰明獨立，喜歡思考，也不會輕易被外表影響判斷。",
    "茉莉 Jasmine": "你有主見，重視自由，不喜歡被別人的期待限制。",
    "寶嘉康蒂 Pocahontas": "你重視和平與自然，常常能傾聽自己內心的聲音。",
    "木蘭 Mulan": "你勇敢、有責任感，願意為重要的人挺身而出。",
    "蒂安娜 Tiana": "你務實努力，清楚自己的目標，願意一步一步完成夢想。",
    "樂佩 Rapunzel": "你樂觀、有創意，對世界充滿想像力與熱情。",
    "梅莉達 Merida": "你自由直接，不喜歡被控制，勇於做自己的選擇。",
    "莫娜 Moana": "你有冒險精神，相信自己，也願意探索未知的可能。",
    "拉雅 Raya": "你堅強謹慎，重視信任，也懂得保護自己與重要的人。"
};

const questions = [
    {
        question: "1. 面對新的環境時，你通常會怎麼做？",
        options: [
            { text: "先觀察大家，再慢慢適應", princess: "白雪公主 Snow White" },
            { text: "保持希望，相信自己會越來越好", princess: "灰姑娘 Cinderella" },
            { text: "主動探索，想看看有什麼新鮮事", princess: "愛麗兒 Ariel" },
            { text: "先判斷安全，再決定要不要靠近", princess: "拉雅 Raya" }
        ]
    },
    {
        question: "2. 朋友遇到困難時，你會？",
        options: [
            { text: "溫柔陪伴，讓對方安心", princess: "白雪公主 Snow White" },
            { text: "直接站出來幫忙解決問題", princess: "木蘭 Mulan" },
            { text: "鼓勵對方勇敢追求自己的想法", princess: "茉莉 Jasmine" },
            { text: "用樂觀的方式讓氣氛變輕鬆", princess: "樂佩 Rapunzel" }
        ]
    },
    {
        question: "3. 你最重視哪一件事？",
        options: [
            { text: "自由，不想被規定人生方向", princess: "梅莉達 Merida" },
            { text: "夢想，想靠努力完成目標", princess: "蒂安娜 Tiana" },
            { text: "知識，希望能理解更多事情", princess: "貝兒 Belle" },
            { text: "內心的聲音，做真正相信的選擇", princess: "寶嘉康蒂 Pocahontas" }
        ]
    },
    {
        question: "4. 遇到壓力時，你比較像哪一種？",
        options: [
            { text: "安靜消化情緒，需要一點自己的空間", princess: "奧蘿拉 Aurora" },
            { text: "告訴自己再撐一下，事情會變好", princess: "灰姑娘 Cinderella" },
            { text: "開始規劃，努力把事情完成", princess: "蒂安娜 Tiana" },
            { text: "想出去走走，換個地方找答案", princess: "莫娜 Moana" }
        ]
    },
    {
        question: "5. 如果可以選一種人生風格，你會選？",
        options: [
            { text: "浪漫平靜，享受生活中的美好", princess: "奧蘿拉 Aurora" },
            { text: "勇敢冒險，探索更大的世界", princess: "莫娜 Moana" },
            { text: "獨立自主，自己決定自己的路", princess: "茉莉 Jasmine" },
            { text: "活潑有趣，每天都有新的靈感", princess: "樂佩 Rapunzel" }
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
        <div class="question">${q.question}</div>
        <div class="options">
            ${q.options.map(option => `
                <button class="option-btn" onclick="selectAnswer('${option.princess}')">
                    ${option.text}
                </button>
            `).join("")}
        </div>
    `;
}

function selectAnswer(princess) {
    scores[princess]++;

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

    quizBox.innerHTML = `
        <div class="result">
            <h2>你的測驗結果是：</h2>
            <h1>${resultPrincess}</h1>
            <p>${princesses[resultPrincess]}</p>
            <button id="restart-btn" onclick="startQuiz()">重新測驗</button>
        </div>
    `;
}
