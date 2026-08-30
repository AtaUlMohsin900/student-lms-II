import { Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { query } from "express-validator";
import { string } from "joi";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,

    ) {
        Super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID', ''),
            lientID: configService.get<string>('GOOGLE_CLIENT_SECRE', ''),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL', ''),
            Scope: ['profile', 'email'],
            passReqToCallback: true,



        });
    }
    async validate() {
        req: { query ?: { state?: string } },
        accessToken: string,
            refreshToken: string,
                profile: {
            id: string,
                dispayName ?: { familyName: string, givenName: string },
                emails: [{ value: string }],
                    photos: [{ value: string }]
        }


    }

}

