const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI ||
        process.env.MONGODB_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGODB_PORT || '27017') +
        '/apigestiondebudget'
}

export default config;