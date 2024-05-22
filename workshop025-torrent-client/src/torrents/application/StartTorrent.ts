import { p2pClient } from "../../p2p/index.js";
import { finishTorrent } from "../domain/FinishTorrent.js";
import { type Torrent } from "../domain/Torrent.js";
import { TorrentAlreadyExistsError } from "../errors/index.js";
import { mikroOrmTorrentRepository } from "../infrastructure/MikroOrmTorrentRepository.js";
import { webTorrentTorrentMapper } from "../infrastructure/WebTorrentTorrentMapper.js";

export const startTorrent = async (magnetLink: string): Promise<Torrent> => {
  const webTorrentTorrent = await p2pClient.startTorrent(magnetLink);

  const torrent = webTorrentTorrentMapper.toTorrent(webTorrentTorrent);

  const torrentAlreadyExists = await mikroOrmTorrentRepository.existsById(
    torrent.id
  );

  if (torrentAlreadyExists) throw new TorrentAlreadyExistsError();

  await mikroOrmTorrentRepository.create(torrent);

  webTorrentTorrent.on("done", () => {
    const finishedTorrent = finishTorrent(torrent);

    mikroOrmTorrentRepository.update(finishedTorrent);
  });

  return torrent;
};
