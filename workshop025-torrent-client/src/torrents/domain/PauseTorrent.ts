import { TorrentCannotBePausedError } from "../errors/index.js";
import { Torrent, PausedTorrent, TorrentStatus } from "./Torrent.js";

export const pauseTorrent = (torrent: Torrent): PausedTorrent => {
  if (torrent.status !== TorrentStatus.Started) {
    throw new TorrentCannotBePausedError(torrent.status);
  }

  return {
    ...torrent,
    status: TorrentStatus.Paused,
  };
};
