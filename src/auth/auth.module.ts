import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt.strategy'; // Si tu utilises des stratégies
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule, // Si tu utilises Passport pour l'authentification
    JwtModule.register({
      secret: 'yourSecretKey', // Utilise une clé secrète sécurisée
      signOptions: { expiresIn: '60s' }, // Durée d'expiration du token
    }),
  ],
  providers: [AuthService], // Inclure JwtStrategy si tu l'utilises JwtStrategy
  exports: [AuthService], // Si tu veux exporter AuthService pour d'autres modules
})
export class AuthModule {}
