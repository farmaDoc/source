const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {

    const CORS_HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': '*',
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: CORS_HEADERS
        };
    }

    let msg = event.queryStringParameters.msg
    let payload = {
        "chat": [
            {
                "type": "sent",
                "msg": `${msg}`
            }
        ],
        "user": "60ba7c61-719c-4316-86ea-8023710765a0",
        "open": true
    }

    return client.query(
        q.Create("supportTickets", { data: payload })
    ).then(res=>{
        return{
            statusCode: 200,
            headers: CORS_HEADERS
        }
    })
}