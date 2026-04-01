


import "./glight.js"



  // Smooth Scroll
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // adjust for sticky navbar height
          behavior: "smooth"
        });
      }
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 100; // offset

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sec.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Count up animation
  const counters = document.querySelectorAll('.counter');
  
  const startCount = (target, element) => {
    let count = 0;
    const increment = target / 50; 
    const updateCount = () => {
      if (count < target) {
        count += increment;
        element.innerText = Math.ceil(count);
        setTimeout(updateCount, 15);
      } else {
        element.innerText = target;
      }
    };
    updateCount();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        startCount(target, entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Back to Top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('d-none');
        backToTop.classList.add('d-flex');
      } else {
        backToTop.classList.add('d-none');
        backToTop.classList.remove('d-flex');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

