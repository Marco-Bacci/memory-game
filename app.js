import cardlist from "./cardlist.js";
const board = document.querySelector(".board");
const message = document.querySelector(".message");
const playBtn = document.querySelector(".btn");

const cards = [...cardlist, ...cardlist]
  .sort(() => Math.random() - 0.5)
  .map((card) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.name = card.dataName;
    div.innerHTML = `
  <div class="frontside">
    <img class="polaroid-frame" src="img/front.png" alt="frame" />
    <img class="polaroid-img" src="${card.img}" alt="${card.dataName}" />
  </div>
  <img class="backside" src="img/back.png" alt="back" />
`;
    div.addEventListener("click", flipCard);
    board.appendChild(div);
    return div;
  });

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (firstCard === this) return;

  this.classList.toggle("flip");

  if (!hasFlipped) {
    // first click
    hasFlipped = true;
    firstCard = this;
    return;
  } else {
    // second click
    hasFlipped = false;
    secondCard = this;

    // do cards match?
    CheckForMatch();
  }
}
function CheckForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  const flippedCards = document.querySelectorAll(".card.flip");
  if (flippedCards.length === cards.length) {
    message.style.display = "block";
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlipped, lockBoard, firstCard, secondCard] = [false, false, null, null];
}

playBtn.addEventListener("click", () => {
  location.reload();
  message.style.display = "none";
});
