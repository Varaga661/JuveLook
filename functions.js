document.addEventListener('DOMContentLoaded', () => {
      const reveals = document.querySelectorAll('.reveal');

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.15 }
      );

      reveals.forEach(section => observer.observe(section));
    });
    
//Slider
     const container = document.querySelector('.container');
    const imgBefore = document.querySelector('.img-before');
    const line = document.querySelector('.line');
    const images = container.querySelectorAll('img');

    let isDragging = false;

    Promise.all([...images].map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(res => img.onload = res);
    })).then(() => {
        const rect = container.getBoundingClientRect();
        const middle = rect.width / 2;

        imgBefore.style.width = `${middle}px`;
        line.style.left = `${middle}px`;
    });

    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        container.setPointerCapture(e.pointerId);
    });

    container.addEventListener('pointerup', () => isDragging = false);
    container.addEventListener('pointerleave', () => isDragging = false);

    container.addEventListener('pointermove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const rect = container.getBoundingClientRect();
        let x = e.clientX - rect.left;

        x = Math.max(0, Math.min(x, rect.width));

        imgBefore.style.width = `${x}px`;
        line.style.left = `${x}px`;
    });

    /* Navbar scroll */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});



/* LOADER */
(() => {
  const loader = document.getElementById("loader");
  const fill = document.querySelector(".logo-fill");

  // LOCK SCROLL IMMEDIATELY (even if loader fails)
  document.documentElement.style.overflow = "hidden";
  document.body.classList.add("loading");

  if (!loader || !fill) {
    // Safety unlock if loader markup is missing
    window.addEventListener("load", () => {
      document.documentElement.style.overflow = "";
      document.body.classList.remove("loading");
    });
    return;
  }

  const assets = [
    ...document.images,
    ...document.querySelectorAll("video"),
    ...document.querySelectorAll("link[rel='stylesheet']")
  ];

  let loaded = 0;
  const total = Math.max(assets.length, 1);

  fill.style.height = "0%";

  function update() {
    loaded++;
    const percent = Math.min((loaded / total) * 100, 100);
    fill.style.height = percent + "%";
  }

  assets.forEach(asset => {
    if (
      asset.complete ||
      asset.readyState === 4 ||
      asset.readyState === "complete"
    ) {
      setTimeout(update, 80);
    } else {
      asset.addEventListener("load", update, { once: true });
      asset.addEventListener("error", update, { once: true });
    }
  });

  // FINAL EXIT (authoritative)
  window.addEventListener("load", () => {
    fill.style.height = "100%";

    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";

      // UNLOCK SCROLL
      document.documentElement.style.overflow = "";
      document.body.classList.remove("loading");

      setTimeout(() => loader.remove(), 700);
    }, 400);
  });
})();