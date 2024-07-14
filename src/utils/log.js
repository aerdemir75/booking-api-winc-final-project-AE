import { createWriteStream } from "fs";
import { Transform } from "stream";

class PinoPretty extends Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(chunk, encoding, callback) {
        const log = JSON.parse(chunk.toString());
        const prettyLog = `${log.level}: ${log.msg}`;
        this.push(prettyLog);
        callback();
    }
}

const logger = {
    level: "silent",
    fatal: (message) => console.log(`FATAL: ${message}`),
    error: (message) => console.log(`ERROR: ${message}`),
    warn: (message) => console.log(`WARN: ${message}`),
    info: (message) => console.log(`INFO: ${message}`),
    debug: (message) => console.log(`DEBUG: ${message}`),
    trace: (message) => console.log(`TRACE: ${message}`),
};

if (process.env.NODE_ENV !== "production") {
    logger.level = "info";
    const prettyStream = new PinoPretty();
    prettyStream.pipe(process.stdout);

    logger.fatal = (message) => prettyStream.write(`{"level":"fatal","msg":"${message}"}`);
    logger.error = (message) => prettyStream.write(`{"level":"error","msg":"${message}"}`);
    logger.warn = (message) => prettyStream.write(`{"level":"warn","msg":"${message}"}`);
    logger.info = (message) => prettyStream.write(`{"level":"info","msg":"${message}"}`);
    logger.debug = (message) => prettyStream.write(`{"level":"debug","msg":"${message}"}`);
    logger.trace = (message) => prettyStream.write(`{"level":"trace","msg":"${message}"}`);

    logger.fatal("Fatal message");
    logger.error("Error message");
    logger.warn("Warn message");
    logger.info("Info message");
    logger.debug("Debug message");
    logger.trace("Trace message");
}

export default logger;