import { Torrent } from "../domain/Torrent.js";
import { TorrentDoesNotExistError } from "../errors/index.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";

export type GetTorrentDetailsById = (id: Torrent["id"]) => Promise<Torrent>;

export const getTorrentDetailsById: GetTorrentDetailsById = async (id) => {
  const torrent = await mikroOrmTorrentRepository.findOne(id);

  if (!torrent) throw new TorrentDoesNotExistError();

  return torrent;
};
