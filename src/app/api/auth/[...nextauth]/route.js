//route.js api/auth/[]...nextauth]
import mongoose from "mongoose";
import {User} from '@/models/User';
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
secret: process.env.SECRET,
adapter: MongoDBAdapter(clientPromise),

  providers:[
    GoogleProvider({
      redirect_uri: process.env.REDIRECT_URI,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
      CredentialsProvider({
          name: "Credentials",
          id:'credentials',
          credentials: {
           
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            const email =  credentials?.email;
            const password = credentials?.password;

            mongoose.connect(process.env.MONGO_URI);
            const user = await User.findOne({ email }); //const user = await User.findOne({{ email }] });
            const passwordOk = user && bcrypt.compareSync(password, user.password);
            
            if (passwordOk)  {
              return user;
            }

            return null
          }
        })
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }