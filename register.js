  // register-js

  async function hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    }
    
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("registerForm");
      const msg = document.getElementById("msg");
    
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = (document.getElementById("email").value || "").trim();
        const password = document.getElementById("password").value || "";
    
        if (!email || !password) {
          msg.textContent = "Preencha email e senha.";
          return;
        }
    
        const hash = await hashPassword(password);
    
        // carrega lista existente
        let users = [];
        try {
          const raw = localStorage.getItem("USERS");
          users = raw ? JSON.parse(raw) : [];
        } catch (err) {
          console.warn("Erro ao ler USERS:", err);
          users = [];
        }
    
        // atualiza ou adiciona
        const idx = users.findIndex(u => u.email === email);
        if (idx >= 0) {
          users[idx].hash = hash;
        } else {
          users.push({ email, hash });
        }
    
        localStorage.setItem("USERS", JSON.stringify(users));
        msg.style.color = "green";
        msg.textContent = "Usuário salvo com sucesso! Você já pode usar esse e-mail e senha no login.";
        form.reset();
      });
    });
    