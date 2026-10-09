/* Minimal hero helper: video playback safety + scroll fallback. No libraries. */
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const video = hero.querySelector('.hero__video');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const fallback = () => { hero.classList.add('no-video'); hero.classList.remove('is-playing'); };

  if (video) {
    if (reduce || saveData) {
      fallback();
      video.pause();
      video.querySelectorAll('source').forEach(s => s.remove());
      video.removeAttribute('src');
      video.load(); // stops the download; poster image stays as background
    } else {
      video.muted = true; // required for autoplay
      video.addEventListener('playing', () => hero.classList.add('is-playing'), { once: true });
      video.addEventListener('error', fallback, true); // also catches <source> errors
      const start = () => video.play().catch(fallback);
      video.readyState >= 2 ? start() : video.addEventListener('canplay', start, { once: true });
      // Save CPU/battery: pause when off-screen or tab hidden
      new IntersectionObserver(([e]) => { e.isIntersecting ? video.play().catch(() => {}) : video.pause(); }, { threshold: 0.05 }).observe(hero);
      document.addEventListener('visibilitychange', () => document.hidden ? video.pause() : video.play().catch(() => {}));
    }
  }

  // Parallax fallback for browsers without CSS scroll-driven animations
  if (!reduce && !(CSS.supports && CSS.supports('animation-timeline: scroll()'))) {
    let ticking = false;
    const update = () => { hero.style.setProperty('--p', Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * .9))).toFixed(3)); ticking = false; };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }
})();
