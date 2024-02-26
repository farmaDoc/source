const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
	secret: process.env.FAUNA_SECRET,
	domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {
    let uid = event.queryStringParameters.uid
    let els = JSON.parse(event.queryStringParameters.obj)
    const finels = els.map(el=>{return{
        ts: el[2],
        farma: el[1],
        int: el[0]
    }})
    await client.query(
        q.Update(q.Ref(q.Collection('User'), uid), {
            data: {
                reqs: q.Append(
                    finels,
                    q.Select(
                        ["data", "reqs"],
                        q.Get(q.Ref(q.Collection('drugs'), farma))
                    )
                )
            }
        })
    )

    /* let promises = []
    els.forEach(el=>{
        promises.push(async function(){
            return await client.query(
                q.Update(q.Ref(q.Collection('intents'), el[0]), {
                    data: {
                        reqs: q.Append(
                            {
                                ts: el[2],
                                farma: el[1]
                            },
                            q.Select(
                                ["data", "reqs"],
                                q.Get(q.Ref(q.Collection('drugs'), farma))
                            )
                        )
                    }
                })
            )
        })
    })
    const result = await Promise.all(promises)
    console.log(result) */
    return{
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': "Content-Type",
            'Content-Type': 'application/json'
        },
        body: "Success"
    }
    /* return client.query(
        q.Get(q.Ref(q.Collection('drugs'), farma))
    ).then(res=>{
        console.log(res)
        if(res.data.reqs){
            return client.query(
                q.Update(q.Ref(q.Collection('drugs'), farma), {
                    data: {
                        reqs: q.Append(
                            {
                                ts: now,
                                intent: int
                            },
                            q.Select(
                                ["data", "reqs"],
                                q.Get(q.Ref(q.Collection('drugs'), farma))
                            )
                        )
                    }
                })
            ).then(()=>{
                return{
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': "*",
                        'Access-Control-Allow-Headers': "Content-Type",
                        'Content-Type': 'application/json'
                    },
                    body: "Success"
                }
            })
        }else{
            return client.query(
                q.Update(q.Ref(q.Collection('drugs'), farma), {
                    data: {
                        reqs: [{
                            ts: now,
                            intent: int
                        }]
                    }
                })
            ).then(()=>{
                return{
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': "*",
                        'Access-Control-Allow-Headers': "Content-Type",
                        'Content-Type': 'application/json'
                    },
                    body: "Success"
                }
            })
        }
    }) */

}