const cameraBtn = document.querySelector('.camera-wrapper');
const uploadProfileInput = document.querySelector('#upload-profile-picture');
const uploadPictureForm = document.querySelector('#upload-picture-form');

cameraBtn?.addEventListener('click', (e) => {
  e.preventDefault;
  uploadProfileInput.value = null;
  uploadProfileInput.click();
});

uploadProfileInput?.addEventListener('change', (e) => {
  console.log('changed!');
  console.log(uploadProfileInput.value);

  if (uploadProfileInput.value) {
    console.log('submitted form');
    uploadPictureForm.submit();
  }
});
