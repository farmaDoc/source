const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {
    const payloadx = JSON.parse(JSON.parse(event.body))

    const now = Date.now()

    const payload = {
        user: payloadx.client,
        ts: now,
        msg: `Si è verificato un errore nella chat. Di seguito sono riportati i dettagli:`,
        ext: `${payloadx.message}\n\n${payloadx.url},\n\n${payloadx.linenumber}\n\n${payloadx.msg}\n\n${payloadx.navigator}`
    }

    return client.queryWithMetrics(
        q.Create(
            q.Collection('Logs'),
            { data: payload }
          )
    ).then(()=>{
        return{
            statusCode: 200,
        }
    })
}