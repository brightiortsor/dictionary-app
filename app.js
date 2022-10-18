const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let searchWord = document.getElementById("search-word").value;
  fetch(`${url}${searchWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
<div class="word">
          <h3>${searchWord}</h3>
          <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
        </div>

        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p class="phonie">${data[0].phonetics[1].text}</p>
        </div>
        <p class="meaning">${data[0].meanings[1].definitions[0].definition}</p>
        <p class="word-examp">${
          data[0].meanings[0].definitions[0].example || ""
        }</p>`;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find Word</h3>`;
    });
});

function playSound() {
  sound.play();
}
