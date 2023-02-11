import { cacheAsyncGetter } from "./cache";

jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));

describe("Cache utilities", () => {
  describe("cacheAsyncGetter", () => {
    it("should cache the function result if time has NOT changed", async () => {
      const fn = jest.fn().mockResolvedValueOnce("foo");
      const get = cacheAsyncGetter(fn, 1000);

      expect(await get()).toBe("foo");
      expect(await get()).toBe("foo");
      expect(await get()).toBe("foo");

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should rerun the function result if time HAS changed", async () => {
      const fn = jest.fn().mockResolvedValueOnce("foo");
      const get = cacheAsyncGetter(fn, 1000);

      expect(await get()).toBe("foo");
      expect(await get()).toBe("foo");
      expect(await get()).toBe("foo");
      expect(fn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(999);

      expect(await get()).toBe("foo");
      expect(await get()).toBe("foo");
      expect(await get()).toBe("foo");
      expect(fn).toHaveBeenCalledTimes(1);

      fn.mockResolvedValueOnce("bar");
      jest.advanceTimersByTime(2);

      expect(await get()).toBe("bar");
      expect(await get()).toBe("bar");
      expect(await get()).toBe("bar");
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
