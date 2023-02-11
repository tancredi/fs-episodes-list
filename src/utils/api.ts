import axios from "axios";
import { NextApiResponse } from "next";
import { config } from "src/config";

interface FailurePayload {
  error: { message: string };
}

export const getFirst = <T>(value: T | T[]) =>
  Array.isArray(value) ? value[0] : value;

export const responder = <T>(res: NextApiResponse<T>) => {
  const success = (data: any) =>
    data ? res.status(200).json(data) : res.status(201).end();

  const failure = (code: number, message: string) =>
    (res as NextApiResponse<FailurePayload>)
      .status(code)
      .json({ error: { message } });

  return { success, failure };
};

export const getApiClient = () => axios.create({ baseURL: config.apiUrl });
