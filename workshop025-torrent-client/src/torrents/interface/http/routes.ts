import { type FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { p2pClient } from "../../../p2p/index.js";
import { validateRequest } from "../../../http/validateRequest.js";

// TODO: Validate that this is a magnet link
const startTorrentSchema = z.object({
  body: z.object({
    magnetLink: z.string(),
  }),
});

export const torrentsRoutesPlugin: FastifyPluginAsync = async (server) => {
  server.post("/", async (request, response) => {
    const {
      body: { magnetLink },
    } = await validateRequest(request, startTorrentSchema);

    await p2pClient.startTorrent(magnetLink);

    response.send({ success: true });
  });
};
