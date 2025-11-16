function loadImages() {
  const imageData = JSON.parse(localStorage.getItem('oldBarrelImages') || '{}');

  document.querySelectorAll('img[data-img]').forEach(img => {
    const imageName = img.getAttribute('data-img').toLowerCase();
    if (imageData[imageName]) {
      img.src = imageData[imageName];
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadImages);
} else {
  loadImages();
}
