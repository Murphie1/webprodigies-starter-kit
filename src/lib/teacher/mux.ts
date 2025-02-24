import Mux from "@mux/mux-node";

export const mux = new Mux({
  tokenId: process.env.SECOND_MUX_TOKEN_ID,
  tokenSecret: process.env.SECOND_MUX_SECRET_KEY,
});
