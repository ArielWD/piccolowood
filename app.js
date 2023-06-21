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

if (portafolio) {
  let proyectoSelect = []
  getProjects()
  scrolling.onscroll = () => {
    if (window.scrollY > 950) {
      portafolio.classList.add('active')
      setTimeout(() => {
        portafolio.classList.remove('active')
      }, 300)
    }
  }
  async function getProjects () {
    await fetch('/projects.json')
      .then(res => res.json())
      .then(datos => {
        showProjects(datos)
      })
  }

  function showProjects (datos) {
    for (const valor of datos) {
      const project = document.createElement('DIV')
      project.classList.add('portafolio__project')
      project.dataset.idProyecto = valor.id
      project.innerHTML += `
        <h3>${valor.nombre}</h3>
        <picture>
          <source srcset="${valor.img_titulo2}.webp" type="image/webp">
          <img loading="lazy" src="${valor.img_titulo}.jpg" alt="${valor.nombre}">
        </picture>
      `
      project.addEventListener('click', getProject)
      portafolio.appendChild(project)
    }
  }

  async function getProject (e) {
    const isImg = e.target.src
    try {
      const respuesta = await fetch('/projects.json')
      const resultado = await respuesta.json()
      if (!isImg) {
        proyectoSelect = resultado[e.target.parentElement.dataset.idProyecto]
      } else {
        proyectoSelect = resultado[e.target.parentElement.parentElement.dataset.idProyecto]
      }
    } catch (error) {
      console.log('error')
    }
    // console.log(proyectoSelect.ubicacion)

    if (proyectoSelect.ubicacion !== '') {
      console.log('si es diferente a vacio si escribo')
    }
  }
}
