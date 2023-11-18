const server =
    process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.VITE_APP_SERVER_PORT}/api/v1/`
        : 'https://vees-closet.onrender.com/api/v1/';
export default server;
