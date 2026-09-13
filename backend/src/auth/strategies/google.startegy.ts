import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService, GoogleProfile } from "../auth.service";

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
            id: string;
            displayName?: string;
            emails?: Array<{ value: string }>;
            photos?: Array<{ value: string }>;
        },
        done: VerifyCallback
    ) {
        try {
            let role: 'student' | 'instructor' | undefined;
            const stateStr = req?.query?.state;
            if (stateStr) {
                try {
                    const parsed = JSON.parse(stateStr);
                    if (parsed.role === 'student' || parsed.role === 'instructor') {
                        role = parsed.role;
                    }
                } catch (error) {
                    // ignore invalid state
                }
            }

            const googleProfile: GoogleProfile = {
                id: profile.id,
                displayName: profile.displayName,
                emails: profile.emails,
                photos: profile.photos,
            };

            const user = await this.authService.findOrCreateFromGoogle(
                googleProfile,
                role
            );
            return done(null, user);
        } catch (err) {
            return done(err as Error, false);
        }
    }
}