// Complete Quiz Application
const app = {
    currentUser: '',
    users: JSON.parse(localStorage.getItem('quizUsers')) || {},
    quiz: {
        subject: '',
        module: 0,
        question: 0,
        score: 0,
        time: 8
    }
};

// REAL QUESTIONS - 15 Subjects x 10 Questions each
const questions = {
    
    DSA: [
        {q: "Binary search complexity?", o: ["O(n)", "O(log n)", "O(n²)"], c: 1},
        {q: "Stack principle?", o: ["FIFO", "LIFO"], c: 1},
        {q: "Queue operations?", o: ["Insert rear, delete front", "Insert front, delete rear"], c: 0},
        {q: "Tree with one child?", o: ["Binary", "Unary", "Ternary"], c: 1},
        {q: "Bubble sort?", o: ["O(n log n)", "O(n²)"], c: 1},
        {q: "Linked list insertion?", o: ["O(1)", "O(n)"], c: 0},
        {q: "Hash table collision?", o: ["Chaining", "Probing"], c: 0},
        {q: "Graph cycle?", o: ["Tree", "Connected graph"], c: 0},
        {q: "Dijkstra finds?", o: ["Shortest path", "Longest path"], c: 0},
        {q: "AVL tree property?", o: ["Height balanced", "Weight balanced"], c: 0}
    ],

    Java: [
        {q: "Java platform?", o: ["Dependent", "Independent"], c: 1},
        {q: "Main method?", o: ["public static void main()", "static void main()"], c: 0},
        {q: "Inheritance keyword?", o: ["extends", "inherits"], c: 0},
        {q: "String property?", o: ["Mutable", "Immutable"], c: 1},
        {q: "Exception handling?", o: ["try-catch", "catch-try"], c: 0},
        {q: "ArrayList vs Array?", o: ["Dynamic size", "Fixed size"], c: 0},
        {q: "Multithreading?", o: ["Thread", "Runnable"], c: 1},
        {q: "Final variable?", o: ["Can change", "Cannot change"], c: 1},
        {q: "Garbage collection?", o: ["Manual", "Automatic"], c: 1},
        {q: "OOP principle?", o: ["Inheritance", "All"], c: 1}
    ],

    OS: [
        {q: "CPU scheduling?", o: ["Process management", "Memory management"], c: 0},
        {q: "Deadlock condition?", o: ["Mutual exclusion", "No exclusion"], c: 0},
        {q: "Page replacement?", o: ["FIFO", "LRU"], c: 0},
        {q: "Process states?", o: ["Ready, Running", "Only running"], c: 0},
        {q: "Virtual memory?", o: ["Paging", "No paging"], c: 0},
        {q: "FCFS type?", o: ["Preemptive", "Non-preemptive"], c: 1},
        {q: "Thrashing cause?", o: ["Too many processes"], c: 0},
        {q: "Semaphore purpose?", o: ["Synchronization"], c: 0},
        {q: "DMA means?", o: ["Direct Memory Access"], c: 0},
        {q: "Round Robin?", o: ["Time quantum"], c: 0}
    ],

    Networks: [
        {q: "OSI Layer 7?", o: ["Application", "Transport"], c: 0},
        {q: "TCP property?", o: ["Connection oriented", "Connectionless"], c: 0},
        {q: "HTTP port?", o: ["80", "443"], c: 0},
        {q: "IP address class A?", o: ["1-126", "128-191"], c: 0},
        {q: "MAC address layer?", o: ["Data Link"], c: 0},
        {q: "DNS resolves?", o: ["Name to IP"], c: 0},
        {q: "UDP property?", o: ["Unreliable"], c: 0},
        {q: "Subnet mask C?", o: ["255.255.255.0"], c: 0},
        {q: "Routing protocol?", o: ["RIP", "OSPF"], c: 0},
        {q: "Firewall layer?", o: ["Network"], c: 0}
    ],

    // Non-tech subjects (5)
    Mathematics: [
        {q: "π value?", o: ["3.14", "22/7"], c: 0},
        {q: "Quadratic formula?", o: ["-b±√(b²-4ac)/2a"], c: 0},
        {q: "sin(90°)?", o: ["0", "1"], c: 1},
        {q: "Triangle angles?", o: ["180°"], c: 0},
        {q: "log(1)?", o: ["0"], c: 0},
        {q: "5! = ?", o: ["120"], c: 0},
        {q: "Pythagoras?", o: ["a²+b²=c²"], c: 0},
        {q: "Prime < 20?", o: ["17"], c: 0},
        {q: "x² derivative?", o: ["2x"], c: 0},
        {q: "e value?", o: ["2.718"], c: 0}
    ],

    'General Knowledge': [
        {q: "India capital?", o: ["Delhi", "Mumbai"], c: 0},
        {q: "World largest ocean?", o: ["Pacific"], c: 0},
        {q: "Taj Mahal by?", o: ["Shah Jahan"], c: 0},
        {q: "Japan currency?", o: ["Yen"], c: 0},
        {q: "Longest river?", o: ["Nile"], c: 0},
        {q: "Olympics every?", o: ["4 years"], c: 0},
        {q: "Moon first man?", o: ["Neil Armstrong"], c: 0},
        {q: "India independence?", o: ["1947"], c: 0},
        {q: "World War II end?", o: ["1945"], c: 0},
        {q: "First PM India?", o: ["Nehru"], c: 0}
    ],

    English: [
        {q: "'Happy' synonym?", o: ["Joyful"], c: 0},
        {q: "Child plural?", o: ["Children"], c: 0},
        {q: "He + is?", o: ["He is"], c: 0},
        {q: "'Big' antonym?", o: ["Small"], c: 0},
        {q: "Go past tense?", o: ["Went"], c: 0},
        {q: "Articles?", o: ["a, an, the"], c: 0},
        {q: "Good superlative?", o: ["Best"], c: 0},
        {q: "'Quickly' type?", o: ["Adverb"], c: 0},
        {q: "Passive voice?", o: ["Object becomes subject"], c: 0},
        {q: "Present perfect?", o: ["have/has + past participle"], c: 0}
    ],

    Physics: [
        {q: "Force unit?", o: ["Newton"], c: 0},
        {q: "Newton's 1st law?", o: ["Inertia"], c: 0},
        {q: "Light speed?", o: ["3×10⁸ m/s"], c: 0},
        {q: "Energy unit?", o: ["Joule"], c: 0},
        {q: "Gravity Earth?", o: ["9.8 m/s²"], c: 0},
        {q: "Ohm's law?", o: ["V=IR"], c: 0},
        {q: "Power unit?", o: ["Watt"], c: 0},
        {q: "Frequency unit?", o: ["Hertz"], c: 0},
        {q: "Work formula?", o: ["Force × Distance"], c: 0},
        {q: "Buoyancy principle?", o: ["Archimedes"], c: 0}
    ],

    History: [
        {q: "India independence?", o: ["1947"], c: 0},
        {q: "World War II?", o: ["1939-1945"], c: 0},
        {q: "First Indian Emperor?", o: ["Chandragupta"], c: 0},
        {q: "Mughal founder?", o: ["Babur"], c: 0},
        {q: "Quit India?", o: ["1942"], c: 0},
        {q: "First PM India?", o: ["Nehru"], c: 0},
        {q: "Constitution India?", o: ["1950"], c: 0},
        {q: "Plassey battle?", o: ["1757"], c: 0},
        {q: "Gandhi birth?", o: ["1869"], c: 0},
        {q: "Non-Cooperation?", o: ["1920"], c: 0}
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('authForm').onsubmit = handleAuth;
    document.getElementById('toggleLink').onclick = toggleAuth;
    renderSubjects();
}

function handleAuth(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');
    
    if (btn.textContent === 'Login') {
        if (app.users[user]?.password === pass) {
            app.currentUser = user;
            showScreen('dashboardScreen');
            document.getElementById('welcomeUser').textContent = `Welcome, ${user}!`;
        } else {
            alert('Invalid credentials');
        }
    } else {
        if (!app.users[user]) {
            app.users[user] = { password: pass, quizzes: [] };
            localStorage.setItem('quizUsers', JSON.stringify(app.users));
            alert('Account created! Please login.');
            toggleAuth();
        } else {
            alert('User exists!');
        }
    }
}
function showSocial() {
  renderSocial();
  showScreen('socialScreen');
}

function renderSocial() {
  const container = document.getElementById('friendsList');
  container.innerHTML = '';
  
  // Sample friends from users (expand with real data)
  Object.keys(app.users).forEach(user => {
    if (user !== app.currentUser && Math.random() > 0.5) { // Simulate connections
      const div = document.createElement('div');
      div.className = 'friend-card';
      div.innerHTML = `
        <div class="friend-avatar">👤</div>
        <div class="friend-info">
          <h4>${user}</h4>
          <p>Latest: DSA A (95%) - View Quizzes</p>
        </div>
        <button onclick="chatWith('${user}')">Chat</button>
      `;
      container.appendChild(div);
    }
  });
}

function addFriend() {
  const friendName = prompt('Enter friend username:');
  if (friendName && app.users[friendName]) {
    if (!app.users[app.currentUser].friends) app.users[app.currentUser].friends = [];
    app.users[app.currentUser].friends.push(friendName);
    localStorage.setItem('quizUsers', JSON.stringify(app.users));
    alert(`Connected with ${friendName}!`);
    renderSocial();
  }
}

function chatWith(user) {
  alert(`Chat with ${user} (expand with real-time messaging via WebSockets later)`);
}


function toggleAuth() {
    const btn = document.getElementById('loginBtn');
    const toggle = document.getElementById('toggleLink');
    if (btn.textContent === 'Login') {
        btn.textContent = 'Sign Up';
        toggle.innerHTML = 'Have account? <span>Login</span>';
    } else {
        btn.textContent = 'Login';
        toggle.innerHTML = "Don't have account? <span>Sign Up</span>";
    }
}

function renderSubjects() {
    const container = document.getElementById('subjects');
    const tech = Object.keys(questions).slice(0, 10);
    const nontech = Object.keys(questions).slice(10);
    
    container.innerHTML = '';
    
    tech.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'subject tech';
        div.innerHTML = `<h3>${subject}</h3><p>6 Modules • 60 Qs</p>`;
        div.onclick = () => showModules(subject);
        container.appendChild(div);
    });
    
    nontech.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'subject nontech';
        div.innerHTML = `<h3>${subject}</h3><p>6 Modules • 60 Qs</p>`;
        div.onclick = () => showModules(subject);
        container.appendChild(div);
    });
}

function showModules(subject) {
    app.quiz.subject = subject;
    document.getElementById('moduleTitle').textContent = subject;
    showScreen('modulesScreen');
    
    const container = document.getElementById('modules');
    container.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
        const div = document.createElement('div');
        div.className = 'module';
        div.innerHTML = `<h3>Module ${i}</h3><p>10 Questions</p>`;
        div.onclick = () => startQuiz(i);
        container.appendChild(div);
    }
}

function startQuiz(module) {
    app.quiz.module = module;
    app.quiz.question = 0;
    app.quiz.score = 0;
    showScreen('quizScreen');
    document.getElementById('quizTitle').textContent = `${app.quiz.subject} - Module ${module}`;
    nextQuestion();
}

function nextQuestion() {
    if (app.quiz.question >= 10) {
        showResults();
        return;
    }
    
    const qbank = questions[app.quiz.subject] || questions.DSA;
    const q = qbank[app.quiz.question];
    
    document.getElementById('question').textContent = q.q;
    
    const options = document.getElementById('options');
    options.innerHTML = '';
    
    q.o.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerHTML = `<strong>${String.fromCharCode(65+i)}.</strong> ${opt}`;
        div.onclick = () => selectAnswer(i, q.c);
        options.appendChild(div);
    });
    
    startTimer();
    updateProgress();
}

let timerInterval;
function startTimer() {
    app.quiz.time = 8;
    updateTimer();
    
    timerInterval = setInterval(() => {
        app.quiz.time--;
        updateTimer();
        if (app.quiz.time <= 0) {
            clearInterval(timerInterval);
            app.quiz.question++;
            nextQuestion();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = app.quiz.time.toString().padStart(2, '0');
}

function updateProgress() {
    const progress = ((app.quiz.question + 1) / 10) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function selectAnswer(selected, correct) {
    clearInterval(timerInterval);
    
    if (selected === correct) app.quiz.score++;
    
    setTimeout(() => {
        app.quiz.question++;
        nextQuestion();
    }, 800);
}

function showResults() {
    const percentage = Math.round((app.quiz.score / 10) * 100);
    const grade = percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : percentage >= 40 ? 'C' : 'D';
    
    document.getElementById('resultUser').textContent = app.currentUser;
    document.getElementById('resultSubject').textContent = app.quiz.subject;
    document.getElementById('resultModule').textContent = `Module ${app.quiz.module}`;
    document.getElementById('resultScore').textContent = `${app.quiz.score}/10 (${percentage}%)`;
    document.getElementById('grade').textContent = grade;
    document.getElementById('grade').className = `grade ${grade.toLowerCase()}`;
    
    // Save result
    app.users[app.currentUser].quizzes.push({
        subject: app.quiz.subject,
        module: app.quiz.module,
        score: percentage,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('quizUsers', JSON.stringify(app.users));
    
    showScreen('resultScreen');
}

function generateCertificate() {
    const percentage = Math.round((app.quiz.score / 10) * 100);
    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificate - ${app.currentUser}</title>
            <style>
                body { font-family: Arial; background: linear-gradient(45deg, #667eea, #764ba2); padding: 40px; text-align: center; }
                .cert { background: white; padding: 60px; border-radius: 20px; max-width: 600px; margin: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .ribbon { background: gold; color: #b8860b; padding: 15px 30px; border-radius: 30px; margin-bottom: 30px; display: inline-block; }
                .grade { font-size: 60px; font-weight: bold; margin: 30px 0; }
                .name { font-size: 32px; color: #2c3e50; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="cert">
                <div class="ribbon">🏆 CERTIFICATE 🏆</div>
                <h1>QuizMaster Pro</h1>
                <p style="font-size: 18px; margin-bottom: 30px;">This certifies that</p>
                <div class="name">${app.currentUser.toUpperCase()}</div>
                <p>completed ${app.quiz.subject} - Module ${app.quiz.module}</p>
                <div class="grade">Grade: ${percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C'}</div>
                <p>Score: ${app.quiz.score}/10 (${percentage}%)</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <button onclick="print()" style="background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 10px; margin-top: 30px; cursor: pointer;">Print Certificate</button>
            </div>
        </body>
        </html>
    `);
}
function generateCertificate() {
  const percentage = Math.round(app.quiz.score / 10 * 100);
  const grade = percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C';
  const win = window.open('', '_blank');
  win.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Certificate - ${app.currentUser}</title>
  <style>
    @page { size: A4; margin: 0; }
    body { font-family: 'Georgia', serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 40px; text-align: center; }
    .cert { background: white; padding: 60px; border-radius: 20px; max-width: 700px; margin: auto; box-shadow: 0 30px 60px rgba(0,0,0,0.2); position: relative; }
    .ribbon { background: linear-gradient(45deg, #ffd700, #ffed4a); color: #b8860b; padding: 20px 40px; border-radius: 50px; font-size: 24px; font-weight: bold; margin-bottom: 30px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
    .seal { position: absolute; top: 20px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, gold 40%, orange 70%, transparent 75%); border-radius: 50%; font-size: 40px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(255,215,0,0.5); }
    .grade { font-size: 80px; font-weight: bold; margin: 30px 0; background: linear-gradient(45deg, #48bb78, #38a169); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .name { font-size: 36px; color: #2d3748; margin: 20px 0; text-transform: uppercase; letter-spacing: 2px; }
    .details { font-size: 18px; color: #718096; margin: 20px 0; }
    button { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 15px 40px; border-radius: 50px; font-size: 16px; cursor: pointer; margin-top: 30px; }
    .watermark { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); opacity: 0.1; font-size: 100px; color: #667eea; font-style: italic; pointer-events: none; }
  </style>
</head>
<body>
  <div class="cert">
    <div class="seal">🏆</div>
    <div class="ribbon">CERTIFICATE OF ACHIEVEMENT</div>
    <h1>QuizMaster Pro</h1>
    <p style="font-size: 20px; margin-bottom: 30px;">This certifies that</p>
    <div class="name">${app.currentUser.toUpperCase()}</div>
    <p class="details">has successfully completed ${app.quiz.subject} - Module ${app.quiz.module}</p>
    <div class="grade">Grade: ${grade}</div>
    <p class="details">Score: ${app.quiz.score}/10 (${percentage}%)</p>
    <p class="details">Date: ${new Date().toLocaleDateString()}</p>
    <div class="watermark">QuizMaster Pro</div>
    <button onclick="window.print()">🖨️ Print Certificate</button>
  </div>
</body>
</html>`);
  win.document.close();
}


function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showDashboard() {
    renderSubjects();
    showScreen('dashboardScreen');
}

function logout() {
    app.currentUser = '';
    showScreen('authScreen');
}
// Enhanced social features
function showSocial() {
  renderSocial();
  showScreen('socialScreen');
}

// Update renderSocial for more interactivity
function renderSocial() {
  const container = document.getElementById('friendsList');
  container.innerHTML = `
    <div class="search-section">
      <input type="text" id="friendSearch" placeholder="🔍 Search users..." oninput="filterFriends()">
      <div class="stats">
        <span>Friends: <strong id="friendCount">0</strong></span>
        <span>Pending: <strong id="pendingCount">0</strong></span>
      </div>
    </div>
    <div class="leaderboard">
      <h3>🏆 Top Scorers</h3>
      <div id="leaderboardList"></div>
    </div>
    <div class="friends-section">
      <h3>Your Connections</h3>
      <div id="filteredFriends"></div>
    </div>
  `;
  loadFriends();
  renderLeaderboard();
}

// Filter/search friends
function filterFriends() {
  const query = document.getElementById('friendSearch').value.toLowerCase();
  const friends = document.getElementById('filteredFriends');
  friends.innerHTML = '';
  Object.keys(app.users).forEach(user => {
    if (user !== app.currentUser && user.toLowerCase().includes(query)) {
      const div = createFriendCard(user);
      friends.appendChild(div);
    }
  });
}

// Create friend card with achievements
function createFriendCard(user) {
  const bestScore = app.users[user].quizzes ? Math.max(...app.users[user].quizzes.map(q => q.score)) : 0;
  const div = document.createElement('div');
  div.className = 'friend-card';
  div.innerHTML = `
    <div class="friend-avatar">${user.charAt(0).toUpperCase()}</div>
    <div class="friend-info">
      <h4>${user} ${bestScore > 80 ? '🥇' : ''}</h4>
      <p>Best: ${Math.round(bestScore)}% | ${app.users[user].quizzes?.length || 0} quizzes</p>
    </div>
    <div class="friend-actions">
      <button onclick="sendRequest('${user}')" class="btn-small">Connect</button>
      <button onclick="viewProfile('${user}')" class="btn-small secondary">Profile</button>
    </div>
  `;
  return div;
}

// Load user's friends/requests
function loadFriends() {
  const userData = app.users[app.currentUser] || {};
  const friends = userData.friends || [];
  const friendCount = document.getElementById('friendCount');
  friendCount.textContent = friends.length;

  const filteredFriends = document.getElementById('filteredFriends');
  friends.forEach(user => {
    if (app.users[user]) {
      filteredFriends.appendChild(createFriendCard(user));
    }
  });
}

// Leaderboard from all users
function renderLeaderboard() {
  const scores = Object.keys(app.users).map(user => ({
    user,
    avg: app.users[user].quizzes ? app.users[user].quizzes.reduce((a, b) => a + b.score, 0) / app.users[user].quizzes.length : 0
  })).sort((a, b) => b.avg - a.avg).slice(0, 5);

  const list = document.getElementById('leaderboardList');
  list.innerHTML = scores.map((s, i) => `<div>${i+1}. ${s.user} - ${Math.round(s.avg)}%</div>`).join('');
}

// Friend request (simulate notification)
function sendRequest(user) {
  if (!app.users[app.currentUser].requests) app.users[app.currentUser].requests = [];
  app.users[app.currentUser].requests.push(user);
  localStorage.setItem('quizUsers', JSON.stringify(app.users));
  showNotification(`Request sent to ${user}!`);
}

// Profile view (modal-like)
function viewProfile(user) {
  alert(`Profile: ${user}\nQuizzes: ${app.users[user].quizzes?.length || 0}\nAchievements: Pro in DSA (view shared certs later)`);
}

// Notification toast
function showNotification(msg) {
  const toast = document.createElement('div');
  toast.className = 'notification';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

