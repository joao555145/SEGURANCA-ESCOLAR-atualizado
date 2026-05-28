// login.js

let USERS = [
  {
    email: "00001110841085sp@al.educacao.sp.gov.br",
    hash: "6d82395823e0c59c8481f029ba5226e7d0f5242b64e337420d1e37a4eee0e1be"
  }
];

try {

  const stored = localStorage.getItem("USERS");

  if (stored) {

    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
      USERS = parsed;
    }
  }

} catch (err) {

  console.warn("Erro ao ler USERS:", err);

}

async function hashPassword(password) {

  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

}

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const msgEl = document.getElementById("msg");

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document
      .getElementById("email")
      .value
      .trim();

    const password = document
      .getElementById("pwd")
      .value;

    const hashedPassword = await hashPassword(password);

    const user = USERS.find(
      u =>
        u.email === email &&
        u.hash === hashedPassword
    );

    if (user) {

      localStorage.setItem(
        "authenticated",
        "true"
      );

      localStorage.setItem(
        "auth_email",
        email
      );

      window.location.href = "index.html";

    } else {

      msgEl.style.display = "block";

      msgEl.textContent =
        "E-mail ou senha incorretos.";

    }

  });

});