import { randomUUID } from "crypto";

import { type Torrent, TorrentStatus } from "./Torrent.js";

type CreateTorrentProps = {
  id: string;
  name: string;
  files: Array<{ name: string }>;
};

export const createTorrent = (props: CreateTorrentProps): Torrent => ({
  id: props.id,
  name: props.name,
  status: TorrentStatus.Started,
  files: props.files.map((file) => ({
    id: randomUUID(),
    name: file.name,
  })),
  startedAt: new Date(),
});
