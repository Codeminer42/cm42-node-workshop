export enum TorrentStatus {
  Started = "Started",
  Paused = "Paused",
  Finished = "Finished",
}

export type TorrentFile = {
  id: string;
  name: string;
};

export type Torrent = {
  id: string;
  name: string;
  status: TorrentStatus;
  files: Array<TorrentFile>;
  startedAt: Date;
};
