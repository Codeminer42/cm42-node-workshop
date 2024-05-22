import { type Torrent as WebTorrentTorrent } from "webtorrent";

import { createTorrent } from "../domain/CreateTorrent.js";
import { StartedTorrent } from "../domain/Torrent.js";

export const webTorrentTorrentMapper = {
  toTorrent: (webTorrentTorrent: WebTorrentTorrent): StartedTorrent => {
    const mappedTorrent = createTorrent({
      id: webTorrentTorrent.infoHash,
      name: webTorrentTorrent.name,
      files: webTorrentTorrent.files.map((file) => ({ name: file.name })),
    });

    return mappedTorrent;
  },
};
