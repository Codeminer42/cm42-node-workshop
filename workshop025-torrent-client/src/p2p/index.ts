import { promisify } from "node:util";

import WebTorrent, { Torrent } from "webtorrent";

import { config } from "../config/index.js";

const webTorrentClient = new WebTorrent();

const findTorrentByHashOrFail = (hash: string) => {
  const torrent = webTorrentClient.torrents.find(
    (torrent) => torrent.infoHash === hash
  );

  if (!torrent) throw new Error("Torrent does not exist in P2P client");

  return torrent;
};

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

  deleteTorrentByHash: async (hash: string) => {
    const torrent = findTorrentByHashOrFail(hash);

    return new Promise<void>((resolve, reject) => {
      torrent.destroy({ destroyStore: true }, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  },

  pauseTorrentByHash: (hash: string) => {
    const torrent = findTorrentByHashOrFail(hash);

    torrent.pause();
  },

  resumeTorrentByHash: (hash: string) => {
    const torrent = findTorrentByHashOrFail(hash);

    torrent.resume();
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
