/* Tiny chaos engine: toasts, a dodging button, a plank, and a mutiny. No libraries. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toastEl = document.querySelector('.toast');
  let timer;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  };

  // Event card buttons
  document.querySelectorAll('[data-toast]').forEach(b =>
    b.addEventListener('click', () => toast(b.dataset.toast)));

  // Walk the plank: button falls off, comes back
  const plank = document.querySelector('[data-plank]');
  plank && plank.addEventListener('click', () => {
    toast('Bold choice. Splash. The button will be fished out shortly.');
    if (reduce) return;
    plank.classList.remove('respawn');
    plank.classList.add('plunge');
    setTimeout(() => { plank.classList.remove('plunge'); plank.classList.add('respawn'); }, 2200);
  });

  // Skip the fee: dodges 4 times, then gives up and lies to you
  const dodge = document.querySelector('[data-dodge]');
  if (dodge) {
    let dodges = 0;
    const lines = ['Fees are eternal.', 'The treasurer has been alerted.', 'Nice try. Pay in parrots.'];
    const flee = () => {
      if (reduce || dodges >= 4) return;
      dodges++;
      const x = (Math.random() - .5) * Math.min(300, innerWidth * .5);
      const y = (Math.random() - .5) * 60;
      dodge.style.transform = `translate(${x}px,${y}px) rotate(${(Math.random() - .5) * 14}deg)`;
    };
    dodge.addEventListener('pointerenter', flee);
    dodge.addEventListener('click', () => {
      toast(lines[Math.floor(Math.random() * lines.length)]);
      dodge.style.transform = ''; dodges = 0;
    });
  }

  // Do not press: escalating nonsense, then a mutiny
  const nopress = document.querySelector('[data-nopress]');
  if (nopress) {
    const msgs = [
      'I said do not press.',
      'Why would you do that?',
      'The ship is now 3% more cursed.',
      'Stop. The parrot is filing a report.',
      'Fine. MUTINY!'
    ];
    let n = 0;
    nopress.addEventListener('click', () => {
      toast(msgs[Math.min(n, msgs.length - 1)]);
      n++;
      if (n >= msgs.length) {
        if (!reduce) {
          document.body.classList.add('mutiny');
          setTimeout(() => document.body.classList.remove('mutiny'), 4200);
        }
        n = 0;
      }
    });
  }
})();
