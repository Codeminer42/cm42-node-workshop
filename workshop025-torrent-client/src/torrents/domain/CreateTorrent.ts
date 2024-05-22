import { randomUUID } from "node:crypto";

import { TorrentStatus, StartedTorrent } from "./Torrent.js";

type CreateTorrentProps = {
  id: string;
  name: string;
  files: Array<{ name: string }>;
};

export const createTorrent = (props: CreateTorrentProps): StartedTorrent => ({
  id: props.id,
  name: props.name,
  status: TorrentStatus.Started,
  files: props.files.map((file) => ({
    id: randomUUID(),
    name: file.name,
  })),
  startedAt: new Date(),
  finishedAt: null,
});
