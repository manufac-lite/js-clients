import { actionResultRunner } from "./operationRunners.js";
/** Represents a handle to a background action which has been enqueued */
export class BackgroundActionHandle {
    constructor(connection, action, id, options) {
        Object.defineProperty(this, "connection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: connection
        });
        Object.defineProperty(this, "action", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: action
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: id
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    /** Wait for this background action to complete and return the result. */
    async result(options) {
        return (await actionResultRunner(this.connection, this.id, this.action, options)).result;
    }
}
//# sourceMappingURL=BackgroundActionHandle.js.map