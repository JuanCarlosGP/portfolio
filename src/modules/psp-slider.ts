export function initProjectSliders() {
  const sliders = document.querySelectorAll('.project-preview--slider');
  sliders.forEach((slider) => {
    const track = slider.querySelector('.slider-track') as HTMLElement | null;
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-arrow--prev');
    const nextBtn = slider.querySelector('.slider-arrow--next');
    const dots = slider.querySelectorAll('.slider-dot');
    const counter = slider.querySelector('.slider-counter');
    const soundBtn = slider.querySelector('.slider-sound-btn') as HTMLElement | null;

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let inView = false;
    let userPaused = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const viewport = slider.querySelector('.slider-viewport') ?? slider;
    const playOverlay = slider.querySelector('.slider-play-overlay') as HTMLElement | null;

    function syncVideos() {
      slides.forEach((slide, idx) => {
        const vid = slide.querySelector('video');
        if (!vid) return;
        const isCurrent = idx === currentIndex;
        const shouldPlay = isCurrent && inView && !reducedMotion.matches && !userPaused;

        if (shouldPlay) {
          vid.muted = true;
          vid.defaultMuted = true;
          const p = vid.play();
          if (p !== undefined) {
            p.then(() => {
              if (playOverlay) playOverlay.classList.add('is-hidden');
            }).catch(() => {
              // Autoplay blocked by browser policy (e.g. Low Power Mode) -> reveal play button
              if (playOverlay && isCurrent) playOverlay.classList.remove('is-hidden');
            });
          }
        } else if (!isCurrent || !inView) {
          vid.pause();
        }
      });
    }

    const visibility = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.15);
        syncVideos();
      },
      { threshold: [0, 0.15, 0.5] }
    );
    visibility.observe(viewport);

    function goToSlide(index: number) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      // Update counter / caption
      if (counter) {
        const activeSlide = slides[currentIndex];
        const caption = activeSlide ? activeSlide.getAttribute('data-caption') : '';
        counter.textContent =
          caption ||
          `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
      }

      // Update dots
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      syncVideos();

      // Sound button visibility
      if (soundBtn) {
        const currentSlideHasVideo = !!slides[currentIndex]?.querySelector('video');
        soundBtn.classList.toggle('is-hidden', !currentSlideHasVideo);
      }
    }

    goToSlide(0);

    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeVideo = slides[currentIndex]?.querySelector('video');
        if (activeVideo) {
          activeVideo.muted = !activeVideo.muted;
          const muteIcon = soundBtn.querySelector('.sound-icon-mute') as HTMLElement | null;
          const unmuteIcon = soundBtn.querySelector('.sound-icon-unmute') as HTMLElement | null;
          if (muteIcon && unmuteIcon) {
            muteIcon.style.display = activeVideo.muted ? 'block' : 'none';
            unmuteIcon.style.display = activeVideo.muted ? 'none' : 'block';
          }
          soundBtn.title = activeVideo.muted ? 'Activar sonido' : 'Silenciar sonido';
        }
      });
    }

    // Video click-to-play & playOverlay toggle
    slides.forEach((slide) => {
      const vid = slide.querySelector('video');
      if (!vid) return;

      const togglePlay = () => {
        if (vid.paused) {
          userPaused = false;
          vid.muted = true;
          vid.defaultMuted = true;
          vid.play().then(() => {
            if (playOverlay) playOverlay.classList.add('is-hidden');
          }).catch(() => {});
        } else {
          userPaused = true;
          vid.pause();
          if (playOverlay) playOverlay.classList.remove('is-hidden');
        }
      };

      vid.addEventListener('click', togglePlay);
      if (playOverlay) {
        playOverlay.addEventListener('click', (e) => {
          e.stopPropagation();
          togglePlay();
        });
      }

      vid.addEventListener('play', () => {
        if (playOverlay) playOverlay.classList.add('is-hidden');
      });
      vid.addEventListener('pause', () => {
        if (userPaused && playOverlay && slides[currentIndex]?.contains(vid)) {
          playOverlay.classList.remove('is-hidden');
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIndex = parseInt(dot.getAttribute('data-slide-to') || '0', 10);
        goToSlide(targetIndex);
      });
    });

    // Keyboard navigation when slider is focused
    slider.addEventListener('keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
        keyEvent.preventDefault();
      } else if (keyEvent.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
        keyEvent.preventDefault();
      }
    });

    // Touch swipe support on mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener(
      'touchstart',
      (e: Event) => {
        const touchEvent = e as TouchEvent;
        if (touchEvent.touches[0]) touchStartX = touchEvent.touches[0].clientX;
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchend',
      (e: Event) => {
        const touchEvent = e as TouchEvent;
        if (touchEvent.changedTouches[0]) {
          touchEndX = touchEvent.changedTouches[0].clientX;
          const diff = touchEndX - touchStartX;
          if (Math.abs(diff) > 40) {
            if (diff < 0) {
              goToSlide(currentIndex + 1);
            } else {
              goToSlide(currentIndex - 1);
            }
          }
        }
      },
      { passive: true }
    );
  });
}
