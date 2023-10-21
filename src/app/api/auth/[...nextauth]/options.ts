import jwt_decode from "jwt-decode"
import { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

import endpoints from "@/config/endpoints"
import axiosInstance from "@/services/axios"
import { API_BASE_URL } from "@/config/process"
import { DecodedJwt } from "@/types/jwt"
// import { DecodedJwt } from "@/types/jwt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Username/email",
                    type: "text",
                    placeholder: "extheo@stealth.money"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********"
                }
            },
            async authorize(credentials, req) {
                const body = {
                    email: credentials?.email,
                    password: credentials?.password
                }
                const authEndpoint = endpoints.AUTH.LOGIN()

                const res = await fetch(API_BASE_URL+authEndpoint, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })

                const data = await res.json()
                const user = data.data
                if (res.ok && user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout"
    },
    session: {
        // maxAge: 60 * 15 // 15 minutes
        strategy: "jwt"
    },
    callbacks: {
        async signIn({ user }) {
            if (user && user?.token) {
                return true
            } else {
                return false
            }
        },

        async jwt({ token, user }) {
            if (user && user.token) {
                token.id_token = user.token
            }
            return token
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            session.accessToken = undefined
            if (token.id_token) {
                const decoded: DecodedJwt = jwt_decode(token.id_token)
                session.accessToken = token.id_token
                session.user.name = decoded.name
                session.user.type = decoded.type
                session.user.id = decoded.sub
            }
            return session
        }
    }
}
