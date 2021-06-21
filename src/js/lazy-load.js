document.addEventListener('DOMContentLoaded', function () {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.classList.remove('lazy');
        imageObserver.unobserve(image);
      }
    });
  });

  const lazyloadImages = Array.prototype.slice.apply(
    document.querySelectorAll('figure.lazy')
  );
  lazyloadImages.forEach((image) => {
    imageObserver.observe(image);
  });
});
