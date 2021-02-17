// Get Elements
const $keyboard = document.getElementById("keyboard")
const $header = document.getElementById("top")
const $language = document.getElementById("language")
const $audioTag = document.getElementById("audio")
const $container = document.querySelector(".container")
const $startBTN = document.querySelector(".start-game")
const $body = document.body
// Constants
const letters = [
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
  "ק",
  "ר",
  "ש",
  "ת",
]

const sounds = {
  wrong: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3",
  correct:
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3",
  1: {
    where: "./sounds/where.ogg",
    א: "./sounds/alef.ogg",
    ב: "./sounds/bet.ogg",
    ג: "./sounds/gimel.ogg",
    ד: "./sounds/daled.ogg",
    ה: "./sounds/hey.ogg",
    ו: "./sounds/vav.ogg",
    ז: "./sounds/zain.ogg",
    ח: "./sounds/chet.ogg",
    ט: "./sounds/tet.ogg",
    י: "./sounds/yud.ogg",
    כ: "./sounds/kaf.ogg",
    ל: "./sounds/lamed.ogg",
    מ: "./sounds/mem.ogg",
    נ: "./sounds/noon.ogg",
    ס: "./sounds/samech.ogg",
    ע: "./sounds/ayin.ogg",
    פ: "./sounds/pay.ogg",
    צ: "./sounds/tzadi.ogg",
    ק: "./sounds/kuf.ogg",
    ר: "./sounds/resh.ogg",
    ש: "./sounds/shin.ogg",
    ת: "./sounds/taf.ogg",
  },
  2: {
    where: "./sounds/where.ogg",
    א: "./sounds/alef.ogg",
    ב: "./sounds/bet.ogg",
    ג: "./sounds/gimel.ogg",
    ד: "./sounds/daled.ogg",
    ה: "./sounds/hey.ogg",
    ו: "./sounds/vav.ogg",
    ז: "./sounds/zain.ogg",
    ח: "./sounds/chet.ogg",
    ט: "./sounds/tet.ogg",
    י: "./sounds/yud.ogg",
    כ: "./sounds/kaf.ogg",
    ל: "./sounds/lamed.ogg",
    מ: "./sounds/mem.ogg",
    נ: "./sounds/noon.ogg",
    ס: "./sounds/samech.ogg",
    ע: "./sounds/ayin.ogg",
    פ: "./sounds/pay.ogg",
    צ: "./sounds/tzadi.ogg",
    ק: "./sounds/kuf.ogg",
    ר: "./sounds/resh.ogg",
    ש: "./sounds/shin.ogg",
    ת: "./sounds/taf.ogg",
  },
}
const colors = [
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "vaiolet",
  "white",
  "crimson",
  "cornflowerblue",
  "deeppink",
  "deepskyblue",
  "black",
]

// Play selected sounds
const playSound = (selectedLang, sound) => {
  console.log(sound)
  $audioTag.src = sounds[selectedLang][sound]
  $audioTag.play()
}
const playSounds = (number) => {
  console.log($language.value)
  playSound($language.value, "where")

  setTimeout(() => {
    playSound($language.value, number)
  }, 1750)
}
// Start The Game
const startTheGame = ($event) => {
  const isStartButton = $event.target.localName === "button"
  if (isStartButton) {
    const conrrectAnswer = $keyboard.dataset.answer
    return playSounds(conrrectAnswer)
  }
}
// Select an Answer
const selectAnswer = ($event) => {
  const isLiElement = $event.target.localName === "li"
  const isReplay = $event.target.dataset.id === "replay"
  if (!isLiElement) {
    return false
  }

  const currentSelectedAnswer = $event.target.dataset.id
  const correctAnswer = $keyboard.dataset.answer

  if (isReplay) {
    return playSounds(correctAnswer)
  }
  console.log("S", currentSelectedAnswer, "C", correctAnswer)

  if (currentSelectedAnswer === correctAnswer) {
    // $container.classList.add("green-background")
    $body.classList.add("green-background")
    $audioTag.src = sounds.correct
    $audioTag.play()

    setTimeout(() => {
      $body.classList.remove("green-background")
      createBoard()
    }, 1000)
  } else {
    $container.classList.add("red-background")

    $audioTag.src = sounds.wrong
    $audioTag.play()

    setTimeout(() => {
      playSounds(correctAnswer)
      $container.classList.remove("red-background")
    }, 1300)
  }
}
// Shuffle numbers
function shuffle(numberArray, letters) {
  if ($language.value === "1") {
    console.log(letters)
    return letters
  }
  let counter = numberArray.length
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--
    let temp = numberArray[counter]
    numberArray[counter] = numberArray[index]
    numberArray[index] = temp
  }
  return numberArray
}
// const  = () => {

// }

// Create Board
const createBoard = () => {
  $keyboard.innerHTML = ""
  $header.innerHTML = ""
  const random = Math.floor(Math.random() * 22)
  // const randomColor = Math.floor(Math.random() * 7)
  // console.log(random)

  $keyboard.dataset.answer = letters[random]

  // $keyboard.dataset.numAnswer = random
  playSounds(letters[random])

  let templetters = [...letters]

  const randomLetter = shuffle(templetters, letters)

  randomLetter.forEach((letter) => {
    const liElement = document.createElement("li")
    liElement.classList.add(colors[Math.floor(Math.random() * 13)])
    liElement.innerText = letter
    liElement.dataset.id = letter
    $keyboard.appendChild(liElement)
  })
  const rePlay = document.createElement("li")
  rePlay.classList.add("replay")
  rePlay.dataset.id = "replay"
  rePlay.innerHTML = "שמע שוב את השאלה"
  $keyboard.appendChild(rePlay)

  const playButton = document.createElement("BUTTON")
  playButton.classList.add("start-game")
  // playButton.classList.add("mover")
  playButton.dataset.id = "start-game"
  // playButton.innerHTML = "התחל משחק"
  $header.appendChild(playButton)
}
createBoard()

// Create audio element
const audioTag = document.createElement("audio")
audioTag.type = "audio/ogg"
audioTag.id = "audio"
document.body.appendChild(audioTag)
const audio = document.createElement("audio")

// Event listeners
$keyboard.addEventListener("click", selectAnswer)
$header.addEventListener("click", startTheGame)
$language.addEventListener("change", shuffle)
