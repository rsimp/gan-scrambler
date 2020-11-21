import { chunkReducer } from "app/common/array-reducers";

const SCRAMBLE_SERVICE_UUID = 0xfff0;
const SCRAMBLE_CHARACTERISTIC_UUID = 0xfff3;

const moveMap: Record<string, number> = {
  R: 0,
  R2: 1,
  "R'": 2,
  F: 3,
  F2: 4,
  "F'": 5,
  D: 6,
  D2: 7,
  "D'": 8,
  L: 9,
  L2: 10,
  "L'": 11,
  B: 12,
  B2: 13,
  "B'": 14,
};

export function getGANEncoding(scramble: string): Uint8Array {
  return new Uint8Array(
    scramble
      .split(" ")
      .map((move) => moveMap[move])
      .reduce(chunkReducer(2), [])
      .map((moves) => moves[0] * 16 + (moves[1] ?? 15))
  );
}

export const executeScramble = async (
  robotServer: BluetoothRemoteGATTServer | null,
  scramble: string
): Promise<void> => {
  try {
    if (robotServer) {
      const scrambleService = await robotServer.getPrimaryService(
        SCRAMBLE_SERVICE_UUID
      );
      const scrambleExecuteCharacteristic = await scrambleService.getCharacteristic(
        SCRAMBLE_CHARACTERISTIC_UUID
      );

      await scrambleExecuteCharacteristic.writeValue(getGANEncoding(scramble));
    }
  } catch (error) {
    console.log(error);
  }
};
