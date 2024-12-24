import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 44349
    withCredentials: true,
});

api.interceptors.response.use(
    (next) => {
        return Promise.resolve(next);
    },
    async (err) => {
        const status = err?.response?.status || null;

        if (status === 401){
            // TODO update this interceptory
            // const { logout } = useContext(authContext);
            window.location.href = "/login"
            console.log(`Jwt Token Expired. Time: ${new Date()}`)
            // logout();
        }

        return Promise.reject(err);
    }
)

export default api;