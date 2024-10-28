const renderCards = async () => {
  const response = await fetch("http://localhost:3333/allCharacters");
  const characters = await response.json();
  console.log(characters);

  const cardContainer = document.getElementById("cardContainer");

  const card = document.createElement("div");
  card.className = "card";
  cardContainer.appendChild(card);

  const img = document.createElement("img");
  img.className = "img";
  img.src =
    "https://i.pinimg.com/564x/dc/eb/9d/dceb9d37b7f174925b3e0a562191e07b.jpg";
  card.appendChild(img);

  const nameContainer = document.createElement("div");
  nameContainer.className = "nameContainer";
  card.appendChild(nameContainer);

  const personName = document.createElement("p");
  personName.className = "name";
  personName.textContent = "Yuji Itadori";
  nameContainer.appendChild(personName);
};

await renderCards();
