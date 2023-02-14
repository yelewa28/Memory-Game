document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Whats Your Name?");

  if (yourName == "" || yourName == null) {
    document.querySelector(".name span").textContent = "Unknown";
  } else {
    document.querySelector(".name span").textContent = yourName;
  }
  document.querySelector(".control-buttons").remove();
  startGame();
};
let duration = 1000;

let blockContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];

orderRange.sort(() => Math.random() - 0.5); // shuffle Ways Two

blocks.forEach(function (block, index) {
  block.style.cssText = `order: ${orderRange[index] + 1};`;

  block.addEventListener("click", function () {
    flipBlock(block);
    endGame();
  });
});

// flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  // collect flipped block
  let allFlippedBlock = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlock.length === 2) {
    // stop click function
    stopClick();

    // check matched block function
    matchedBlocks(allFlippedBlock[0], allFlippedBlock[1]);
  }
}

function stopClick() {
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

function matchedBlocks(firstBlock, lastBlock) {
  let tries = document.querySelector(".tries span");
  if (firstBlock.dataset.tech === lastBlock.dataset.tech) {
    firstBlock.classList.remove("is-flipped");
    lastBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    lastBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      lastBlock.classList.remove("is-flipped");
      tries.innerHTML++;
      document.getElementById("failed").play();
    }, duration);
  }
}

// End Game Function
function endGame() {
  let allMatched = blocks.filter((matchBlock) =>
    matchBlock.classList.contains("has-match")
  );
  if (allMatched.length === blocks.length) {
    setTimeout(() => {
      let span = document.createElement("span");
      span.classList.add("end-game");
      span.textContent = "Congratulations";
      document.body.appendChild(span);
      setTimeout(() => {
        window.location.reload();
      }, duration * 2);
    }, duration);
  }
}

// start Game Function
function startGame() {
  blocks.forEach(function (block) {
    block.classList.add("is-flipped");
    setTimeout(() => {
      block.classList.remove("is-flipped");
    }, duration * 2);
  });
}
