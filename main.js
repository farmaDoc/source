async function farmadocInit(el){
  let result = await fetch("http://source.farmadoc.it/.netlify/functions/main?key="+el, {
    method: "GET",
    mode: "no-cors",
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=>{
    return res.json()
  })

  let minimizeid = btoa(Math.random().toString()).substring(10,20)
  let contentid = btoa(Math.random().toString()).substring(10,20)
  let minimizeel = btoa(Math.random().toString()).substring(10,20)
  let chatid = btoa(Math.random().toString()).substring(10,20)
  let sendid = btoa(Math.random().toString()).substring(10,20)
  let msgid = btoa(Math.random().toString()).substring(10,20)

  let modal = ''+
  '    <div style="all: unset; background-color: white; box-sizing: border-box; font-family: Arial; z-index: 100000; width: 500px; position: fixed; bottom: 10px; right: 10px; border: 1px solid grey; border-radius: 10px">'+
  '        <div style="all: unset; width: 100%">'+
  '            <div style="width: 80%; padding: 20px; display: inline-block; box-sizing: border-box;">'+
  '                <img style="all: unset; width: 150px;" src="https://i.ibb.co/YB2tmYP/app-farmadoc-it-2-1.png" alt=""><span style="font-style: italic; color: grey;">Chat</span>'+
  '            </div>'+
  '            <div id="'+minimizeid+'" style="all: unset; width: 19%; padding: 20px; display: inline-block; text-align: right; box-sizing: border-box; cursor: pointer; color: grey">'+
  '                <h2 style="all: unset; margin: 0; font-size: 20px" id="'+minimizeel+'">—</h2>'+
  '            </div>'+
  '        </div>'+
  '        <span id="'+contentid+'">'+
  '        <hr style="all: unset; border-top: 1px solid grey; display: block;">'+
  '        <div style="all: unset; width: 100%">'+
  '            <div id="'+chatid+'" style="height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">'+
  ''+
  '                <div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">'+
  '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">'+
  '                        ciao'+
  '                    </span>'+
  '                </div>'+
  ''+
  '                <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">'+
  '                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">'+
  '                        Ciao!'+
  '                    </span>'+
  '                    '+
  '                </div>'+
  '                '+
  '            '+
  '            </div>'+
  '        </div>'+
  '        <hr style="all: unset; border-top: 1px solid grey; display: block;">'+
  '        <div style="all: unset; height: 50px; width: 100%; display: flex; position: relative;">'+
  '            <input id="'+msgid+'" placeholder="Digita qui" type="text" style="all: unset; height: 50px; width: 450px; padding: 20px; box-sizing: border-box;">'+
  '            <div id="'+sendid+'" style="all: unset; width: 50px; height: 50px; display: inline-block; background-color: #33e894; border-radius: 0 0 10px 0; border-left: 1px solid grey; display: flex; align-items: center; text-align: center; cursor: pointer;">'+
  '                <svg style="all: unset; align-self: center; margin: auto;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-send" viewBox="0 0 16 16">'+
  '                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>'+
  '                </svg>'+
  '            </div>'+
  '        </div>'+
  '        </span>'+
  '    </div>'

  document.body.insertAdjacentHTML( 'beforeend', modal )

  let toggle = true

  document.getElementById(minimizeid).addEventListener("click", function(){
    toggle ^= true;
    if(toggle == true){
      document.getElementById(contentid).style.display = "none"
      document.getElementById(minimizeel).innerHTML = "+"
    }else{
      document.getElementById(contentid).style.display = "block"
      document.getElementById(minimizeel).innerHTML = "—"
    }
  })
  
  if(result.authorised){

    document.getElementById(sendid).addEventListener("click", function(){
      let msgsend = '                <div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">'+
      '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">'+
      document.getElementById(msgid).value+
      '                    </span>'+
      '                </div>'
      document.getElementById(msgid).value = ""
      document.getElementById(chatid).insertAdjacentHTML( 'afterbegin', msgsend )
    })
  
    document.getElementById(msgid).addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        let msgsend = '                <div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">'+
        '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">'+
        document.getElementById(msgid).value+
        '                    </span>'+
        '                </div>'
        document.getElementById(msgid).value = ""
        document.getElementById(chatid).insertAdjacentHTML( 'afterbegin', msgsend )
      }
    })
    if(!result.res.activeSub){
      document.getElementById(chatid).style.alignItems = "center"
      document.getElementById(chatid).style.flexDirection = "unset"
      document.getElementById(chatid).innerHTML = "<p style='color: grey'>Questa chat attualmente non è disponibile</p>"
    }
  }else{
    document.getElementById(chatid).style.alignItems = "center"
    document.getElementById(chatid).style.flexDirection = "unset"
    document.getElementById(chatid).innerHTML = "<p style='color: grey'>Questo sito internet non è autorizzato per usare la chat di Farmadoc</p>"
  }
}
