
export const addTodo = id => ({
    type: 'GET_NOTES',
    id
})

export const refreshControl = filter => ({
    type: 'REFRESH_CONTROL',
    filter
})

export const generateRum = id => ({
    type: 'GENERATE_RUN',
    id
})

