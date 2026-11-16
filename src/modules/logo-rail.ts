export function initLogoRail() {
  const rail = document.querySelector<HTMLElement>(".logo-rail");
  const track = rail?.querySelector<HTMLElement>(".logo-rail-track");
  if (!rail || !track) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const duration = 32;
  let offset = 0;
  let dragging = false;
  let hovering = false;
  let lastX = 0;
  let lastTime = performance.now();

  const loopWidth = () => track.scrollWidth / 2;

  const wrap = (x: number) => {
    const width = loopWidth();
    if (width <= 0) return 0;
    let next = x % width;
    if (next > 0) next -= width;
    return next;
  };

  const apply = () => {
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  const current = new DOMMatrix(getComputedStyle(track).transform).m41;
  rail.classList.add("is-manual");
  offset = Number.isFinite(current) ? wrap(current) : 0;
  apply();

  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    if (!dragging && !hovering && !reduced.matches) {
      const width = loopWidth();
      if (width > 0) {
        offset = wrap(offset - (width / duration) * dt);
        apply();
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  rail.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    dragging = true;
    lastX = event.clientX;
    rail.classList.add("is-dragging");
    rail.setPointerCapture(event.pointerId);
  });

  rail.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    offset = wrap(offset + (event.clientX - lastX));
    lastX = event.clientX;
    apply();
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    hovering = rail.matches(":hover");
    rail.classList.remove("is-dragging");
  };

  rail.addEventListener("pointerup", release);
  rail.addEventListener("pointercancel", release);
  rail.addEventListener("pointerenter", () => {
    hovering = true;
  });
  rail.addEventListener("pointerleave", () => {
    if (!dragging) hovering = false;
  });
  rail.addEventListener("dragstart", (event) => event.preventDefault());
}
