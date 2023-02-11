export const cacheAsyncGetter = <T, Args extends Array<unknown> = []>(
  get: (...args: Args) => Promise<T>,
  ttl: number
): ((...args: Args) => Promise<T>) => {
  let cachedValue: T | null = null;
  let cachedTime: number | null = null;

  return async (...args: Args): Promise<T> => {
    const now = Date.now();

    if (cachedTime !== null && now - cachedTime < ttl) {
      return cachedValue as T;
    }

    cachedValue = await get(...args);
    cachedTime = now;

    return cachedValue;
  };
};
