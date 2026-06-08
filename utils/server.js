import { url } from "../config/envConfig";

export const imageUrl = (image, name = "") => {
    if (typeof image === 'string' && image.trim() !== '') {
        return image.startsWith('http')
            ? image
            : image.startsWith('/')
                ? `${url}${image}`
                : `${url}/${image}`;
    }
    const safeName = encodeURIComponent(name.trim());
    return `https://ui-avatars.com/api/?name=${safeName || "User"}&background=2D8C3C&color=fff`;
};
