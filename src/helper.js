export const validateoperation = (body, allowedUpdates) => {
    const updates = Object.keys(body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))  
    
    return isValidOperation
}

export const checkValidIdLength = (id) => {
    return id.length === 24
}