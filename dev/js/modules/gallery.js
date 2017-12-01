export const getImages = () => {
  const d = document, c = console.log

  const getImagesScript = setInterval(() => {
    if(d.readyState == 'complete') {
      clearInterval(getImagesScript)

      const getImages = container => [...container.querySelectorAll('img')]

      const getLargeImages = gallery => gallery.map(el => el.src)

      const getDescriptions = gallery => gallery.map(el => el.alt)

      const OpenLightBoxEvent = (container, gallery, larges, descriptions) => {
        container.addEventListener('click', e => {
          let el = e.target,
            i = gallery.indexOf(el)

          if(el.tagName === 'IMG') {
            openLightBox(gallery, i, larges, descriptions)
          }
        })
      }

      const openLightBox = (gallery, i, larges, descriptions) => {
        let lightboxEl = d.createElement('div')

        let lightBoxContent = `
          <div class="lightbox-overlay">
            <figure class="lightbox-container">
              <div class="close-modal"></div>
              <img src="${larges[i]}" class="lightbox-image">
              <figcaption>
                <p class="lightbox-description">${descriptions[i]}</p>
              <figcaption>
              <nav class="class="lightbox-navigation"">
                <a href="" class="lightbox-navigation__button prev"></a>
                <span class="lightbox-navigation__counter">Imagen ${i+1} de ${larges.length} </span>
                <a href="" class="lightbox-navigation__button next"></a>
              </nav>
            </figure>
          </div>
        `

        lightboxEl.innerHTML = lightBoxContent

        lightboxEl.id = 'lightbox'

        d.body.appendChild(lightboxEl)

        closeModal(lightboxEl)

        navigateLightBox(lightboxEl, i, larges, descriptions)
      }

      const closeModal = modalEl => {
        let closeModal = modalEl.querySelector('.close-modal')

        closeModal.addEventListener('click', e => {
          e.preventDefault()
          d.body.removeChild(modalEl)
        })
      }

      const navigateLightBox = (lightboxEl, i, larges, descriptions) => {
        let prev = lightboxEl.querySelector('.prev'),
          next = lightboxEl.querySelector('.next'),
          image = lightboxEl.querySelector('img'),
          description = lightboxEl.querySelector('p'),
          counter = lightboxEl.querySelector('span'),
          close = lightboxEl.querySelector('.close-modal')

        window.addEventListener('keyup', e => {
          if(e.key === 'ArrowRight') next.click()
          if(e.key === 'ArrowLeft') prev.click()
          if(e.key === 'Escape') close.click()
        })

        lightboxEl.addEventListener('click', e => {
          e.preventDefault()
          let target = e.target

          if(target === prev) {
            if(i > 0) {
              image.src = larges[i - 1]
              i--
            } else {
              image.src = larges[larges.length - 1]
              i = larges.length - 1
            }
          } else if(target === next) {
            if(i < larges.length - 1) {
              image.src = larges[i + 1]
              i++
            } else {
              image.src = larges[0]
              i = 0
            }
          }

          description.textContent = descriptions[i]
          counter.textContent = `Imagen ${i+1} de ${larges.length}`
        })
      }

      const lightbox = container => {
        let images = getImages(container),
          larges = getLargeImages(images),
          descriptions = getDescriptions(images)

        OpenLightBoxEvent(container, images, larges, descriptions)
      }

      lightbox(d.querySelector('.heroes-container'))
    }
  }, 2000)
}
