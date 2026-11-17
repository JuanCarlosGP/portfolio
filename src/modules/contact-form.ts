// src/modules/contact-form.ts

export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const submitBtn = document.getElementById('contact-submit-btn') as HTMLButtonElement | null;
  const submitText = document.getElementById('contact-submit-text');
  const successBanner = document.getElementById('contact-success-banner');
  const errorBanner = document.getElementById('contact-error-banner');
  const resetBtn = document.getElementById('contact-reset-btn');
  const copyBtn = document.getElementById('contact-copy-email-btn');
  const copyText = document.getElementById('contact-copy-text');

  if (!form || !submitBtn) return;

  // 1. Copy email fallback handler
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'juancarlosgp212@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        if (copyText) {
          const originalText = copyText.textContent;
          copyText.textContent = document.documentElement.lang === 'es' ? '¡Copiado!' : 'Copied!';
          copyBtn.classList.add('is-copied');
          setTimeout(() => {
            copyText.textContent = originalText;
            copyBtn.classList.remove('is-copied');
          }, 2000);
        }
      } catch (_) {
        // Fallback prompt if clipboard API is restricted
        window.prompt('Email:', email);
      }
    });
  }

  // 2. Form submission handler via FormSubmit AJAX endpoint
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
    const subjectInput = document.getElementById('contact-subject') as HTMLInputElement | null;
    const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;

    if (!nameInput || !emailInput || !messageInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput.value.trim();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!name || !email || !message) return;

    // Loading state
    submitBtn.disabled = true;
    if (submitText) {
      submitText.textContent = document.documentElement.lang === 'es' ? 'Enviando...' : 'Sending...';
    }
    submitBtn.classList.add('is-loading');
    if (errorBanner) errorBanner.classList.add('is-hidden');

    try {
      const response = await fetch('https://formsubmit.co/ajax/juancarlosgp212@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject: subject || 'Contacto desde portfolio',
          message,
          _subject: `[Portfolio SDET] Nuevo mensaje de ${name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && (data.success === 'true' || data.success === true || (typeof data.message === 'string' && data.message.toLowerCase().includes('activat')))) {
        form.classList.add('is-hidden');
        if (successBanner) successBanner.classList.remove('is-hidden');
      } else {
        throw new Error(data?.message || 'Form submission failed');
      }
    } catch (_) {
      if (errorBanner) errorBanner.classList.remove('is-hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      if (submitText) {
        submitText.textContent = document.documentElement.lang === 'es' ? 'Enviar mensaje' : 'Send Message';
      }
    }
  });

  // 3. Reset button (send another message)
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('is-hidden');
      if (successBanner) successBanner.classList.add('is-hidden');
      if (errorBanner) errorBanner.classList.add('is-hidden');
    });
  }
}
