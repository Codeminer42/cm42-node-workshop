import { entityManager } from "../../database/index.js";
import { type TorrentRepository } from "../domain/TorrentRepository.js";
import { mikroOrmTorrentMapper } from "./MikroOrmTorrentMapper.js";
import { TorrentEntity } from "./TorrentEntity.js";

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

  existsById: async (torrentId) => {
    const torrent = await torrentEntityManager.findOne(TorrentEntity, {
      id: torrentId,
    });

    return Boolean(torrent);
  },

  findOne: async (torrentId) => {
    const torrentEntity = await torrentEntityManager.findOne(TorrentEntity, {
      id: torrentId,
    });

    if (!torrentEntity) return null;

    return mikroOrmTorrentMapper.toTorrent(torrentEntity);
  },

  list: async () => {
    const torrentEntities = await torrentEntityManager.findAll(TorrentEntity, {
      populate: ["files"],
    });

    return torrentEntities.map((entity) =>
      mikroOrmTorrentMapper.toTorrent(entity)
    );
  },
};
