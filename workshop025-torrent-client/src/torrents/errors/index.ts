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
