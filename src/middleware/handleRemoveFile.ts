import fs from 'fs';
export const handleRemoveAvatar = (path: string) => {
    if (path) {
        fs.unlink(`./src/public/products/${path}`, (err: any) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        return true;
    } else {
        return false;
    }
};
