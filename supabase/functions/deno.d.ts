declare namespace Deno {
  export function serve(handler: (req: Request) => Promise<Response> | Response): void;
  export const env: {
    get(key: string): string | undefined;
  };
}
