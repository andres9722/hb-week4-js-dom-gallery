import md5 from 'md5'

export const getConnection = () => {
  const d = document, c = console.log
  
  const getConnectionScript = setInterval(() => {
    if(d.readyState == 'complete') {
      clearInterval(getConnectionScript)

      const publicKey = 'c443fa04e8c144e8f8a0ffd67a580fe4',
      privateKey = '884764bc040025c43308aa4e9c3f8f508906f903',
      content = document.querySelector('section.heroes-container')

      const ts = Date.now(),
      hash = md5(ts + privateKey + publicKey),
      URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  
      fetch(URL)
        .then(res => res.json())
        .then(res => {
          res.data.results.forEach(e => {
            drawHero(e)
          })
        })
        .catch(err => console.log(err))

        const drawHero = e => {
          const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`
        
          const hero = `
            <div class="hero">
              <h3 class="hero-name">${e.name}</h3>
              <img class="hero-image" src="${image}" alt="${e.name}">
              <p class="hero-description">${e.description}</p>
            </div>
          `

          content.insertAdjacentHTML('beforeEnd', hero)
        }
    }
  }, 10)
}


