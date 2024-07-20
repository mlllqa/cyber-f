document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burgerMenu');
  const headerMenu = document.querySelector('.header__menu');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const phoneIcon = document.querySelector('.header__phone');
  const phoneNumber = '+7 (495) 108-05-18';

  const OFFSET_REM = 80; 
  const OFFSET_PX = OFFSET_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);

  const smoothScroll = (targetSelector) => {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - OFFSET_PX;
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
  };

  burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      headerMenu.classList.toggle('active');
      headerMenu.style.display = burgerMenu.classList.contains('active') ? 'flex' : 'none';
  });

  const links = document.querySelectorAll('.header__menu-item-link, .welcome__btn-cost-link');
  links.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const target = link.getAttribute('href');
          smoothScroll(target);
      });
  });


  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      const remInPixels = 20 * parseFloat(getComputedStyle(document.documentElement).fontSize);

      if (st < lastScrollTop && window.scrollY > remInPixels) {
          scrollToTopBtn.classList.add('show');
      } else if (st === 0) {
          scrollToTopBtn.classList.remove('show');
      } else {
          scrollToTopBtn.classList.remove('show');
      }
      lastScrollTop = st <= 0 ? 0 : st; 
  });

  scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  phoneIcon.addEventListener('click', () => {
      const tempInput = document.createElement('input');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = phoneNumber;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      alert('Номер телефона скопирован: ' + phoneNumber);
  });

  const copyToClipboard = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
  };

  const buttons = document.querySelectorAll('.welcome__btn-call, .road__bnt');
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          copyToClipboard(phoneNumber);
          alert('Номер телефона скопирован в буфер обмена: ' + phoneNumber);
      });
  });
});
