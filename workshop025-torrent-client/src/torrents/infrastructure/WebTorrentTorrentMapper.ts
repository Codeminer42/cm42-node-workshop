import { type Torrent as WebTorrentTorrent } from "webtorrent";

import { type Torrent } from "../domain/Torrent.js";
import { createTorrent } from "../domain/CreateTorrent.js";

export const webTorrentTorrentMapper = {
  toTorrent: (webTorrentTorrent: WebTorrentTorrent): Torrent => {
    const mappedTorrent = createTorrent({
      id: webTorrentTorrent.infoHash,
      name: webTorrentTorrent.name,
      files: webTorrentTorrent.files.map((file) => ({ name: file.name })),
    });

    return mappedTorrent;
  },
};
