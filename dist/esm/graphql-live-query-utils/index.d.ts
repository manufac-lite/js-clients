import { Delta } from "@n1ru4l/json-patch-plus";
export type ApplyPatchFunction<PatchPayload = unknown> = (previous: Record<string, unknown>, patch: PatchPayload) => Record<string, unknown>;
export declare const applyJSONDiffPatch: ApplyPatchFunction<Delta>;
export declare const applyLiveQueryJSONDiffPatch: <TExecutionResult = Record<string, unknown>>(source: AsyncIterable<TExecutionResult>) => import("@manufac/repeater").Repeater<TExecutionResult, any, unknown>;
