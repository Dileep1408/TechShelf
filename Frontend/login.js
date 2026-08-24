const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("password").value;

  const loginMessage = document.getElementById("login-message");

  loginMessage.textContent = "Logging in...";

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      loginMessage.textContent = data.message || "Invalid username or password";

      return;
    }

    // Store JWT
    localStorage.setItem("techshelfToken", data.token);

    // Store member information
    localStorage.setItem("techshelfMember", JSON.stringify(data.member));

    loginMessage.textContent = "Login successful!";

    // Go to member portal
    window.location.href = "member.html";
  } catch (error) {
    console.error("Login error:", error);

    loginMessage.textContent = "Unable to connect to the server.";
  }
});
