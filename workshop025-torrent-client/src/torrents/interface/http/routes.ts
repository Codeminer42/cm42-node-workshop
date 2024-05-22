import { type FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { validateRequest } from "../../../http/validateRequest.js";
import { startTorrent } from "../../application/StartTorrent.js";
import { TorrentError } from "../../errors/index.js";
import { TorrentErrorMapper } from "./TorrentErrorMapper.js";

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

    response.status(201).send({ torrent });
  });

  server.setErrorHandler((error, _, response) => {
    if (error instanceof TorrentError) {
      const { status, body } = TorrentErrorMapper.toHttpResponse(error);

      return response.status(status).send(body);
    }

    throw error;
  });
};
