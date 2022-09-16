let items = document.querySelectorAll(".game-item");
let allFront = document.querySelectorAll(".back h2");
let button = document.querySelector("button");
let overlay = document.querySelector(".overlay");
let allTries = document.querySelector(".all-tries");
let wrongTries = document.querySelector(".wrong");

let possibleCardFaces = [
  { data: "laugh", val: "&#x1F602;" },
  { data: "cool", val: "&#x1F60E;" },
  { data: "love", val: "&#x1F60D;" },
  { data: "crazy", val: "&#x1F61C;" },
  { data: "nerd", val: "&#x1F913;" },
  { data: "smile", val: "&#x1F643;" },
  { data: "laugh", val: "&#x1F602;" },
  { data: "cool", val: "&#x1F60E;" },
  { data: "love", val: "&#x1F60D;" },
  { data: "crazy", val: "&#x1F61C;" },
  { data: "nerd", val: "&#x1F913;" },
  { data: "smile", val: "&#x1F643;" },
];
let win = 0;
let wrongTry = 0;
let allTry = 0;
// set  array for random IDS for card game div
function game() {
  let selectedInds = [];
  while (selectedInds.length <= 11) {
    let emojiInd = Math.floor(Math.random() * 12);

    if (selectedInds.length === 0) {
      selectedInds.push(emojiInd);
    } else if (selectedInds.length > 0) {
      if (selectedInds.indexOf(emojiInd) >= 0) {
        continue;
      } else {
        selectedInds.push(emojiInd);
      }
    }
  }
  addEmojiAndData();

  // assign random value value for H2
  function addEmojiAndData() {
    allFront.forEach((h2, key) => {
      h2.innerHTML = possibleCardFaces[selectedInds[key]].val;
    });
    items.forEach((item, key) => {
      item.dataset.emoji = possibleCardFaces[selectedInds[key]].data;
    });
  }

  //game
  let arr = [];

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.currentTarget.classList.add("rotate");
      e.currentTarget.style.pointerEvents = "none";
      arr.push(e.currentTarget.dataset.emoji);
      if (arr.length === 2) {
        if (arr[0] == arr[1]) {
          win++;
          allTry++;
          items.forEach((item) => {
            item.style.pointerEvents = "none";
            if (item.dataset.emoji == arr[0]) {
              setTimeout(() => {
                item.classList.add("correct");
              }, 500);
            } else {
              item.style.pointerEvents = "all";
            }
          });
          arr = [];
        }
      }
      if (arr.length === 2) {
        if (arr[0] !== arr[1]) {
          wrongTry++;
          allTry++;
          items.forEach((item) => {
            item.style.pointerEvents = "none";
            setTimeout(() => {
              item.style.pointerEvents = "all";
              item.classList.remove("rotate");
            }, 500);
          });
          arr = [];
        }
      }
      allTries.children[1].innerHTML = allTry;
      wrongTries.children[1].innerHTML = wrongTry;

      if (win == 6) {
        setTimeout(() => {
          overlay.classList.add("visible");
        }, 1000);
      }
    });
  });
}
button.addEventListener("click", (e) => {
  overlay.classList.remove("visible");
  allTry = 0;
  wrongTry = 0;
  allTries.children[1].innerHTML = allTry;
  wrongTries.children[1].innerHTML = wrongTry;
  items.forEach((item) => {
    item.classList.remove("rotate");
    item.classList.remove("correct");
  });
  win = 0;
  game();
});
game();
