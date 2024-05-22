import {
  BaseEntity,
  Collection,
  Entity,
  EntityDTO,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Reference,
} from "@mikro-orm/core";
import { TorrentStatus } from "../domain/Torrent.js";

@Entity({ tableName: "torrents" })
export class TorrentEntity extends BaseEntity {
  @PrimaryKey({ type: "varchar", length: 40 })
  id: string;

  @Property({ type: "varchar", length: 256 })
  name: string;

  @Enum({ items: Object.values(TorrentStatus) })
  status: TorrentStatus;

  @Property({ type: "datetime" })
  startedAt: Date;

  @Property({ type: "datetime", nullable: true })
  finishedAt: Date | null;

  @OneToMany({
    entity: "TorrentFileEntity",
    mappedBy: "torrent",
    orphanRemoval: true,
  })
  files: Collection<TorrentFileEntity>;

  constructor(props: EntityDTO<TorrentEntity>) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.status = props.status;
    this.startedAt = props.startedAt;
    this.finishedAt = props.finishedAt;
    this.files = new Collection(
      this,
      props.files.map((file) => new TorrentFileEntity(file))
    );
  }
}

@Entity({ tableName: "torrent_files" })
export class TorrentFileEntity extends BaseEntity {
  @PrimaryKey({ type: "uuid" })
  id: string;

  @Property({ type: "varchar", length: 256 })
  name: string;

  @ManyToOne({ entity: "TorrentEntity", inversedBy: "files" })
  torrent: Reference<TorrentEntity>;

  constructor(props: EntityDTO<TorrentFileEntity>) {
    super();
    this.id = props.id;
    this.name = props.name;
    this.torrent = Reference.createFromPK(TorrentEntity, props.torrent);
  }
}
