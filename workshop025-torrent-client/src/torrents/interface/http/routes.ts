import { type FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { validateRequest } from "../../../http/validateRequest.js";
import { startTorrent } from "../../application/StartTorrent.js";

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

    const torrent = await startTorrent(magnetLink);

    return response.send({ torrent });
  });
};
