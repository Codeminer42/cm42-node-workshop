import { p2pClient } from "../../p2p/index.js";
import { Torrent } from "../domain/Torrent.js";
import { TorrentDoesNotExistError } from "../errors/index.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";

export type GetTorrentDetailsById = (id: Torrent["id"]) => Promise<
  Torrent & {
    progress: number;
  }
>;

export const getTorrentDetailsById: GetTorrentDetailsById = async (id) => {
  const torrent = await mikroOrmTorrentRepository.findOne(id);

  if (!torrent) throw new TorrentDoesNotExistError();

  const progress = p2pClient.getTorrentProgressByHash(id);

  return { ...torrent, progress };
};
