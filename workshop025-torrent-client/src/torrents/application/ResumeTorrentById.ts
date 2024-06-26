import { p2pClient } from "../../p2p/index.js";
import { resumeTorrent } from "../domain/ResumeTorrent.js";
import { Torrent } from "../domain/Torrent.js";
import { TorrentDoesNotExistError } from "../errors/index.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";

export type ResumeTorrentById = (id: Torrent["id"]) => Promise<void>;

export const resumeTorrentById: ResumeTorrentById = async (id) => {
  const torrent = await mikroOrmTorrentRepository.findOne(id);

  if (!torrent) throw new TorrentDoesNotExistError();

  const resumedTorrent = resumeTorrent(torrent);

  p2pClient.resumeTorrentByHash(torrent.id);

  await mikroOrmTorrentRepository.update(resumedTorrent);
};
