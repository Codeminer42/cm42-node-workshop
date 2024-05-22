export abstract class TorrentError extends Error {
  name = "TorrentError";
}

export class TorrentAlreadyExistsError extends TorrentError {
  name = "TorrentAlreadyExistsError";
  code = "TORRENT_ALREADY_EXISTS";
}
