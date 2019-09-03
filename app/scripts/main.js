$(function () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return;
  }

  const videoSource = document.getElementById('vid-source')
  const canvasVideo = document.getElementById('camera-vid')

  const cameraText = document.getElementById('camera-button')

  const canvasCtx = canvasVideo.getContext('2d')

  const {body: {clientHeight, clientWidth}} = document

  const validate = () => {
    setTimeout(() => {
      cameraText.innerHTML = 'Validación completada'

      window.close();
    }, 5000)
  }

  const renderVideo = () => {
    canvasCtx.drawImage(videoSource, 0, 0)

    requestAnimationFrame(renderVideo)
  }

  videoSource.addEventListener('play', function () {
    cameraText.innerText = 'Mueve tu cara'

    canvasVideo.width = videoSource.videoWidth
    canvasVideo.height = videoSource.videoHeight

    requestAnimationFrame(renderVideo)
  })

  navigator.mediaDevices.getUserMedia({ video: { width: clientWidth, height: clientHeight } })
    .then(stream => {
      videoSource.srcObject = stream

      validate()
    })
    .catch(err => { console.error(err) })
})

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
$(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
