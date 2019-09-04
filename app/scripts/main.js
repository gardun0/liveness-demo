$(function () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return;
  }

  const videoSource = document.getElementById('vid-source')
  const canvasVideo = document.getElementById('camera-vid')

  const cameraText = document.getElementById('camera-button')

  const canvasCtx = canvasVideo.getContext('2d')

  const {body: {clientHeight, clientWidth}} = document

  const closeIt = () => setTimeout(() => {
    window.close()
  }, 2000)

  const validate = () => {
    setTimeout(() => {
      cameraText.innerHTML = 'Validación completada'

      closeIt()
    }, 5000)
  }

  const renderVideo = () => {

    const { videoHeight, videoWidth } = videoSource

    const cutX = clientWidth > videoWidth ? videoWidth : clientWidth
    const cutY = clientHeight > videoHeight ? videoHeight : clientHeight

    const posX = cutX === videoWidth ? 0 : (videoWidth - clientWidth / 2)
    const posY = cutY === videoHeight ? 0 : (videoHeight - clientHeight / 2)

    canvasCtx.drawImage(videoSource, posX, posY, cutX, cutY, 0, 0, clientWidth, clientHeight)

    requestAnimationFrame(renderVideo)
  }

  videoSource.addEventListener('play', function () {
    cameraText.innerText = 'Mueve tu cara'

    canvasVideo.width = clientWidth
    canvasVideo.height = clientHeight

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
