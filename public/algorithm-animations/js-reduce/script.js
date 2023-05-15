/* script.js */

let array = [1, 2, 3, 4, 5];
let startButton = document.querySelector("#startButton");
let userArrayButton = document.querySelector("#userArrayButton");

// Function to animate and show reduce process
async function animateReduce() {
  // Clear containers
  document.querySelector("#arrayContainer").innerHTML = "";
  document.querySelector("#accumulatorContainer").innerHTML = "Accumulator: 0";
  document.querySelector("#currentValueContainer").innerHTML = "";
  document.querySelector("#remainingArrayContainer").innerHTML = "";
  document.querySelector("#jsCode").innerHTML = "";

  let accumulator = 0;

  // Set JS code and description
  let jsCode = `
    The reduce() method in JavaScript reduces the array to a single value.
    It executes a provided function for each value of the array (from left-to-right).
    The return value of the function is stored in an accumulator.

    Here's the code that calculates the sum of an array:

    let array = [1, 2, 3, 4, 5];
    let sum = array.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    console.log(sum); // Outputs: 15
  `;
  document.querySelector("#jsCode").textContent = jsCode;
  Prism.highlightElement(document.querySelector("#jsCode"));

  for (let i = 0; i < array.length; i++) {
    let currentValue = array[i];

    // Display remaining elements in the array
    let remainingArray = array.slice(i);
    document.querySelector("#remainingArrayContainer").textContent =
      "Remaining Array: [" + remainingArray.join(", ") + "]";

    // Display currentValue in its container
    let arrayItem = document.createElement("div");
    arrayItem.textContent = currentValue;
    arrayItem.className = "array-item";
    document.querySelector("#arrayContainer").appendChild(arrayItem);

    // Update current value
    document.querySelector("#currentValueContainer").textContent =
      "Current Value: " + currentValue;

    // Use Anime.js to animate elements
    await anime({
      targets: arrayItem,
      translateX: 250,
      duration: 1000,
      easing: "easeInOutSine",
    }).finished;

    // Update accumulator
    accumulator += currentValue;
    document.querySelector("#accumulatorContainer").textContent =
      "Accumulator: " + accumulator;
  }
}

startButton.addEventListener("click", animateReduce);

userArrayButton.addEventListener("click", () => {
  let userArray = document
    .querySelector("#userArray")
    .value.split(",")
    .map(Number);

  // Check if the user's input is a valid array of numbers
  if (userArray.some(isNaN)) {
    alert("Please enter a valid array of numbers, separated by commas.");
  } else {
    array = userArray;
    animateReduce();
  }
});

let arrayMax = [1, 2, 42, 4, 5];
let startButtonMax = document.querySelector("#startButtonMax");
let userArrayButtonMax = document.querySelector("#userArrayButtonMax");

// Function to animate and show reduce process for max
async function animateReduceMax() {
  // Clear containers
  document.querySelector("#arrayContainerMax").innerHTML = "";
  document.querySelector("#maxContainer").innerHTML = "Maximum: -Infinity";
  document.querySelector("#jsCodeMax").innerHTML = "";

  let max = -Infinity;

  // Set JS code and description
  let jsCodeMax = `
    The reduce() method in JavaScript can also be used to find the maximum value 
    in an array.
    
    Here's the code that does this:

    let array = [1, 2, 42, 4, 5];
    let max = array.reduce((accumulator, currentValue) => {
      return Math.max(accumulator, currentValue);
    }, -Infinity);
    console.log(max); // Outputs: 5
  `;
  document.querySelector("#jsCodeMax").textContent = jsCodeMax;
  Prism.highlightElement(document.querySelector("#jsCodeMax"));

  for (let i = 0; i < arrayMax.length; i++) {
    let currentValue = arrayMax[i];

    // Display currentValue in its container
    let arrayItemMax = document.createElement("div");
    arrayItemMax.textContent = currentValue;
    arrayItemMax.className = "array-item";
    document.querySelector("#arrayContainerMax").appendChild(arrayItemMax);

    // Use Anime.js to animate elements
    await anime({
      targets: arrayItemMax,
      translateX: 250, // Changed from translateY to translateX
      duration: 1000,
      easing: "easeInOutSine",
      complete: function (anime) {
        if (max > currentValue) {
          arrayItemMax.classList.add("processed-item");
        } else {
          if (max !== -Infinity) {
            let maxElement = document.querySelector(".max-item");
            maxElement.classList.add("processed-item");
            maxElement.classList.remove("max-item");
          }
          arrayItemMax.classList.remove("processed-item");
          arrayItemMax.classList.add("max-item");
        }
      },
    }).finished;

    // Update max
    max = Math.max(max, currentValue);
    document.querySelector("#maxContainer").textContent = "Maximum: " + max;
  }
}

startButtonMax.addEventListener("click", animateReduceMax);

userArrayButtonMax.addEventListener("click", () => {
  let userArrayMaxValue = document.querySelector("#userArrayMax").value;
  if (userArrayMaxValue) {
    arrayMax = userArrayMaxValue.split(",").map(Number);
    animateReduceMax();
  }
});
