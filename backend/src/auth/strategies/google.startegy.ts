import { Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { query } from "express-validator";
import { string } from "joi";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,

    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID', ''),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET', ''),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL', ''),
            scope: ['profile', 'email'],
            passReqToCallback: true,



        });
    }
    async validate(
        req: { query?: { state?: string } },
        accessToken: string,
        refreshToken: string,
        profile: {
            id: string,
            dispayName?: string;
            emails?: Array<{ value: string }>;
            photos?: Array<{ value: string }>;


        },
        done: VerifyCallback

    ) {
        try {
            let role: 'student' | 'instructor' | undefined
            const stateStr = req?.query?.state;
            if (stateStr) {
                try {
                    const parsed = JSON.parse(stateStr);
                    if (parsed.role === 'student' || parsed.role === 'instructor') {
                        role = parsed.role;
                    }

                } catch (error) {
                    // ignore vaild state

                }
            }
        } catch (error) {



        }

    }
}