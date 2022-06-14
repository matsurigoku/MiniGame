const fs = require("fs");
const path = require('path');

module.exports = {
    b64_to_utf8(str) {
        return unescape(decodeURIComponent(Buffer.from(str, "base64")));
    },

    readDirAll(dir, fileHandler, dirHandler) {
        const dirents = fs.readdirSync(dir, { withFileTypes: true });

        return Promise.all(dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);

            if (dirent.isDirectory()) {
                if (dirHandler) {
                    dirHandler(res);
                }

                return this.readDirAll(res, fileHandler, dirHandler);
            } else {
                if (fileHandler) {
                    fileHandler(res);
                }

                return res;
            }
        }));
    },
}