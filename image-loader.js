const SUPABASE_URL = 'https://ilenzrfwfqnifqukrpgg.supabase.co';
const BUCKET = 'old-barrel-images';

function getImageUrl(filename) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename.toLowerCase()}`;
}

function loadImages() {
  document.querySelectorAll('img[data-img]').forEach(img => {
    const imageName = img.getAttribute('data-img');
    if (imageName) {
      img.src = getImageUrl(imageName);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadImages);
} else {
  loadImages();
}
