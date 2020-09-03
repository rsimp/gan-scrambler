interface Reducer<T, K> {
  (acc: T, curr: K): T;
}

export const chunkReducer = <T>(
  chunckSize: number
): Reducer<Array<Array<T>>, T> => {
  let currentChunk: Array<T>;
  return (accumulator: Array<Array<T>>, currentValue: T) => {
    if (!currentChunk || currentChunk.length === chunckSize) {
      currentChunk = [];
      accumulator.push(currentChunk);
    }
    currentChunk.push(currentValue);
    return accumulator;
  };
};
