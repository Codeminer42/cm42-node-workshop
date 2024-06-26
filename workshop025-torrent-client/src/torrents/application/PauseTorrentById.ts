import { p2pClient } from "../../p2p/index.js";
import { pauseTorrent } from "../domain/PauseTorrent.js";
import { Torrent } from "../domain/Torrent.js";
import { TorrentDoesNotExistError } from "../errors/index.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";

export type PauseTorrentById = (id: Torrent["id"]) => Promise<void>;

export const pauseTorrentById: PauseTorrentById = async (id) => {
  const torrent = await mikroOrmTorrentRepository.findOne(id);

  if (!torrent) throw new TorrentDoesNotExistError();

  const pausedTorrent = pauseTorrent(torrent);

  p2pClient.pauseTorrentByHash(torrent.id);

  await mikroOrmTorrentRepository.update(pausedTorrent);
};
