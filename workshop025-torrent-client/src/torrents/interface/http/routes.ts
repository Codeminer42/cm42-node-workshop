import { type FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { validateRequest } from "../../../http/validateRequest.js";
import { startTorrent } from "../../application/StartTorrent.js";
import { TorrentError } from "../../errors/index.js";
import { TorrentErrorMapper } from "./TorrentErrorMapper.js";
import { getTorrentDetailsById } from "../../application/GetTorrentDetailsById.js";
import { listTorrentsQuery } from "../../queries/ListTorrents.js";

// TODO: Validate that this is a magnet link
const startTorrentSchema = z.object({
  body: z.object({
    magnetLink: z.string(),
  }),
});

const getTorrentDetailsSchema = z.object({
  params: z.object({
    id: z.string(),
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

  server.get("/", async (request, response) => {
    const torrents = await listTorrentsQuery();

    response.send({ count: torrents.length, torrents });
  });

  server.get("/:id", async (request, response) => {
    const {
      params: { id },
    } = await validateRequest(request, getTorrentDetailsSchema);

    const torrent = await getTorrentDetailsById(id);

    response.send({ torrent });
  });

  server.setErrorHandler((error, _, response) => {
    if (error instanceof TorrentError) {
      const { status, body } = TorrentErrorMapper.toHttpResponse(error);

      return response.status(status).send(body);
    }

    throw error;
  });
};
