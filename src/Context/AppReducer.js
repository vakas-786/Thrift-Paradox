export default (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state
    }
}
