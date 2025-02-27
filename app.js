const btn = document.querySelector(".btn-search");
const form = document.querySelector("form");

const search = document.querySelector(".search");

let word = "";

const wordSp = document.querySelector(".word-sp");

const result = document.querySelector(".result-con");

const phonetics = document.querySelector(".phonetics");

const meaning = document.querySelector(".meaning");

const example = document.querySelector(".example");

const sound = document.querySelector(".sound");
const soundBtn = document.querySelector(".sound-btn");

search.addEventListener("input",()=>{
   word = search.value;
});

async function getWord() {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    wordSp.textContent = data[0].word;
    phonetics.textContent = data[0].phonetics[1].text || "Phonetic not available";
    meaning.textContent = data[0].meanings[0].definitions[0].definition;
    example.textContent = data[0].meanings[0].definitions[0].example || "No example available";
    const audioUrl = data[0].phonetics[1].audio ;
    if(audioUrl){
      sound.src = audioUrl;
      soundBtn.disabled = false;
    }else {
      soundBtn.disabled = true; 
      console.log("No audio available for this word.");
    }
  } catch (error) {
    console.log(error);
  }
}


soundBtn.addEventListener("click", () => {
  sound.play();
});


btn.addEventListener("click",(e)=>{
  e.preventDefault();
  getWord();
  result.classList.add("active");
})
