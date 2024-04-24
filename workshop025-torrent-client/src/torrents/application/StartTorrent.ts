import { p2pClient } from "../../p2p/index.js";
import { TorrentStatus, type Torrent } from "../domain/Torrent.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";
import { webTorrentTorrentMapper } from "../infrastructure/WebTorrentTorrentMapper.js";

export const startTorrent = async (magnetLink: string): Promise<Torrent> => {
  const webTorrentTorrent = await p2pClient.startTorrent(magnetLink);

  const torrent = webTorrentTorrentMapper.toTorrent(webTorrentTorrent);

  await mikroOrmTorrentRepository.create(torrent);

  webTorrentTorrent.on("done", () => {
    mikroOrmTorrentRepository.update({
      ...torrent,
      status: TorrentStatus.Finished,
    });
  });

  return torrent;
};
