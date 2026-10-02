const THANK_YOU_ACCESS_MAX_AGE_SECONDS = 10 * 60;

export const THANK_YOU_ACCESS_COOKIE = "dglide_thank_you_access";
export const THANK_YOU_ACCESS_PARAM = "submitted";

type CookieResponse = {
  cookies: {
    set: (
      name: string,
      value: string,
      options: {
        httpOnly: boolean;
        sameSite: "lax";
        secure: boolean;
        maxAge: number;
        path: string;
      }
    ) => void;
  };
};

export function grantThankYouAccess<T extends CookieResponse>(response: T): T {
  response.cookies.set(THANK_YOU_ACCESS_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: THANK_YOU_ACCESS_MAX_AGE_SECONDS,
    path: "/thank-you",
  });
  return response;
}

export function withThankYouAccessParam(path: string): string {
  const url = new URL(path, "https://www.dglide.com");
  url.searchParams.set(THANK_YOU_ACCESS_PARAM, "1");
  return `${url.pathname}${url.search}${url.hash}`;
}
