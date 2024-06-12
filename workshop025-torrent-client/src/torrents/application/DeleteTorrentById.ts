import { p2pClient } from "../../p2p/index.js";
import { Torrent } from "../domain/Torrent.js";
import { TorrentDoesNotExistError } from "../errors/index.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";

export type DeleteTorrentById = (id: Torrent["id"]) => Promise<void>;

export const deleteTorrentById: DeleteTorrentById = async (id) => {
  const torrentExists = await mikroOrmTorrentRepository.existsById(id);

  if (!torrentExists) throw new TorrentDoesNotExistError();

  await mikroOrmTorrentRepository.deleteById(id);

  await p2pClient.deleteTorrentByHash(id);
};
