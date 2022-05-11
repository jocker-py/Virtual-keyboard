/* eslint-disable no-use-before-define */
/* eslint-disable no-continue */
/* eslint-disable no-loop-func */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-syntax */
import {
  EnKeyboard, RuKeyboard, letters, code,
} from './data.js';

let keyboardKey;
let buttonPress;
let first;
let second;
let board;
let language;
let main;
let additional;

if (localStorage.getItem('language') === 'false') {
  language = false;
} else {
  language = true;
}

const pressedKeys = [];
const body = document.querySelector('body');
const content = document.createElement('div');
const wrapper = document.createElement('div');
const container = document.createElement('div');
const keyboard = document.createElement('div');
const textarea = document.createElement('textarea');
const shift = document.createElement('div');
const alt = document.createElement('div');
const description = document.createElement('span');
const inform = document.createElement('div');
const title = document.createElement('h1');
const subtitle = document.createElement('h5');
const keyboardtitle = document.createElement('div');
const popUp = document.createElement('div');
const flag = document.createElement('img');
const lang = document.createElement('h3');

popUp.className = 'keyboard__popUp';
flag.className = 'keyboard__flag';
lang.className = 'keyboard__lang';
popUp.appendChild(flag);
popUp.appendChild(lang);

keyboardtitle.appendChild(title);
keyboardtitle.appendChild(subtitle);
title.innerHTML = 'Virtual Keyboard';
subtitle.innerHTML = 'produced on Mac OS for Window keyboard';
keyboardtitle.className = 'keyboard__title';
inform.className = 'keyboard__inform';

shift.innerHTML = 'Shift';
shift.className = 'inform__item';
alt.innerHTML = 'Alt';
alt.className = 'inform__item';
description.innerHTML = 'change language';

inform.appendChild(shift);
inform.append('+');
inform.appendChild(alt);
inform.append('-');
inform.appendChild(description);

textarea.placeholder = 'Введите текст...';
textarea.className = 'keyboard__textarea';
textarea.value = '¦';
textarea.readOnly = 'readonly';

content.className = 'keyboard__content keyboard__content--flex';
container.className = 'wrapper';
wrapper.className = 'wrapper';
keyboard.className = 'keyboard';

container.appendChild(textarea);
wrapper.appendChild(content);
keyboard.appendChild(keyboardtitle);
keyboard.appendChild(container);
keyboard.appendChild(popUp);
keyboard.appendChild(wrapper);
keyboard.appendChild(inform);
body.appendChild(keyboard);

const toLocalStorage = (item) => {
  localStorage.removeItem('language');
  localStorage.setItem('language', item);
};

const removeAlmostAll = () => {
  for (const item of keyboardKey) {
    if (
      item.classList.contains('ShiftLeft')
      || item.classList.contains('ShiftRight')
      || item.classList.contains('CapsLock')
      || item.classList.contains('AltLeft')
      || item.classList.contains('AltRight')
    ) {
      continue;
    } else {
      item.classList.remove('active');
    }
  }
};

const removeAll = () => {
  for (const item of keyboardKey) {
    item.classList.remove('active');
  }
};

const addListenerForKeyboard = () => {
  for (const item of keyboardKey) {
    item.addEventListener('click', (event) => {
      buttonPress = event.target.classList[1];

      if (
        buttonPress === 'ShiftLeft'
          || buttonPress === 'ShiftRight'
          || buttonPress === 'CapsLock'
          || buttonPress === 'AltLeft'
          || buttonPress === 'AltRight'
      ) {
        document.querySelector(`.${buttonPress}`).classList.toggle('active');
      } else {
        event.target.closest('.keyboard__key').classList.add('active');
        setTimeout(removeAlmostAll, 100);
      }

      first = textarea.value.split('¦')[0].split('');
      second = textarea.value.split('¦')[1].split('');
      if (buttonPress === 'Space') {
        textarea.value = [...first, ' ', '¦', ...second].join('');
      } else if (
        pressedKeys.includes('Shift')
          && event.target.nextSibling.classList.contains('additional')
      ) {
        additional = event.target.nextSibling.innerText;
        textarea.value = textarea.value = [
          ...first,
          additional,
          '¦',
          ...second,
        ].join('');
      } else if (buttonPress === 'CapsLock') {
        if (
          keyboardKey[15].innerHTML === keyboardKey[15].innerHTML.toUpperCase()
        ) {
          for (const button of keyboardKey) {
            if (letters.includes(button.classList[1])) {
              button.innerHTML = button.innerHTML.toLowerCase();
            }
          }
        } else {
          for (const button of keyboardKey) {
            if (letters.includes(button.classList[1])) {
              button.innerHTML = button.innerHTML.toUpperCase();
            }
          }
        }
        pressedKeys.length = 0;
      } else if (buttonPress === 'Tab') {
        textarea.value = [...first, '\t', '¦', ...second].join('');
      } else if (buttonPress === 'Delete') {
        second.shift();
        textarea.value = [...first, '¦', ...second].join('');
      } else if (buttonPress === 'Backspace') {
        first.pop();
        textarea.value = [...first, '¦', ...second].join('');
      } else if (buttonPress === 'Enter') {
        textarea.value = [...first, '\n', '¦', ...second].join('');
      } else if (buttonPress === 'AltLeft' || buttonPress === 'AltRight') {
        if (
          pressedKeys.includes('ShiftLeft')
            || pressedKeys.includes('ShiftRight')
        ) {
          language = !language;
          init(language);
          toLocalStorage(language);
        }
        pressedKeys.push(buttonPress);
      } else if (buttonPress === 'ArrowLeft') {
        second.unshift(first.pop());
        textarea.value = [...first, '¦', ...second].join('');
      } else if (buttonPress === 'ArrowRight') {
        first.push(second.shift());
        textarea.value = `${first.join('')}¦${second.join('')}`;
        textarea.value = [...first, '¦', ...second].join('');
      } else if (buttonPress === 'ArrowDown') {
        textarea.value = [...first, '↓', '¦', ...second].join('');
      } else if (buttonPress === 'ArrowUp') {
        textarea.value = [...first, '↑', '¦', ...second].join('');
      } else if (buttonPress === 'ShiftLeft' || buttonPress === 'ShiftRight') {
        if (
          pressedKeys.includes('AltLeft')
            || pressedKeys.includes('AltRight')
        ) {
          language = !language;
          init(language);
          toLocalStorage(language);
        } else if (
          pressedKeys.includes('ShiftLeft')
            || pressedKeys.includes('ShiftRight')
        ) {
          pressedKeys.length = 0;
          for (const button of keyboardKey) {
            if (letters.includes(button.classList[1])) {
              if (language === false) {
                button.innerHTML = button.innerHTML.toLowerCase();
              } else if (button.classList[1].length <= 4) {
                button.innerHTML = button.innerHTML.toLowerCase();
              }
            }
          }
        } else {
          for (const button of keyboardKey) {
            if (letters.includes(button.classList[1])) {
              if (language === false) {
                button.innerHTML = button.innerHTML.toUpperCase();
              } else if (button.classList[1].length <= 4) {
                button.innerHTML = button.innerHTML.toUpperCase();
              }
              pressedKeys.push(buttonPress);
            }
          }
        }
      } else if (
        buttonPress === 'ControlLeft'
          || buttonPress === 'ControlRight'
      ) {
        textarea.value = [...first, '¦', ...second];
      } else {
        textarea.value = [
          ...first,
          event.target.innerHTML,
          '¦',
          ...second,
        ].join('');
      }
    });
  }
};

function init(currentLang) {
  if (currentLang) {
    board = EnKeyboard;
    flag.src = './assets/icons/Flag-USA.png';
    lang.innerHTML = 'English';
  } else {
    board = RuKeyboard;
    flag.src = './assets/icons/Flag-Russia.png';
    lang.innerHTML = 'Русский';
  }
  content.innerHTML = '';

  for (let row = 0; row < code.length; row += 1) {
    const line = document.createElement('div');
    line.className = 'keyboard__line keyboard__line--flex';
    for (let index = 0; index < code[row].length; index += 1) {
      const element = board[row][index];
      const sign = document.createElement('div');
      sign.classList.add('keyboard__key');
      sign.classList.add(`${code[row][index]}`);

      if (Array.isArray(element)) {
        const mainItem = document.createElement('div');
        const addItem = document.createElement('div');
        mainItem.classList.add('main');
        addItem.classList.add('additional');
        mainItem.innerHTML = element[0];
        addItem.innerHTML = element[1];
        sign.appendChild(mainItem);
        sign.appendChild(addItem);
      } else if (element.startsWith('Control')) {
        sign.innerHTML = `${element[0].toUpperCase()}trl`;
      } else if (
        element === 'Space'
        || element.startsWith('Arrow')
        || element.startsWith('Win')
      ) {
        sign.innerHTML = '';
      } else if (element.startsWith('Shift')) {
        sign.innerHTML = 'Shift';
      } else {
        sign.innerHTML = element;
      }

      line.appendChild(sign);
    }
    content.appendChild(line);
  }
  keyboardKey = document.querySelectorAll('.keyboard__key');
  addListenerForKeyboard();
  toLocalStorage(language);
  pressedKeys.length = 0;
  removeAll();
}

init(language);

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  pressedKeys.push(event.code);
  pressedKeys.push(event.key);

  if (
    event.code !== 'MetaRight'
    && document.querySelector(`.${event.code}`) !== null
  ) {
    document.querySelector(`.${event.code}`).classList.add('active');
  } else {
    return;
  }

  if (event.key === 'Shift') {
    for (const item of keyboardKey) {
      if (letters.includes(item.classList[1])) {
        if (language === false) {
          item.innerHTML = item.innerHTML.toUpperCase();
        } else if (item.classList[1].length <= 4) {
          item.innerHTML = item.innerHTML.toUpperCase();
        }
      }
    }
  } else if (event.key === 'CapsLock') {
    if (keyboardKey[15].innerHTML === keyboardKey[15].innerHTML.toUpperCase()) {
      for (const item of keyboardKey) {
        if (letters.includes(item.classList[1])) {
          item.innerHTML = item.innerHTML.toLowerCase();
        }
      }
    } else {
      for (const item of keyboardKey) {
        if (letters.includes(item.classList[1])) {
          if (language === false) {
            item.innerHTML = item.innerHTML.toUpperCase();
          } else if (item.classList[1].length <= 4) {
            item.innerHTML = item.innerHTML.toUpperCase();
          }
        }
      }
    }
  } else if (event.key === 'Alt') {
    pressedKeys.push(event.key);
  } else if (event.key === 'Meta' || event.key === 'Control') {
    event.preventDefault();
  } else {
    first = textarea.value.split('¦')[0].split('');
    second = textarea.value.split('¦')[1].split('');
    if (event.key === 'Tab') {
      textarea.value = [...first, '\t', '¦', ...second].join('');
    } else if (event.key === 'Backspace') {
      first.pop();
      textarea.value = [...first, '¦', ...second].join('');
    } else if (event.key === 'Enter') {
      textarea.value = [...first, '\n', '¦', ...second].join('');
    } else if (event.key === 'Delete') {
      second.shift();
      textarea.value = [...first, '¦', ...second].join('');
    } else if (event.key === 'ArrowLeft') {
      second.unshift(first.pop());
      textarea.value = [...first, '¦', ...second].join('');
    } else if (event.key === 'ArrowRight') {
      first.push(second.shift());
      textarea.value = [...first, '¦', ...second].join('');
    } else if (event.key === 'ArrowDown') {
      textarea.value = [...first, '↓', '¦', ...second].join('');
    } else if (event.key === 'ArrowUp') {
      textarea.value = [...first, '↑', '¦', ...second].join('');
    } else if (document.querySelector(`.${event.code}`).children.length > 1) {
      if (
        document
          .querySelector(`.${event.code}`)
          .children[1].classList.contains('additional')
        && pressedKeys.includes('Shift')
      ) {
        additional = document.querySelector(`.${event.code}`).lastChild
          .innerText;
        textarea.value = [...first, additional, '¦', ...second].join('');
      } else {
        main = document.querySelector(`.${event.code}`).firstChild.innerText;
        textarea.value = [...first, main, '¦', ...second].join('');
      }
    } else {
      textarea.value = [
        ...first,
        document.querySelector(`.${event.code}`).innerHTML,
        '¦',
        ...second,
      ].join('');
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (
    event.key !== 'Meta'
    && document.querySelector(`.${event.code}`) !== null
  ) {
    document.querySelector(`.${event.code}`).classList.remove('active');
  } else {
    removeAlmostAll();
  }

  if (event.key === 'Shift') {
    for (const item of keyboardKey) {
      if (letters.includes(item.classList[1])) {
        item.innerHTML = item.innerHTML.toLowerCase();
      }
    }

    if (pressedKeys.includes('AltLeft') || pressedKeys.includes('AltRight')) {
      language = !language;
      init(language);
      toLocalStorage(language);
    }
  }

  if (event.key === 'Alt') {
    if (
      pressedKeys.includes('ShiftLeft')
      || pressedKeys.includes('ShiftRight')
    ) {
      language = !language;
      init(language);
      toLocalStorage(language);
    }
  }
});

toLocalStorage(language);
