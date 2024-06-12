import { type Torrent } from "./Torrent.js";

export type TorrentRepository = {
  create: (torrent: Torrent) => Promise<void>;
  update: (torrent: Torrent) => Promise<void>;
  existsById: (torrentId: Torrent["id"]) => Promise<boolean>;
  findOne: (torrentId: Torrent["id"]) => Promise<Torrent | null>;
  list: () => Promise<Array<Torrent>>;
  deleteById: (torrentId: Torrent["id"]) => Promise<void>;
};
