// src/app/api/auth/[...nextauth]/googleAuthConfig.ts
import GoogleProvider from "next-auth/providers/google";

export const googleAuthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.name,
      username: profile.email,
      email: profile.email,
      image: profile.picture,
      role: "user",
    }
  },
};

export const GoogleAuth = GoogleProvider(googleAuthConfig);
