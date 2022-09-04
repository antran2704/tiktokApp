const initState = {
    searchText: "",
    listAllUsers: []
}


const rootReducer = (state = initState,action) => {
    switch(action.type) {
        case "search": 
            return {...state,searchText: action.payload}
        case "getListUsers": 
            return {...state,listAllUsers: action.payload}
        default: 
            return state
    }
}

export default rootReducer