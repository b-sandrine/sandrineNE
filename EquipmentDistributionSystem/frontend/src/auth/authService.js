const storeAuthToken = (token) => {
    localStorage.setItem('token', token)
}

const getAuthToken = () => {
    return localStorage.getItem('token')
}


const removeAuthToken = () => {
    localStorage.removeItem('token')
}

const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
}

const authService = {
    storeAuthToken,
    getAuthToken,
    removeAuthToken,
    isAuthenticated
};

export default authService;