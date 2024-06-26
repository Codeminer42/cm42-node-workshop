import { TorrentStatus } from "../domain/Torrent.js";

export abstract class TorrentError extends Error {
  name = "TorrentError";
}

export class TorrentAlreadyExistsError extends TorrentError {
  name = "TorrentAlreadyExistsError";
  code = "TORRENT_ALREADY_EXISTS";
}

export class TorrentDoesNotExistError extends TorrentError {
  name = "TorrentDoesNotExistError";
  code = "TORRENT_DOES_NOT_EXIST";
}

export class TorrentCannotBePausedError extends TorrentError {
  name = "TorrentCannotBePausedError";
  code = "TORRENT_CANNOT_BE_PAUSED";

  constructor(
    public torrentStatus: TorrentStatus.Finished | TorrentStatus.Paused
  ) {
    super();
  }
}

export class TorrentCannotBeResumedError extends TorrentError {
  name = "TorrentCannotBeResumedError";
  code = "TORRENT_CANNOT_BE_RESUMED";

  constructor(
    public torrentStatus: TorrentStatus.Finished | TorrentStatus.Started
  ) {
    super();
  }
}
