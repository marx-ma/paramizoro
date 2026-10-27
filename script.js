
const startBtn = document.getElementById('startBtn');
const intro = document.getElementById('intro');
const world = document.getElementById('world');

const modal = document.getElementById('letterModal');
const openChest = document.getElementById('openChest');
const chest = document.getElementById('chest');
const closeLetter = document.getElementById('closeLetter');
const toast = document.getElementById('toast');

const backgroundMusic = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');

const notes = {
  fruit: 'Si esta fruta tuviera un poder, sería hacerte sonreír incluso en los días más pesados. 🍈',
  flower: 'Te dejo estas flores imaginarias porque algunas personas merecen pequeños detalles sin necesitar una fecha especial. 🌸',
  map: 'No tengo el mapa de todas las respuestas, pero me gusta descubrir cosas nuevas contigo, isla por isla. 🗺️',
  hat: 'Como el sombrero de Luffy, hay cosas que se vuelven especiales por la historia y el cariño que llevan detrás. 👒'
};

// Abrir el pequeño mundo e iniciar la música.
if (startBtn) {
  startBtn.addEventListener('click', async () => {
    intro?.classList.add('hidden');
    world?.classList.remove('hidden');

    world?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    showerPetals(22);

    if (backgroundMusic) {
      try {
        await backgroundMusic.play();
        if (musicButton) musicButton.textContent = '♫ Música: ON';
      } catch (error) {
        console.log('El navegador bloqueó la reproducción automática.');
      }
    }
  });
}

// Botón para pausar o reanudar la música.
if (musicButton && backgroundMusic) {
  musicButton.addEventListener('click', async () => {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        musicButton.textContent = '♫ Música: ON';
      } catch (error) {
        console.error('No se pudo reproducir la música:', error);
      }
    } else {
      backgroundMusic.pause();
      musicButton.textContent = '♫ Música: OFF';
    }
  });
}

// Mensajes temporales de los objetos.
document.querySelectorAll('[data-note]').forEach(card => {
  card.addEventListener('click', () => {
    const message = notes[card.dataset.note];

    if (message) {
      showToast(message);
      showerPetals(8);
    }
  });
});

// Abrir la carta.
function revealLetter() {
  if (!modal) {
    console.error('No se encontró #letterModal en index.html');
    return;
  }

  modal.classList.remove('hidden');

  chest?.classList.add('opened');
  showerPetals(35);
}

openChest?.addEventListener('click', revealLetter);
chest?.addEventListener('click', revealLetter);

chest?.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    revealLetter();
  }
});

// Cerrar la carta.
closeLetter?.addEventListener('click', () => {
  modal?.classList.add('hidden');
});

modal?.addEventListener('click', event => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modal?.classList.add('hidden');
  }
});

// Animación de pétalos.
function showerPetals(amount) {
  const symbols = ['🌸', '🌷', '💗', '✨', '🌼'];

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('span');

    petal.className = 'petal';
    petal.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${3 + Math.random() * 4}s`;
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    petal.style.fontSize = `${14 + Math.random() * 18}px`;

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 8500);
  }
}

// Mostrar mensajes temporales.
let toastTimer;

function showToast(message) {
  if (!toast) {
    console.error('No se encontró #toast en index.html');
    return;
  }

  toast.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4300);
}

