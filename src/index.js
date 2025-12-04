import './css/styles.css';
import { luhnCheck } from './js/cardValidator';
import { getCardSystem } from './js/cardSystem';

// Определяем список платёжных систем и их свойства
const paymentSystems = [
  { id: 'visa', name: 'Visa' },
  { id: 'mastercard', name: 'Mastercard' },
  { id: 'mir', name: 'Mir' },
  { id: 'jcb', name: 'JCB' },
];

// Динамически создаём блок с логотипами
function createLogoContainer() {
  const container = document.getElementById('logo-container');
  const logosDiv = document.createElement('div');
  logosDiv.className = 'card-logos';

  paymentSystems.forEach(system => {
    const img = document.createElement('img');
    img.src = `./img/${system.id}.png`;
    img.alt = system.name;
    img.className = 'logo';
    img.dataset.system = system.id;
    logosDiv.append(img);
  });

  container.append(logosDiv);
}

// Ищем все логотипы (уже после их вставки в DOM)
function getLogoElements() {
  return document.querySelectorAll('.logo');
}

// Сброс активного логотипа
function resetLogos(logos) {
  logos.forEach(img => img.classList.remove('active'));
}

// Подсветка нужного логотипа
function highlightLogo(logos, system) {
  resetLogos(logos);
  const logo = Array.from(logos).find(img => img.dataset.system === system);
  if (logo) {
    logo.classList.add('active');
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  createLogoContainer();

  const input = document.getElementById('card-number');
  const validateBtn = document.getElementById('validate-btn');
  const result = document.getElementById('validation-result');
  const logos = getLogoElements(); // логотипы уже в DOM

  validateBtn.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) {
      result.textContent = 'Please enter a card number';
      result.className = 'invalid';
      resetLogos(logos);
      return;
    }

    const isValid = luhnCheck(value);
    const system = getCardSystem(value);
    highlightLogo(logos, system);

    result.textContent = isValid ? 'Valid' : 'Invalid';
    result.className = isValid ? 'valid' : 'invalid';
  });

  input.addEventListener('input', () => {
    const value = input.value.trim();
    if (value) {
      const system = getCardSystem(value);
      highlightLogo(logos, system);
    } else {
      resetLogos(logos);
    }
  });
});