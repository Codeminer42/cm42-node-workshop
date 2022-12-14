import { Transform } from "node:stream";

/**
 * 
  {
    total_kills: 45;
    players: ["Dono da bola", "Isgalamido", "Zeh"]
    kills: {
      "Dono da bola": 5,
      "Isgalamido": 18,
      "Zeh": 20
    }
  }
 */

const players = [];
let totalKills = 0;

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const line = chunk.toString();
    const parts = line.split(" ");
    const action = parts[2];

    if (action?.includes("Kill")) {
      totalKills += 1;

      callback(null, `\rTotal Kills: ${totalKills}`);
      // setTimeout(() => {
      // }, 250);

      return;
    }

    if (action?.includes("Shutdown")) {
      callback(null, `\nGAME OVER\n`);

      this.emit("close");
      return;
    }

    callback(null, "");
  },
});

export default transformStream;
