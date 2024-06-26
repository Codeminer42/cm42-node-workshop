import { p2pClient } from "../../p2p/index.js";
import { Torrent } from "../domain/Torrent.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";

export type ListTorrentsQuery = () => Promise<
  Array<
    Pick<Torrent, "id" | "name" | "status" | "startedAt"> & {
      progress: number;
    }
  >
>;

export const listTorrentsQuery: ListTorrentsQuery = async () => {
  const torrents = await mikroOrmTorrentRepository.list();

  return torrents.map((torrent) => ({
    id: torrent.id,
    name: torrent.name,
    status: torrent.status,
    startedAt: torrent.startedAt,
    progress: p2pClient.getTorrentProgressByHash(torrent.id),
  }));
};
