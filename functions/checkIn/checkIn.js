const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  domain: 'db.eu.fauna.com'
});

exports.handler = async (event, context) => {

  let clientKey = event.queryStringParameters.key

  console.log(event.headers.origin)

  return client.query(
    q.Get(
      q.Match(
        q.Index('userByKey'),
        clientKey
      )
    )
  ).then(res => {

    let newDoc = res.data
    if(res.data.calls){
      res.data.calls.push(Date.now())
    }else{
      res.data["calls"] = [Date.now()]
    }
    console.log(res.ref)
    return client.query(
      q.Update(
        q.Ref(q.Collection('users'), res.ref.id),
        {
          data: newDoc
        }
      )
    ).then(e=>{

      let doc = {
        authorised: true, res: res.data, uid: res.ref
      }
  
      if(event.headers.origin.includes("farmadoc.it")){
        doc["demo"] = true
      }
  
      console.log(doc)
  
      if (event.headers.origin.includes(res.data.domain)) {
      // if(true) {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': "Content-Type",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(doc)
        }
      } else {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': "Content-Type",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ authorised: false })
        }
      }
    })
  })
}
