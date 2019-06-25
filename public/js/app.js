const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#message-1')
const secondMessage = document.querySelector('#message-2')

firstMessage.textContent = 'Loading data'
secondMessage.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value.length === 0) {
        firstMessage.textContent = 'Please provide with search term'
    } else {
        fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    firstMessage.textContent = data.error
                } else {
                    console.log(data)
                    firstMessage.textContent = data.location
                    secondMessage.textContent = `
                        ${data.summary}.
                        It's currently ${data.temperature} degress.
                        There's ${data.rainChance} chance of rain
                    `
                }
            })
        })
    }
})

