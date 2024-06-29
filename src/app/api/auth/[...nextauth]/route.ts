/**
 *NextAuthRoute
 * @description API-Route für NextAuth.js Authentifizierung.
 * @remarks
 * Verarbeitet Authentifizierungsanfragen und -antworten.
 * @param {NextApiRequest} req - Die eingehende Anfrage
 * @param {NextApiResponse} res - Die ausgehende Antwort
 * @returns {Promise<void>}
 */
import NextAuth from "next-auth";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
