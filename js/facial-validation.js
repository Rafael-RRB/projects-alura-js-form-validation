const startCameraButton = document.querySelector('[data-video-botao]');
const inputCamera = document.querySelector('[data-camera');
const video = document.querySelector('[data-video]');

startCameraButton.addEventListener('click', async function () {
  const startVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

  startCameraButton.style.display = "none";
  inputCamera.style.display = "block";

  video.srcObject = startVideo;
});