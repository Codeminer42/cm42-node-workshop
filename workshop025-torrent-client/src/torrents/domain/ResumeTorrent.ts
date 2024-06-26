import { TorrentCannotBeResumedError } from "../errors/index.js";
import { Torrent, TorrentStatus, StartedTorrent } from "./Torrent.js";

export const resumeTorrent = (torrent: Torrent): StartedTorrent => {
  if (torrent.status !== TorrentStatus.Paused) {
    throw new TorrentCannotBeResumedError(torrent.status);
  }

  return {
    ...torrent,
    status: TorrentStatus.Started,
  };
};
