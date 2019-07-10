const socket = io()


// Elements 
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML


//options
const { unique_id } = Qs.parse(location.search, { ignoreQueryPrefix: true})

//messages
let allMessages = []



const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight   // total height we can scroll through

    // How far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight   // scrollTop gives distance from top to top of scroll bar so after adding we get distance from top to distance to bottom of scrollbar

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight   //scroll to bottom
    }
}





socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message
    })
    allMessages.push(message)
    let messageJSON = JSON.stringify(allMessages)
    localStorage.setItem('messages', messageJSON)
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('render', () => {
    userMessages = localStorage.getItem('messages')
    userMessagesArray = JSON.parse(userMessages)
    userMessagesArray.forEach(message => {
        const html = Mustache.render(messageTemplate, {
            message: message
        })
        allMessages.push(message)
        $messages.insertAdjacentHTML('beforeend', html)
    })
})



$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //$messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value


    socket.emit('sendMessage', message, (error) => {
        e.target.elements.message.value = ''
        $messageFormInput.focus()

        if(error) {
            return console.log(error)
        }

        console.log('message delivered')
    })
})

socket.emit('join', { unique_id }, (error) => {
    if(error){
        alert(error)
        location.href = '/'
    }
})