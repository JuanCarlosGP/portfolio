export function initCompareSlider() {
  const demoStage = document.getElementById('demo-stage');
  if (!demoStage) return;

  let isDragging = false;

  function updateSlider(clientX: number) {
    if (!demoStage) return;
    const rect = demoStage.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    demoStage.style.setProperty('--p', `${percent}%`);
    demoStage.setAttribute('aria-valuenow', Math.round(percent).toString());
  }

  demoStage.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support
  demoStage.addEventListener(
    'touchstart',
    (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    },
    { passive: true }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging || !e.touches[0]) return;
      updateSlider(e.touches[0].clientX);
    },
    { passive: true }
  );

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Keyboard accessibility
  demoStage.addEventListener('keydown', (e) => {
    const current = parseFloat(demoStage.getAttribute('aria-valuenow') || '50');
    if (e.key === 'ArrowLeft') {
      const next = Math.max(0, current - 5);
      demoStage.style.setProperty('--p', `${next}%`);
      demoStage.setAttribute('aria-valuenow', next.toString());
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      const next = Math.min(100, current + 5);
      demoStage.style.setProperty('--p', `${next}%`);
      demoStage.setAttribute('aria-valuenow', next.toString());
      e.preventDefault();
    }
  });
}
