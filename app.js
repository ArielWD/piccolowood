if (document.querySelector('#mapa')) {
  const lat = -37.84171647593663
  const lng = 144.94617263048812
  const zoom = 17

  // eslint-disable-next-line no-undef
  const map = L.map('mapa').setView([lat, lng], zoom)

  // eslint-disable-next-line no-undef
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // eslint-disable-next-line no-undef
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`
        <h2 class="mapa__heading">Piccolo Wood</h2>
    `)
    .openPopup()
}

const scrolling = document.querySelector('body')
const portafolio = document.querySelector('.portafolio')

scrolling.onscroll = () => {
  if (window.scrollY > 950) {
    portafolio.classList.add('active')

    setTimeout(() => {
      portafolio.classList.remove('active')
    }, 300)
  }
}
