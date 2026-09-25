/* Shared navigation, estimator, and small interaction helpers. */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const estimator = document.querySelector('#estimator-form');
  if (estimator) {
    const serviceSelect = document.querySelector('#service-select');
    const estimateValue = document.querySelector('#estimate-value');
    const estimateCaption = document.querySelector('#estimate-caption');
    const ranges = {
      trading: { starter: '₹50k – ₹2L', growth: '₹2L – ₹10L', enterprise: '₹10L+' },
      furniture: { starter: '₹1L – ₹4L', growth: '₹4L – ₹15L', enterprise: '₹15L+' },
      consulting: { starter: '₹50k – ₹2L', growth: '₹2L – ₹8L', enterprise: '₹8L+' },
      industrial: { starter: '₹2L – ₹8L', growth: '₹8L – ₹25L', enterprise: '₹25L+' },
      travel: { starter: '₹75k – ₹3L', growth: '₹3L – ₹12L', enterprise: '₹12L+' }
    };
    const labels = {
      trading: 'trading engagement', furniture: 'furniture project', consulting: 'consulting engagement', industrial: 'industrial project', travel: 'group travel plan'
    };

    const updateEstimate = () => {
      const service = serviceSelect.value;
      const scale = estimator.querySelector('input[name="scale"]:checked').value;
      const scaleLabel = scale.charAt(0).toUpperCase() + scale.slice(1);
      estimateValue.textContent = ranges[service][scale];
      estimateCaption.textContent = `For a ${scale.toLowerCase()} ${labels[service]}`;
      estimateValue.animate([{ opacity: .35, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
      estimator.querySelector('.estimate-result span').textContent = `${scaleLabel} project range`;
    };

    serviceSelect.addEventListener('change', updateEstimate);
    estimator.querySelectorAll('input[name="scale"]').forEach((input) => input.addEventListener('change', updateEstimate));
    estimator.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.href = `contact.html?service=${encodeURIComponent(serviceSelect.value)}`;
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const serviceField = contactForm.querySelector('select[name="service"]');
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService && serviceField) {
      const matchingOption = Array.from(serviceField.options).find((option) => option.textContent.toLowerCase().startsWith(requestedService));
      if (matchingOption) serviceField.value = matchingOption.value;
    }

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const successMessage = document.querySelector('#form-success');
      if (successMessage) successMessage.classList.add('is-visible');
      contactForm.reset();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
