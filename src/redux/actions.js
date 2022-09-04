export const getAllUsers = (data) => {
    return {
        type: "getListUsers",
        payload: data
    }
}


export const handleSearch = (value) => {
    return {
        type: "search",
        payload: value
    }
}

