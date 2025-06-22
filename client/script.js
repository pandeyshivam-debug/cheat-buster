/**
 * 1. get form, input and results-container
 * 2. listen for form submission
 * - get email, clear previous content
 * use axios, send email in query, get result 
 */

const form = document.getElementById('search-form')
const input = document.getElementById('search-input')
const resultsContainer = document.getElementById('results-container') 

const API_BASE_URL = "http://localhost:3000/api"

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = input.value.trim()
    resultsContainer.innerHTML = "<p>Searching...</>"

    try {
        const res = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                email: email
            }
        })
        displayBustedResult(res.data)
    } catch(err) {
        if(err.response && err.response.status === 404)
            displaySafeResult(err.response.data.message)
        else if(err.response && err.response.status === 400)
            displayError(err.response.data.error)
        else
            displayError("Could not connect to the server, please try again")
    }
})

const displayBustedResult = (user) => {
    // console.log("Found user:", user);

    resultsContainer.innerHTML = `
        <div class = "card">
            <img src = "${user.picture}" alt = "User picture">
            <h3>Busted!<h3>
            <p><strong>${user.firstName} ${user.lastName}</strong> (${user.age}) was found in our database.</p>
            <p>They live in ${user.city}</p>
        </div>
    `
}

const displaySafeResult = (message) => {
    resultsContainer.innerHTML = `<p class = "safe">${message}</p>`
}

const displayError = (message) => {
    resultsContainer.innerHTML = `<p class = "error">${message}</p>`
}