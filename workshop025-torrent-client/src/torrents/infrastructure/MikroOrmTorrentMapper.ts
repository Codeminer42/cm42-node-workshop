import { Torrent } from "../domain/Torrent.js";
import { TorrentEntity } from "./TorrentEntity.js";

export const mikroOrmTorrentMapper = {
  toTorrent: (torrentEntity: TorrentEntity): Torrent =>
    ({
      id: torrentEntity.id,
      name: torrentEntity.name,
      status: torrentEntity.status,
      startedAt: torrentEntity.startedAt,
      finishedAt: torrentEntity.finishedAt,
      files: torrentEntity.files.getItems().map((file) => ({
        id: file.id,
        name: file.name,
      })),
    }) as Torrent,

  toEntity: (torrent: Torrent): TorrentEntity =>
    new TorrentEntity({
      id: torrent.id,
      name: torrent.name,
      status: torrent.status,
      startedAt: torrent.startedAt,
      finishedAt: torrent.finishedAt,
      files: torrent.files.map((file) => ({
        id: file.id,
        name: file.name,
        torrent: torrent.id,
      })),
    }),
};
