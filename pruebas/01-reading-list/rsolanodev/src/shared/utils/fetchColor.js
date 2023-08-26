import ColorThief from 'colorthief'

export default url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const colorThief = new ColorThief()
        const color = colorThief.getColor(img)
        resolve(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)
      } catch (error) {
        reject('Failed to fetch color')
      }
    }
  })
}
