// ================= ELEMENTS =================
const splash = document.getElementById("splash");
const main = document.getElementById("main");

const authCard = document.getElementById("authCard");
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

const signInTab = document.getElementById("signInTab");
const registerTab = document.getElementById("registerTab");

const lobby = document.getElementById("lobby");

const profileBtn = document.querySelector(".profile-btn"); // FIXED
const profilePage = document.getElementById("profilePage");
const profileEmail = document.getElementById("profileEmail");

// Messages
const errorMsgLogin = document.getElementById("loginError"); // MATCH HTML
const errorMsgReg = document.getElementById("registerError");

const userNameSpan = document.getElementById("userEmail");

// ================= DATA =================
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = localStorage.getItem("currentUser");

// ================= INIT =================
window.onload = () => {
  main.style.display = "flex";

  setTimeout(() => {
    splash.style.display = "none";

    if (currentUser) {
      showLobby();
    } else {
      authCard.classList.remove("hidden");
      switchTab("login");
    }
  }, 1500);
};

// ================= TAB SWITCH =================
function switchTab(tab) {
  clearMessages();

  if (tab === "login") {
    loginBox.style.display = "block";
    registerBox.style.display = "none";
    signInTab.classList.add("active");
    registerTab.classList.remove("active");
  } else {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
    signInTab.classList.remove("active");
    registerTab.classList.add("active");
  }
}

// ================= CLEAR MESSAGES =================
function clearMessages() {
  errorMsgLogin.innerText = "";
  errorMsgReg.innerText = "";
}

// ================= REGISTER =================
function register() {
  clearMessages();

  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value;
  const confirm = document.getElementById("regConfirm").value;

  if (!email || !pass || !confirm) {
    errorMsgReg.innerText = "All fields are required";
    return;
  }

  if (pass.length < 6) {
    errorMsgReg.innerText = "Password must be at least 6 characters";
    return;
  }

  if (pass !== confirm) {
    errorMsgReg.innerText = "Passwords do not match";
    return;
  }

  if (users.find(u => u.email === email)) {
    errorMsgReg.innerText = "Account already exists";
    return;
  }

  users.push({ email, pass });
  localStorage.setItem("users", JSON.stringify(users));

  errorMsgReg.style.color = "green";
  errorMsgReg.innerText = "Account created! Redirecting to Sign In...";

  setTimeout(() => {
    switchTab("login");
    document.getElementById("loginEmail").value = email;
    errorMsgLogin.style.color = "white";
    errorMsgLogin.innerText = "Please login with your account";
  }, 1000);
}

// ================= LOGIN =================
function login() {
  clearMessages();

  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPass").value;

  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) {
    errorMsgLogin.innerText = "Invalid email or password";
    return;
  }

  currentUser = email;
  localStorage.setItem("currentUser", currentUser);

  showLobby();
}

// ================= LOBBY =================
function showLobby() {
  authCard.classList.add("hidden");
  profilePage.classList.add("hidden");
  lobby.classList.remove("hidden");
  userNameSpan.innerText = currentUser;
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("currentUser");
  currentUser = null;

  lobby.classList.add("hidden");
  profilePage.classList.add("hidden");
  authCard.classList.remove("hidden");

  switchTab("login");
}

// ================= PROFILE =================
profileBtn.onclick = () => {
  if (!currentUser) {
    // Show login card instead of alert
    authCard.classList.remove("hidden");
    lobby.classList.add("hidden");
    profilePage.classList.add("hidden");

    switchTab("login");
    return;
  }

  authCard.classList.add("hidden");
  lobby.classList.add("hidden");
  profilePage.classList.remove("hidden");

  profileEmail.innerText = currentUser;
};

// ================= ROOMS =================
function createRoom() {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  alert("Room Created!\nRoom ID: " + roomId);
}

function joinRoom() {
  alert("Join Room coming soon!");
}

// ================= BACK FROM PROFILE =================
function backToLobby() {
  profilePage.classList.add("hidden");
  showLobby();
}
