import { Repeater } from "@manufac/repeater";
/**
 * Create a middleware generator function for applying live query patches on the client.
 */
export const createApplyLiveQueryPatch = (
/* Function which is used for generating the patches */
applyPatch) => (source) => new Repeater(async (push, stop) => {
    const iterator = source[Symbol.asyncIterator]();
    stop.then(() => { var _a; return (_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator); }).catch(console.log);
    let mutableData = null;
    let lastRevision = 0;
    let next;
    // @ts-expect-error bad types
    while ((next = await iterator.next()).done === false) {
        // no revision means this is no live query patch.
        if ("revision" in next.value && next.value.revision) {
            const valueToPublish = {};
            if (next.value.revision === 1) {
                if (!next.value.data) {
                    throw new Error("Missing data.");
                }
                valueToPublish.data = next.value.data;
                mutableData = next.value.data;
                lastRevision = 1;
            }
            else {
                if (!mutableData) {
                    throw new Error("No previousData available.");
                }
                if (!next.value.patch) {
                    throw new Error("Missing patch.");
                }
                if (lastRevision + 1 !== next.value.revision) {
                    throw new Error("Wrong revision received.");
                }
                mutableData = applyPatch(mutableData, next.value.patch);
                valueToPublish.data = { ...mutableData };
                lastRevision++;
            }
            if (next.value.extensions) {
                valueToPublish.extensions = next.value.extensions;
            }
            if (next.value.errors) {
                valueToPublish.errors = next.value.errors;
            }
            await push(valueToPublish);
            continue;
        }
        await push(next.value);
    }
    stop();
});
//# sourceMappingURL=createApplyLiveQueryPatch.js.map