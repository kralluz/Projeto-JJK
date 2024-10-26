const renderCards = async () => {
    try {
      const response = await fetch("http://localhost:3333/");
      const characters = await response.json();
  
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = ""; // Limpa qualquer conteúdo existente
  
      characters.forEach((character) => {
        const card = document.createElement("div");
        card.className = "card";
        cardContainer.appendChild(card);
  
        const img = document.createElement("img");
        img.className = "img";
        img.src = character.imageUrl; // Usa a URL da imagem do personagem
        card.appendChild(img);
  
        const nameContainer = document.createElement("div");
        nameContainer.className = "nameContainer";
        card.appendChild(nameContainer);
  
        const personName = document.createElement("p");
        personName.className = "name";
        personName.textContent = character.name; // Usa o nome do personagem
        nameContainer.appendChild(personName);
      });
    } catch (error) {
      console.error("Erro ao buscar os personagens:", error);
    }
  };
  
  await renderCards();
  