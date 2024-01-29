const startButton = document.getElementById("startButton");
const inputArea = document.getElementById("input");
const quoteDisplay = document.getElementById("quote");
const timerDisplay = document.getElementById("timer");
const timeDurationSelect = document.getElementById("timeDuration");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let startTime, endTime, timeInterval, timer, timeLeft;
let quote = "";

const quotes = [
  // Add your quotes here
  "Once on a time there was a Little Old Woman who lived in a Shoe. This shoe stood near a great forest, and But the Little Old Woman was very fond of her children, and they only thought of the best way to please her Once on a time there was a Little Old Woman who lived in a Shoe.",
  "Now this Little Old Woman had not always lived in a Shoe. She and her family had once dwelt in a nice house and as the father did not return, the Old Lady and her family went to search for him. When tTheir mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be kill They were now quite ready;",
  "after which he carried off the poor wood-cutter to his castle beyond the forest. When the Little Old Woman Night came on, and as the father did not return, the Old Lady and her family went to search for him. When they Their mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be kill They were now quite ready;",
  "So Peter and Strong-arm put a roof to it, and cut a door, and turned it into a dwelling. Here they all live They were now quite ready; Strong-arm gave the order to march, and they started for the forest. The next day Their mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be kill They were now quite ready;",
  "Their mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be kill They were now quite ready; Strong-arm gave the order to march, and they started for the forest. The next day Their mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be kill They were now quite ready;",
  "Strong-arm then walked boldly across the court-yard, and presently met a page, who took off his hat and ask  Strong-arm gave the order to march, and they started for the forest. The next day they decided to go out Their mother knew the Giant's strength, and would not hear of the attempt, as she feared they would be kill They were now quite ready;"
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateResults() {
  const userText = inputArea.value.trim();
  const userWords = userText.split(/\s+/);
  const quoteWords = quote.trim().split(/\s+/);

  let resultHtml = "";
  quoteWords.forEach((word, index) => {
    if (userWords[index] === word) {
      resultHtml += `<span class="correct">${word}</span>`;
    } else {
      resultHtml += `<span class="incorrect">${word}</span>`;
    }
    resultHtml += " ";
  });

  quoteDisplay.innerHTML = resultHtml;
}

function startTest() {
  const selectedTimeDuration = parseInt(timeDurationSelect.value, 10);
  
  startButton.disabled = true;
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  quote = getRandomQuote();
  updateResults();
  startTime = new Date().getTime();
  timeLeft = selectedTimeDuration;
  timerDisplay.textContent = timeLeft;

  timeInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      endTest();
    } else {
      timerDisplay.textContent = timeLeft;
    }
  }, 1000);
}

function endTest() {
  endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;
  const userText = inputArea.value;
  const wordCount = userText.trim().split(/\s+/).length;
  const typingSpeedWPM = Math.round((wordCount / totalTime) * 60);
  const accuracy = calculateAccuracy(quote, userText);
  clearInterval(timeInterval);
  wpmDisplay.textContent = typingSpeedWPM;
  accuracyDisplay.textContent = `${accuracy}%`;
  inputArea.disabled = true;
  inputArea.value = "";
  startButton.disabled = false;
}

function calculateAccuracy(original, input) {
  const originalWords = original.trim().split(/\s+/);
  const inputWords = input.trim().split(/\s+/);
  let correctCount = 0;

  originalWords.forEach((word, index) => {
    if (inputWords[index] === word) {
      correctCount++;
    }
  });

  return Math.round((correctCount / originalWords.length) * 100);
}

startButton.addEventListener("click", startTest);
inputArea.addEventListener("input", updateResults);
timeDurationSelect.addEventListener("change", () => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
  startTest();
});
