const ENV = {
dev: {
apiUrl: 'http://192.168.56.1:6969'
},
staging: {
apiUrl: ''
},
prod: {
apiUrl: ''
}
}

function getEnvVars(env) {

if (env === null || env === undefined || env === '') return ENV.dev
if (env.indexOf('dev') !== -1) return ENV.dev
if (env.indexOf('staging') !== -1) return ENV.staging
if (env.indexOf('prod') !== -1) return ENV.prod
}

export default getEnvVars('dev')