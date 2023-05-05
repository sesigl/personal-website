// script.js
const pushButton = document.getElementById('push');
const popButton = document.getElementById('pop');
const arrayContainer = document.querySelector('.array');

let array = [];

pushButton.addEventListener('click', () => {
  const element = document.createElement('div');
  element.classList.add('array-element');
  element.textContent = array.length + 1;
  arrayContainer.appendChild(element);

  // Anime.js push animation
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [-20, 0],
    easing: 'easeOutCubic',
    duration: 300,
  });

  array.push(element);

  if (array.length > 0) {
    popButton.disabled = false;
  }
});

popButton.addEventListener('click', () => {
  if (array.length > 0) {
    const element = array.pop();

    // Anime.js pop animation
    anime({
      targets: element,
      opacity: [1, 0],
      translateY: [0, -20],
      easing: 'easeInCubic',
      duration: 300,
      complete: () => {
        element.remove();
      },
    });

    if (array.length === 0) {
      popButton.disabled = true;
    }
  }
});
