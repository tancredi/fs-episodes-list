import { paginate } from "./pagination";

describe("Pagination utilities", () => {
  describe("paginate", () => {
    it.each([
      [
        ["a", "b", "c", "d", "e", "f", "g", "h"],
        0,
        5,
        {
          entries: ["a", "b", "c", "d", "e"],
          pagination: { page: 0, totalPages: 2 },
        },
      ],

      [
        ["a", "b", "c", "d", "e", "f", "g", "h", "e", "f"],
        0,
        5,
        {
          entries: ["a", "b", "c", "d", "e"],
          pagination: { page: 0, totalPages: 2 },
        },
      ],

      [
        ["a", "b", "c", "d", "e", "f", "g", "h", "e", "f", "h"],
        0,
        5,
        {
          entries: ["a", "b", "c", "d", "e"],
          pagination: { page: 0, totalPages: 3 },
        },
      ],

      [
        ["a", "b", "c", "d", "e", "f", "g", "h", "e", "f", "h"],
        1,
        3,
        {
          entries: ["d", "e", "f"],
          pagination: { page: 1, totalPages: 4 },
        },
      ],

      [
        ["a", "b", "c", "d", "e", "f", "g", "h", "e", "f", "h"],
        2,
        5,
        {
          entries: ["h"],
          pagination: { page: 2, totalPages: 3 },
        },
      ],

      [
        ["a", "b"],
        2,
        5,
        {
          entries: [],
          pagination: { page: 2, totalPages: 1 },
        },
      ],
    ])(
      "produces correct pagination object and cuts out expected entries from given array of entries - entries: %s, current page: %s, page size: %s",
      (entries, currentPage, pageSize, result) => {
        expect(paginate(entries, currentPage, pageSize)).toEqual(result);
      }
    );
  });
});
