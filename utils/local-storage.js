export const setToLocalStorage = (key, value) => {
    if (!key || typeof window === "undefined") {
        return;
    }
    localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
    if (!key || typeof window === "undefined") {
        return null;
    }
    return localStorage.getItem(key);
};

export const getRemoveLocalStorage = (key) => {
    if (!key || typeof window === "undefined") {
        return;
    }
    localStorage.removeItem(key);
};
