const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id,  room}) => {
    // Clean the data
    // username = username.trim().toLowerCase()
    // room = room.trim().toLowerCase()

    // validate the data
    if(!room){
        return {
            error: 'Please provide match id'
        }
    }

    // // Check for existing user
    // const existingUser = users.find((user) => {
    //     return user.room === room && user.username === username
    // })

    // // validate username
    // if(existingUser){
    //     return {
    //         error: 'Username is in use!'
    //     }
    // }

    // store user
    const user = { id, room}
    users.push(user)
    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if(index !== -1){
        return users.splice(index, 1)[0]    //returns the user that was removed
    }
}


const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    // room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}