import Auth0 from 'react-native-auth0';

const AUTH0_DOMAIN = 'dev-i-zgy628.auth0.com';
const CLIENT_ID = 'rRU3IxA97J5diibLrM1jSJIxqcUDrd6a';

export const auth0 = new Auth0({
    domain: `${AUTH0_DOMAIN}`,
    clientId: `${CLIENT_ID}`
});

export {
    auth0,
    AUTH0_DOMAIN,
    CLIENT_ID
};
