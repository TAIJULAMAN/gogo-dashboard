import { url } from "../config/envConfig";

export const imageUrl = (image) => {
    if (typeof image === 'string') {
        return image.startsWith('http')
            ? image
            : image.startsWith('/')
                ? `${url}${image}`
                : `${url}${image}`;
    } else {
        return `/avatar.png`;
    }
};
