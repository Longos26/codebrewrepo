// [project]/src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions";


export async function GET(req, res) {
  const handler = NextAuth(authOptions);
  return handler(req, res); // pass the request and response to the NextAuth handler
}

export async function POST(req, res) {
  const handler = NextAuth(authOptions);
  return handler(req, res); // pass the request and response to the NextAuth handler
}
