import { useApi } from "../../src/GadgetProvider";
import { useGet } from "../../src/useGet";

export interface GadgetSession {
  id: string;
  userId: string | null;
  user: GadgetUser | null;
  [key: string]: any;
}

export interface GadgetUser {
  id: string;
  [key: string]: any;
}

/**
 * Used for fetching the current `Session` record from Gadget. Will suspend while the user is being fetched.
 * @returns The current session
 */
export const useSession = (): GadgetSession => {
  const api = useApi();
  if ("currentSession" in api && "session" in api) {
    const select = (api as any).session.findMany.defaultSelection;
    if ("user" in api) {
      select.userId = true;
      select.user = {
        ...(api.user as any).findMany.defaultSelection,
      };
    }

    const [{ data: session, error }] = useGet(api.currentSession as any, {
      suspense: true,
      select,
    });

    if (error) throw error;
    if (!session) throw new Error("currentSession not found but should be present");
    return session;
  } else {
    throw new Error("api client does not have a Session model");
  }
};