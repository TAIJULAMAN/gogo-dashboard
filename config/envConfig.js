export const url = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const getBaseUrl = () => {
    return `${url}/api/v1`;
};
