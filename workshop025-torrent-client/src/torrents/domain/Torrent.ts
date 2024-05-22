export enum TorrentStatus {
  Started = "Started",
  Paused = "Paused",
  Finished = "Finished",
}

export type TorrentFile = {
  id: string;
  name: string;
};

export type BaseTorrent = {
  id: string;
  name: string;
  files: Array<TorrentFile>;
  startedAt: Date;
};

export type StartedTorrent = BaseTorrent & {
  status: TorrentStatus.Started;
  finishedAt: null;
};

export type PausedTorrent = BaseTorrent & {
  status: TorrentStatus.Paused;
  finishedAt: null;
};

export type FinishedTorrent = BaseTorrent & {
  status: TorrentStatus.Finished;
  finishedAt: Date;
};

export type Torrent = StartedTorrent | PausedTorrent | FinishedTorrent;
