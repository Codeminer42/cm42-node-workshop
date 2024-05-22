import {
  type FinishedTorrent,
  type StartedTorrent,
  TorrentStatus,
} from "./Torrent.js";

export const finishTorrent = (torrent: StartedTorrent): FinishedTorrent => ({
  ...torrent,
  status: TorrentStatus.Finished,
  finishedAt: new Date(),
});
