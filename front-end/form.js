function enviarform() {
      let senha = document.getElementById('senha').value;
      let confirmasenha = document.getElementById('confirmasenha').value;
      let Nome = document.getElementById('nome').value;
      let email = document.getElementById('email').value;
      let nascimento = document.getElementById('nascimento').value;
      let pais = document.getElementById('pais').value;

      if(Nome.length < 3){
        alert("Nome Invalido");
        return;
      }

      if(!email.includes ('@') || !email.endsWith('.com')){
        alert("Email inválido");
        return;
      }

      if (senha !== confirmasenha) {
        alert("As senhas não são iguais!");
        return;
      }
ç
      if(senha.length < 8){
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
      }

      if (!nascimento) {
        alert("Por favor, insira sua data de nascimento.");
        return;
      }

      if (!pais) {
        alert("Por favor, selecione seu país.");
        return;
      }

      const hoje = new Date();
      const nascimentoDate = new Date(nascimento);
      let idade = hoje.getFullYear() - nascimentoDate.getFullYear();
      const m = hoje.getMonth() - nascimentoDate.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nascimentoDate.getDate())) {
        idade--;
      }
      if (idade < 18) {
        alert("Você deve ter pelo menos 18 anos.");
        return;
      }




      const form = document.getElementById("usuario-form");
      const dados = {};
      const formData = new FormData(form);

      formData.forEach((value, key) => {
        if (dados[key]) {
          if (!Array.isArray(dados[key])) {
            dados[key] = [dados[key]];
          }
          dados[key].push(value);
        } else {
          dados[key] = value;
        }
      });

      // Enviar para o backend
      fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: dados.nome,
          email: dados.email,
          senha: dados.senha
        })
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById("resultado").textContent = JSON.stringify(data, null, 2);
        alert("Formulário enviado com sucesso!");
      })
      .catch(error => {
        alert("Erro ao enviar formulário: " + error);
      });
    }