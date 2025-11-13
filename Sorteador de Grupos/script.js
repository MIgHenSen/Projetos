function fecharPopup() {
      document.getElementById("popup").style.display = "none";
    }

    function sortearGrupos() {
      const nomesInput = document.getElementById("nomes").value.trim();
      const lideresInput = document.getElementById("lideres").value.trim();
      const resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML = "";

      if (!nomesInput || !lideresInput) {
        resultadoDiv.innerHTML = "<p style='color:red;'>Preencha todos os campos corretamente!</p>";
        return;
      }

      let lista = nomesInput.split(/[\n,]+/).map(n => n.trim()).filter(n => n !== "");
      let lideres = lideresInput.split(/[\n,]+/).map(n => n.trim()).filter(n => n !== "");
      const numGrupos = lideres.length;

      if (numGrupos === 0) {
        resultadoDiv.innerHTML = "<p style='color:red;'>É necessário pelo menos um líder!</p>";
        return;
      }

      // Remover líderes da lista de participantes para não duplicar
      lista = lista.filter(n => !lideres.includes(n));

      // Embaralhar lista (Fisher-Yates)
      for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
      }

      let grupos = Array.from({length: numGrupos}, (_, i) => [lideres[i] + " (Líder)"]);

      // Distribuir membros restantes
      lista.forEach((p, index) => {
        grupos[index % numGrupos].push(p);
      });

      // Mostrar os grupos
      resultadoDiv.innerHTML = "<h3>Resultado final:</h3>";
      grupos.forEach((grupo, index) => {
        let divGrupo = document.createElement("div");
        divGrupo.className = "grupo";
        divGrupo.innerHTML = `<strong>Grupo ${index + 1}:</strong> <br> ${grupo.join(", ")}`;
        resultadoDiv.appendChild(divGrupo);
      });
    }