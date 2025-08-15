import type { BodyType } from "../types.ts";

type Method = "GET" | "POST" | "DELETE" | "UPDATE";
type Headers = Record<string, string>;

const baseUrl = "http://localhost:17000/api/v1";

async function request(
  url: string,
  method: Method = "POST",
  body: BodyType = {},
  headers: Headers = { "Content-Type": "application/json" },
) {
  const response = await fetch(`${baseUrl}${url}`, {
    method,
    body: JSON.stringify(body),
    headers,
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return await response.json();
}

export { request };
