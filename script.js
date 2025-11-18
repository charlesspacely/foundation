let slide = 1

function updateBackgroundImage (num) {
  const education = document.getElementById('education')
  const healthcare = document.getElementById('healthcare')
  const communityDevelopment = document.getElementById('community_development')

  education.style.backgroundImage = `url('./Education_${num}.jpg')`
  healthcare.style.backgroundImage = `url('./Healthcare_${num}.png')`
  communityDevelopment.style.backgroundImage = `url('./Community_Development_${num}.png')`
}

updateBackgroundImage(slide)
slide++

setInterval(() => {
  if (slide > 2) slide = 1
  updateBackgroundImage(slide)
  slide++
}, 5000)

document.querySelector('#contactForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  document.querySelector('#success_form').classList.add('hide')
  document.querySelector('#error_form').classList.add('hide')

  const submitBtn = document.querySelector('#contactForm button')
  const submitBtnText = submitBtn.textContent
  const formData = new FormData(e.currentTarget)
  const data = Object.fromEntries(formData.entries())
  
  submitBtn.textContent = 'Sending...'
  submitBtn.setAttribute('disabled', 'true')

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  try {

    const response = await fetch('https://helping-hands-api-nine.vercel.app/api/contact-form', options)
    const message = await response.json()
    
    if (message.success) {
      document.querySelector('#contactForm').reset()
      document.querySelector('#success_form').classList.remove('hide')
    } else {
      document.querySelector('#error_form').classList.remove('hide')
    }
  } catch (error) {
    console.log(error)
  } finally {
    submitBtn.textContent = submitBtnText
    submitBtn.removeAttribute('disabled')
  }
})