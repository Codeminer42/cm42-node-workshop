import { type FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { p2pClient } from "../../../p2p/index.js";
import { validateRequest } from "../../../http/validateRequest.js";
import { mikroOrmTorrentRepository } from "../../infrastructure/MikroOrmTorrentRepository.js";
import { webTorrentTorrentMapper } from "../../infrastructure/WebTorrentTorrentMapper.js";
import { TorrentStatus } from "../../domain/Torrent.js";

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

    const webTorrentTorrent = await p2pClient.startTorrent(magnetLink);

    const torrent = webTorrentTorrentMapper.toTorrent(webTorrentTorrent);

    await mikroOrmTorrentRepository.create(torrent);

    webTorrentTorrent.on("done", () =>
      mikroOrmTorrentRepository.update({
        ...torrent,
        status: TorrentStatus.Finished,
      })
    );

    return response.send({ torrent });
  });
};
