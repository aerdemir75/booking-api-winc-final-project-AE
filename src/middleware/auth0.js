import { auth } from 'express-oauth2-jwt-bearer';

const authMiddleware = auth({
    audience: 'https://booking-final-winc',
    issuerBaseURL: 'https://dev-dskirzqk72pz2dx4.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

export default authMiddleware;