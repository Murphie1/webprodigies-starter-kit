/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as aimessages from "../aimessages.js";
import type * as chats from "../chats.js";
import type * as conversations from "../conversations.js";
import type * as files from "../files.js";
import type * as friends from "../friends.js";
import type * as geminichat from "../geminichat.js";
import type * as http from "../http.js";
import type * as messages from "../messages.js";
import type * as openai from "../openai.js";
import type * as openaitwo from "../openaitwo.js";
import type * as podcasts from "../podcasts.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  aimessages: typeof aimessages;
  chats: typeof chats;
  conversations: typeof conversations;
  files: typeof files;
  friends: typeof friends;
  geminichat: typeof geminichat;
  http: typeof http;
  messages: typeof messages;
  openai: typeof openai;
  openaitwo: typeof openaitwo;
  podcasts: typeof podcasts;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
