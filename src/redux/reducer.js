const initState = {
    searchText: "",
    listAllUsers: [],
    inforUser: {}
}

const rootReducer = (state = initState,action) => {
    switch(action.type) {
        case "search": 
            return {...state,searchText: action.payload}
        case "getListUsers": 
            return {...state,listAllUsers: action.payload}
        case "getInforUser": 
            return  {...state,inforUser: action.payload}
        default: 
            return state
    }
}

export default rootReducer