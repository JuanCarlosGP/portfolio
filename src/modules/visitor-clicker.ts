// src/modules/visitor-clicker.ts
import { AGENT_COLORS, getCursorColorIndex } from './cursor-palette';

const UPSTASH_URL = 'https://pleased-eel-204945.upstash.io';
const UPSTASH_TOKEN = 'gQAAAAAAAyCRAAIgcDI2ZGQ0YTU2MTQyYWI0MGJkYWQxMWM5ZTdiMWY3YTg4ZQ';
const REDIS_KEY = 'portfolio_clicks';
const LOCAL_STORAGE_KEY = 'portfolio_visitor_marks';

let currentGlobalCount = 0;
let pendingSyncCount = 0;
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function formatDigits(count: number): string[] {
  const clamped = Math.max(0, Math.min(count, 999999));
  const str = String(clamped).padStart(6, '0');
  // 6 digits: [0, 1, 2, 3, 4, 5]
  return str.split('');
}

function renderOdometer(count: number, animate = true) {
  currentGlobalCount = count;
  const digits = formatDigits(count);
  const odometer = document.getElementById('clicker-odometer');
  if (!odometer) return;

  const digitEls = odometer.querySelectorAll<HTMLElement>('.odometer-digit');
  digitEls.forEach((el, i) => {
    const nextChar = digits[i] || '0';
    if (el.textContent !== nextChar) {
      if (animate) {
        el.classList.remove('digit-flip');
        void el.offsetWidth;
        el.classList.add('digit-flip');
        el.textContent = nextChar;
        setTimeout(() => el.classList.remove('digit-flip'), 240);
      } else {
        el.textContent = nextChar;
      }
    }
  });
}

function getUserMarks(): number {
  try {
    const val = localStorage.getItem(LOCAL_STORAGE_KEY);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch (_) {
    return 0;
  }
}

function setUserMarks(count: number) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(count));
  } catch (_) {}
  const userCountEl = document.getElementById('clicker-user-count');
  if (userCountEl) {
    userCountEl.textContent = String(count);
  }
}

function spawnParticle(btn: HTMLElement) {
  const rect = btn.getBoundingClientRect();
  const particle = document.createElement('span');
  particle.className = 'clicker-particle';
  particle.textContent = '+1';

  // Use current active agent color
  const colorIndex = typeof getCursorColorIndex === 'function' ? getCursorColorIndex() : 0;
  const color = AGENT_COLORS[colorIndex] || '#10b981';
  particle.style.color = color;
  particle.style.textShadow = `0 0 14px ${color}, 0 0 6px ${color}, 0 2px 4px rgba(0,0,0,0.8)`;

  // Random horizontal variance around button center
  const randomX = (Math.random() - 0.5) * 44;
  particle.style.left = `${rect.width / 2 + randomX}px`;
  particle.style.top = `-10px`;

  btn.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 950);
}

async function fetchInitialCount() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${UPSTASH_URL}/get/${REDIS_KEY}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      signal: controller.signal
    });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      const val = parseInt(data?.result ?? '0', 10);
      if (!Number.isNaN(val) && val >= 0) {
        renderOdometer(val + pendingSyncCount, false);
      }
    }
  } catch (_) {
    // Offline or network error: start gracefully with local count
  }
}

async function flushPendingSync() {
  if (pendingSyncCount <= 0) return;
  const batch = pendingSyncCount;
  pendingSyncCount = 0;

  try {
    const res = await fetch(`${UPSTASH_URL}/incrby/${REDIS_KEY}/${batch}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data?.result === 'number') {
        renderOdometer(data.result + pendingSyncCount, true);
      }
    }
  } catch (_) {
    // Retain optimistic count on network glitch
  }
}

function scheduleSync() {
  if (syncTimer) clearTimeout(syncTimer);
  // Batch rapid clicks into a single INCRBY call after 200ms pause
  syncTimer = setTimeout(() => {
    flushPendingSync();
  }, 200);
}

function handleStampClick(btn: HTMLElement) {
  // Re-trigger button press animation instantly on every rapid click
  btn.classList.remove('btn-stamped');
  void btn.offsetWidth;
  btn.classList.add('btn-stamped');
  setTimeout(() => btn.classList.remove('btn-stamped'), 200);

  // Spawn visual particle on every click
  spawnParticle(btn);

  // Optimistic instant UI updates
  const nextUserMarks = getUserMarks() + 1;
  setUserMarks(nextUserMarks);

  const optimisticGlobal = currentGlobalCount + 1;
  renderOdometer(optimisticGlobal, true);

  // Accumulate batch and schedule backend sync
  pendingSyncCount++;
  scheduleSync();
}

export function initVisitorClicker() {
  const btn = document.getElementById('clicker-stamp-btn');
  if (!btn) return;

  // Render stored user marks
  setUserMarks(getUserMarks());

  // Fetch initial global count from Redis
  fetchInitialCount();

  // Attach click listener: supports rapid spam-clicks without artificial cooldown
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    handleStampClick(btn);
  });

  // Flush any pending clicks on tab close
  window.addEventListener('beforeunload', () => {
    if (pendingSyncCount > 0) {
      flushPendingSync();
    }
  });
}
