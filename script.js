let isLoginMode = true;

function toggleForm() {
  isLoginMode = !isLoginMode;
  document.getElementById("form-title").textContent = isLoginMode ? "Login" : "Register";
  document.getElementById("submitBtn").textContent = isLoginMode ? "Login" : "Register";
  document.getElementById("toggleForm").innerHTML = isLoginMode
    ? `Don't have an account? <a href="#" onclick="toggleForm()">Register</a>`
    : `Already have an account? <a href="#" onclick="toggleForm()">Login</a>`;
  document.getElementById("message").textContent = "";
}

document.getElementById("authForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.textContent = "Please fill all fields!";
    return;
  }

  if (isLoginMode) {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => window.location.href = "home.html", 1000);
    } else {
      message.style.color = "red";
      message.textContent = "Invalid username or password!";
    }
  } else {
    if (localStorage.getItem(username)) {
      message.textContent = "Username already exists!";
    } else {
      localStorage.setItem(username, password);
      message.style.color = "green";
      message.textContent = "Registration successful! Please login.";
      toggleForm();
    }
  }
});
