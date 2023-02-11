import { NextApiResponse } from "next";
import { getFirst, responder } from "./api";

describe("API utilities", () => {
  describe("getFirst", () => {
    it.each([
      ["foo", "foo"],
      [["foo", "bar"], "foo"],
      [[], undefined],
      [, undefined],
      [[null], null],
    ])(
      "returns the first value of a given array or single value - input: %s, output: %s",
      (input, output) => {
        expect(getFirst(input)).toBe(output);
      }
    );
  });

  describe("responder", () => {
    it.each([
      [{ foo: "bar" }, 200, "json", { foo: "bar" }],
      [undefined, 201, "end", undefined],
    ])(
      "provides a `success` function that takes care of sending 200 / 201 responses with given payload - data: %s, status: %s, method: %s",
      (data, status, method, arg) => {
        const mockRes = { status: jest.fn(), json: jest.fn(), end: jest.fn() };

        mockRes.status.mockReturnValue(mockRes);

        const { success } = responder(
          mockRes as unknown as NextApiResponse<any>
        );

        success(data);

        expect(mockRes.status).toHaveBeenCalledTimes(1);
        expect(mockRes.status).toHaveBeenCalledWith(status);
        expect(mockRes[method]).toHaveBeenCalledTimes(1);

        arg
          ? expect(mockRes[method]).toHaveBeenCalledWith(arg)
          : expect(mockRes[method]).toHaveBeenCalledWith();
      }
    );
  });

  it("provides a `failure` function that takes care of sending error responses responses with given status and message", () => {
    const mockRes = { status: jest.fn(), json: jest.fn() };

    mockRes.status.mockReturnValue(mockRes);

    const { failure } = responder(mockRes as unknown as NextApiResponse<any>);

    failure(418, "foo bar");

    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(418);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: "foo bar" },
    });
  });
});
