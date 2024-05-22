import { promisify } from "node:util";

import WebTorrent, { Torrent } from "webtorrent";

import { config } from "../config/index.js";

const webTorrentClient = new WebTorrent();

export const p2pClient = {
  startTorrent: async (magnetLink: string) => {
    const existingTorrent = webTorrentClient.torrents.find(
      (torrent) => torrent.magnetURI === magnetLink
    );

    if (existingTorrent) return existingTorrent;

    const torrent = await new Promise<Torrent>((resolve) =>
      webTorrentClient.add(
        magnetLink,
        { path: config.torrent.storagePath },
        resolve
      )
    );

    return torrent;
  },
};

export const p2p = {
  shutdown: async () => {
    const promisifiedDestroy = promisify(
      webTorrentClient.destroy.bind(webTorrentClient)
    );

    await promisifiedDestroy();
  },
};
