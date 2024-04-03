import { type TorrentRepository } from "../domain/TorrentRepository.js";
import { entityManager } from "../../database/index.js";
import { mikroOrmTorrentMapper } from "./MikroOrmTorrentMapper.js";

const torrentEntityManager = entityManager.fork();

export const mikroOrmTorrentRepository: TorrentRepository = {
  create: async (torrent) => {
    const torrentEntity = mikroOrmTorrentMapper.toEntity(torrent);

    await torrentEntityManager.persistAndFlush(torrentEntity);
  },
  update: async (torrent) => {
    const torrentEntity = mikroOrmTorrentMapper.toEntity(torrent);

    await torrentEntityManager.transactional(async (transactionalManager) => {
      await transactionalManager.upsert(torrentEntity);
      await transactionalManager.upsertMany(torrentEntity.files.getItems());
    });
  },
};
