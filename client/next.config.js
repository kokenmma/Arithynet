/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: (() => {
        let compilerConfig = {
            styledComponents: true,
        }
        if (process.env.NODE_ENV === 'production') {
            compilerConfig = {
                ...compilerConfig,
                reactRemoveProperties: {
                    properties: ['^data-testid$']
                },
            }
        }
        return compilerConfig
    })(),
    env: {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
    }
}

module.exports = nextConfig