import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [organization(), nextCookies()], // nextCookies needs to be the last plugin in the array
});
