const typingText = document.querySelector('.typing-text');
const words = ['Software Engineer', 'Backend Developer', 'Fullstack Developer', 'Web Developer'];
let wordIndex = 0;
let charIndex = 0;
let isTyping = true;

function type() {
  if (isTyping) {
    if (charIndex < words[wordIndex].length) {
      typingText.textContent = words[wordIndex].slice(0, charIndex + 1);
      charIndex++;
      setTimeout(type, 50);
    } else {
      isTyping = false;
      setTimeout(() => {
        erase();
      }, 2000);
    }
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = words[wordIndex].slice(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    isTyping = true;
    charIndex = 0;
    type();
  }
}

type();