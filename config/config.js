const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env) {
        case 'dev':
            return {
                bd_string: "mongodb+srv://usuario_admin:usuario_admin@clusterapi.xdw9s.mongodb.net/?retryWrites=true&w=majority",
                jwt_pass: "batatafrita2019",
                jwt_expires: "7d"
            }
        
        case 'hml': 
            return {
                bd_string: "mongodb+srv://usuario_admin:usuario_admin@clusterapi.xdw9s.mongodb.net/?retryWrites=true&w=majority",
                jwt_pass: "batatafrita2019",
                jwt_expires: "7d"
        }

        case 'production': 
            return {
                bd_string: "mongodb+srv://usuario_admin:usuario_admin@clusterapi.xdw9s.mongodb.net/?retryWrites=true&w=majority",
                jwt_pass: "batatafrita2019",
                jwt_expires: "7d"

        }
    }
}
console.log(`Iniciando API em ambiente ${env}`)

module.exports = config( )