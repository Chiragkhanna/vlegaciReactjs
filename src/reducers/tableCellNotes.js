const tableCellNotes = (state = [], action) => {
    switch (action.type) {
        case 'GET_NOTES':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]

        default:
            return state
    }
}

export default tableCellNotes