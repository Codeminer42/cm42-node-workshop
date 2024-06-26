import { type FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { validateRequest } from "../../../http/validateRequest.js";
import { startTorrent } from "../../application/StartTorrent.js";
import { TorrentError } from "../../errors/index.js";
import { TorrentErrorMapper } from "./TorrentErrorMapper.js";
import { getTorrentDetailsById } from "../../application/GetTorrentDetailsById.js";
import { listTorrentsQuery } from "../../queries/ListTorrents.js";
import { deleteTorrentById } from "../../application/DeleteTorrentById.js";
import { pauseTorrentById } from "../../application/PauseTorrentById.js";
import { resumeTorrentById } from "../../application/ResumeTorrentById.js";

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

const deleteTorrentSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const pauseTorrentSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const continueTorrentSchema = z.object({
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

  server.delete("/:id", async (request, response) => {
    const {
      params: { id },
    } = await validateRequest(request, deleteTorrentSchema);

    await deleteTorrentById(id);

    response.status(204).send();
  });

  server.post("/:id/pause", async (request, response) => {
    const {
      params: { id },
    } = await validateRequest(request, pauseTorrentSchema);

    await pauseTorrentById(id);

    response.status(204).send();
  });

  server.post("/:id/resume", async (request, response) => {
    const {
      params: { id },
    } = await validateRequest(request, continueTorrentSchema);

    await resumeTorrentById(id);

    response.status(204).send();
  });

  server.setErrorHandler((error, _, response) => {
    if (error instanceof TorrentError) {
      const { status, body } = TorrentErrorMapper.toHttpResponse(error);

      return response.status(status).send(body);
    }

    throw error;
  });
};
