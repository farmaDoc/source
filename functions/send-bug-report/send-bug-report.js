const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
    domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {

    console.log(event.body)

    const payloadx = JSON.parse(event.body)

    console.log(payloadx)

    const now = Date.now()

    const payload = {
        user: payloadx.client,
        ts: now,
        msg: `Si è verificato un errore nella chat. Di seguito sono riportati i dettagli:`,
        ext: `${JSON.stringify(payloadx.message)}\n\n${JSON.stringify(payloadx.navigator)}`
    }

    return client.queryWithMetrics(
        q.Create(
            q.Collection('Logs'),
            { data: payload }
          )
    ).then(()=>{
        return{
            statusCode: 200,
            headers: {
				'Access-Control-Allow-Origin': "*",
				'Access-Control-Allow-Headers': "Content-Type",
				'Content-Type': 'application/json'
			},
            body: "lol"
        }
    })
}