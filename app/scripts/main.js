$(function () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return;
  }

  const videoSource = document.getElementById('camera-vid')
  const cameraText = document.getElementById('camera-button')
  const test = document.getElementById('test')


  const log = (txt) => {
    test.innerText = `${test.innerText}\n${txt}`
  }

  const validate = () => {
    setTimeout(() => {
      cameraText.innerHTML = 'Validación completada ✅'

      window.close();
    }, 5000)
  }

  const { body: { clientHeight, clientWidth } } = document

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoSource.srcObject = stream
      log('hola')
      cameraText.innerText = 'Validando...'

      validate()
    })
    .catch(err => { log(err.message) })
})

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
$(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
