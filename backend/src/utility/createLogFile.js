import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

const createLogFile = async (filename, logMessage) => {
    const LOG_DIR = "./logs";
    const LOG_FILE = path.join(LOG_DIR, filename);

    if (!fsSync.existsSync(LOG_DIR)) {
        await fs.mkdir(LOG_DIR, { recursive: true });
    }

    await fs.appendFile(LOG_FILE, logMessage);
}

export default createLogFile;