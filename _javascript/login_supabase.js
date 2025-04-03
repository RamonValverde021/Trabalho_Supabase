const supabase = window.supabase.createClient(
    "https://yfslzbsaazkvofzjbkyk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlmc2x6YnNhYXprdm9mempia3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDk1OTMsImV4cCI6MjA1OTA4NTU5M30.jlxk0LcLeuF60iV540i0eHHCrf43MIYXTTSKfTOCM-s"
  );
  
  async function login() {
    console.log("Tentando fazer login...");
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
  
    if (!email || !senha) {
      document.getElementById("mensagem").innerText =
        "Preencha todos os campos!";
      return;
    }
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
  
    if (error) {
      document.getElementById("mensagem").innerText =
        "Erro: " + error.message;
    } else {
      document.getElementById("mensagem").innerText =
        "Login realizado com sucesso!";
      localStorage.setItem("usuarioEmail", email);
      setTimeout(() => {
        window.location.href = "bem-vindo.html";
      }, 2000);
    }
  }
  
  async function cadastrar() {
    console.log("Tentando cadastrar...");
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
  
    if (!email || !senha) {
      document.getElementById("mensagem").innerText =
        "Preencha todos os campos!";
      return;
    }
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });
  
    if (error) {
      document.getElementById("mensagem").innerText =
        "Erro: " + error.message;
    } else {
      document.getElementById("mensagem").innerText =
        "Cadastro realizado com sucesso!";
    }
  }