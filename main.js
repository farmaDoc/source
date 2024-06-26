async function farmadocInit(el) {

    
  /* window.onerror = function(msg, url, linenumber) {
    window.alert("error detected")
    return true
    fetch(urlServer + ".netlify/functions/send-bug-report",{
      method: "POST",
      body: {
        message: msg,
        url: url,
        linenumber: linenumber,
        navigator: navigator,
        client: uid
      }
    })
  } */

  let nav
  let regex = /^[0-9]{0,25}$/;
  let opzioni = [];
  let domandaBranch;
  let rimedi = [];
  let currisp = ""
  let tempDiramsData = [];
  let diramCount = 0;
  let risposteBranch = [];
  let lastDomanda = false;
  let uid;
  let inventoryLoaded = false;
  let urlServer = "https://source.farmadoc.it/"
  // let urlServer = "http://localhost:8888/";

  nav = navigator

  let result = await fetch(
    urlServer + ".netlify/functions/checkIn?key=" + el,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
    });
  let ServData = result?.res?.serv
  uid = result?.uid['@ref']?.id;


  try{

  let userMail = result?.res?.persMailContact;
  let userPhone = result?.res?.phoneContact;
  
  let usrIntents = await fetch(
    urlServer + ".netlify/functions/getIntents?createdBy=" +
    result?.res?.id,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
    });

  usrIntents = usrIntents.res;
  /* console.log("USR INTENTS ", usrIntents); */

  let sysIntents = await fetch(
    urlServer + ".netlify/functions/getIntents?createdBy=system",
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      //console.log(error);
    });

  async function getInventory() {
    const respo = await fetch(
      urlServer + ".netlify/functions/getInventory?uid=" + uid,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const drug = await respo.json();
    inventoryLoaded = true;
    drugIndex = drug.res.data.map(x => {
      return ({ name: x.data.name, remedyId: x.ref['@ref'].id })
    })

    return drugIndex;
  }

  sysIntents = sysIntents.res;
  /* console.log("SYS INTENTS ", sysIntents); */

  let intents = sysIntents.concat(usrIntents);
  /* console.log("GLOBAL INTENTS", intents);
  console.log("GLOBAL INTENTS length ", intents.length); */

  let minimizeid = btoa(Math.random().toString()).substring(10, 20);
  let contentid = btoa(Math.random().toString()).substring(10, 20);
  let minimizeel = btoa(Math.random().toString()).substring(10, 20);
  let chatid = btoa(Math.random().toString()).substring(10, 20);
  let sendid = btoa(Math.random().toString()).substring(10, 20);
  let msgid = btoa(Math.random().toString()).substring(10, 20);
  let servbtnid = btoa(Math.random().toString()).substring(10, 20);
  let width = screen.width < 960 ? "calc(100% - 20px)" : "500px";

  let demo = ""

  if (result.demo) {
    demo = "Demo "
  }

  let modal = `
        <div id="farmadocchat" style="all: unset; background-color: white; box-sizing: border-box; font-family: Arial; z-index: 100000; width: ${width}; position: fixed; bottom: 10px; right: 10px; border: 1px solid grey; border-radius: 10px">
          <div style="all: unset; width: 100%">
            <div style="width: calc(90% - 40px); padding: 20px; display: inline-block; box-sizing: border-box;">
              <img style="all: unset; width: 150px;" src="https://i.ibb.co/YB2tmYP/app-farmadoc-it-2-1.png" alt=""><span style="font-style: italic; color: grey;">${demo}Chat</span>
            </div>
            <div id="${minimizeid}" style="all: unset; width: calc(25% - 40px); padding: 20px; display: inline-block; text-align: right; box-sizing: border-box; cursor: pointer; color: grey">
              <h2 style="all: unset; margin: 0; font-size: 20px" id="${minimizeel}">—</h2>
            </div>
          </div>
          <div id="chat-wrap">
            <hr style="all: unset; border-top: 1px solid grey; display: block;">
            <div class="buttons" style="padding: 10px; display: flex; justify-content: flex-end; color: grey;">
              <span id="${servbtnid}-chat" class="search-prod-btn" style="display: none; padding: 5px 10px; border: solid 1px #cecece; cursor: pointer; border-radius: 10px; margin-left: 20px;">
                <svg style="transform: translateY(2px);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Torna alla chat
              </span>  
              <span id="${servbtnid}-prod" class="search-prod-btn" style="display: block; padding: 5px 10px; border: solid 1px #cecece; cursor: pointer; border-radius: 10px; margin-left: 20px;">
                <svg style="transform: translateY(2px);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                Ricerca prodotti
              </span>
              <span id="${servbtnid}-serv" class="search-prod-btn" style="display: block; padding: 5px 10px; border: solid 1px #cecece; cursor: pointer; border-radius: 10px; margin-left: 20px;">
                <svg style="transform: translateY(2px);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-medical" viewBox="0 0 16 16">
                  <path d="M8.5 4.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L7 6l-.549.317a.5.5 0 1 0 .5.866l.549-.317V7.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L9 6l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V4.5zM5.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                </svg>
                Visualizza i servizi
              </span>
            </div>
            <hr style="all: unset; border-top: 1px solid grey; display: block;">
            <div id="${contentid}-prod" style="display: none">
              <div style="all: unset; width: 100%">
                <div id="${chatid}-prod" style="height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">
                  <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">
                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">  
                      Inizia scrivendo il nome del prodotto
                    </span>
                  </div>
                </div>
              </div>
              <div id="lista-prod" style="display: none; position: absolute; background-color: white; transform: translateX(-2px); width: 100%; bottom: 50px; z-index: 20; border: 2px solid #72E49A;"></div>
              <hr style="all: unset; border-top: 1px solid grey; display: block;">
              <div style="all: unset; height: 50px; width: 100%; display: flex; position: relative;">
                <input id="${msgid}-prod" placeholder='Digita il nome del prodotto che stai cercando' type="text" style="all: unset; height: 50px; width: 450px; padding: 20px; box-sizing: border-box;">
              </div>
            </div>
            <div id="${contentid}-serv" style="display: none">
              <div style="all: unset; width: 100%">
                <div style="height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">
                  <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">
                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">  
                      ${ServData}
                    </span>
                  </div>
                </div>
              </div>
              <hr style="all: unset; border-top: 1px solid grey; display: block;">
              <div style="all: unset; height: 50px; width: 100%; display: flex; position: relative;">
              </div>
            </div>
            <div id="${contentid}">
              <div style="all: unset; width: 100%;">
              <div id="${chatid}" style="position: relative; height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">
                  <div class="help" style="position: absolute; right: 0; top: 0; background-color: #fff; border-left: solid 1px grey; border-bottom: solid 1px grey;">
                    <a href="#help" id="openFeedback" style="text-decoration: none; font-size: 12px; padding: 2px 5px; display: inline-flex; justify-content: center; align-items: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 15px; width: 15px; margin-right: 5px;">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                      </svg>
                      <span>Aiuto</span>
                    </a>
                  </div>

                  <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">
                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
                      Ciao!
                    </span><br />
                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
                      Come posso aiutarti?
                    </span><br />
                  </div>
                </div>
              </div>
              <hr style="all: unset; border-top: 1px solid grey; display: block;">
              <div style="all: unset; height: 50px; width: 100%; display: flex; position: relative;">
                <input id="${msgid}" placeholder='Digita il tuo sintomo es. "ho la tosse secca"' type="text" style="all: unset; height: 50px; width: 450px; padding: 20px; box-sizing: border-box;">
                <div id="${sendid}" style="all: unset; width: 50px; height: 50px; display: inline-block; min-width: 50px; background-color: #33e894; border-radius: 0 0 10px 0; border-left: 1px solid grey; display: flex; align-items: center; text-align: center; cursor: pointer;">
                  <svg style="all: unset; align-self: center; margin: auto;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div id="feedback" style="display: none; position: absolute; top: 0; left: 0; background-color: rgba(255,255,255,0.9); height: 100%; width: 100%; border-radius: 9px">
            <div id="questions">
              <div style="padding: 0 20px; display: inline-flex; justify-content: space-between; align-items: center; width: calc(100% - 40px)">
                <h2 style="margin-bottom: 10px">
                  Aiuto
                </h2>
                <div class="backtochat" style="cursor: pointer; padding: 20px;">X</div>
              </div>
              <hr style="all: unset; border-top: 1px solid grey; display: block;">
              <div class="help-content" style="padding: 20px">
                <div style="margin-bottom: 20px">Si prega di spiegare cosa è successo, selezionare tutte le opzioni applicabili:</div>
                <style>
                  .question input[type="checkbox"] {
                    cursor: pointer;
                    margin: 0 5px 0 0;
                  }
                  .question {
                    margin-bottom: 5px;
                  }
                  .question label {
                    font-size: 14px;
                  }
                </style>
                <div style="display: flex; flex-direction: column; margin-bottom: 20px">
                  <div class="question">
                    <input type="checkbox" class="checkQst" value="non capisco la domanda" name="domanda" /><label for="domanda">Non capisco la domanda</label>
                  </div>
                  <div class="question">
                    <input type="checkbox" class="checkQst" value="Ho trovato un errore di battitura" name="battitura" /><label for="battitura">Ho trovato un errore di battitura</label>
                  </div>
                  <div class="question">
                    <input type="checkbox" class="checkQst" value="Non trovo una soluzione al mio problema" name="soluzione" /><label for="soluzione">Non trovo una soluzione al mio problema</label>
                  </div>
                  <div class="question">
                    <input type="checkbox" class="checkQst" value="La chat non mi fornisce risposte utili" name="inutili" /><label for="inutili">La chat non mi fornisce risposte utili</label>
                  </div>
                  <div class="question">
                    <input type="checkbox" class="checkQst" value="La chat si blocca e non posso procedere" name="bloccata" /><label for="bloccata">La chat si blocca e non posso procedere</label>
                  </div>
                  <div style="margin-top: 10px;">
                    <span>si prega di dettagliare l'errore riscontrato:</span>
                    <textarea id="feedbackText" rows="5" style="margin: 10px 0; padding: 5px; width: calc(100% - 12px); max-height: 120px; resize: none;"></textarea>
                  </div>
                  <button id="sendFb" type="text" disabled style="cursor: pointer; width: 100%; border-radius: 5px; background-color: #33e894; border: none; padding: 10px;">Invia feedback</button>
                </div>
              </div>
            </div>
            <div id="thankyou">
              <div style="padding: 0 20px; display: inline-flex; justify-content: space-between; align-items: center; width: calc(100% - 40px)">
                <h2 style="margin-bottom: 10px">Aiuto</h2>
                <div class="backtochat" style="cursor: pointer; padding: 20px;">X</div>
              </div>
              <hr style="all: unset; border-top: 1px solid grey; display: block;">
              <div class="help-content" style="padding: 20px">
                <h3>Grazie!</h3>
                <h4>Il feedback è stato inviato correttamente.</h4>
                <button type="text" class="backtochat" style="cursor: pointer; width: 100%; border-radius: 5px; background-color: #33e894; border: none; padding: 10px;">Torna alla chat</button>
              </div>
            </div>
          </div>
        </div>
      `;


  async function createTicket(feedback) {

    const respo = await fetch(urlServer + ".netlify/functions/createTicket?msg=" + feedback,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const ticketID = await respo.text();
    return {
      statusCode: response.status,
      body: ticketID,
    };
  }


  document.addEventListener('click', function (e) {
    let helpBtn = document.getElementById('sendFb');
    let fbCheckboxes = [...document.querySelectorAll('.checkQst')]

    if (fbCheckboxes.some(x => x.checked)) {
      helpBtn.disabled = false;
    } else {
      helpBtn.disabled = true;
    }

    if (e.target == helpBtn) {
      document.getElementById('questions').style.display = 'none';
      document.getElementById('thankyou').style.display = 'block';
      let feedbackScope = fbCheckboxes.filter(x => x.checked)[0].value;
      let feedbackNote = document.getElementById('feedbackText').value;
      createTicket(`Problema: ${feedbackScope} \n
                    Note: ${feedbackNote}`);
      document.getElementById('feedbackText').value = "";
      fbCheckboxes.filter(x => x.checked).map(y => y.checked = false);
    }
  })

  document.body.insertAdjacentHTML("beforeend", modal);
  let toggle = false;

  document.getElementById(minimizeid).addEventListener("click", function () {
    toggle ^= true;
    if (toggle == true) {
      document.getElementById("chat-wrap").style.display = "none";
      document.getElementById(minimizeel).innerHTML = "+";
    } else {
      document.getElementById("chat-wrap").style.display = "block";
      document.getElementById(minimizeel).innerHTML = "—";
    }
  });

  let closeFb = [...document.querySelectorAll(".backtochat")]
  let feedbackWindow = document.getElementById('feedback');

  closeFb.map(x => {
    document.addEventListener('click', function (e) {
      if (e.target === x) {
        feedbackWindow.style.display = "none";
      }
    })
  })

  let openFb = document.getElementById("openFeedback");
  document.addEventListener('click', function (e) {
    if (e.target === openFb || e.target.parentElement === openFb) {
      document.getElementById('questions').style.display = 'block';
      document.getElementById('thankyou').style.display = 'none';
      feedbackWindow.style.display = "block";
    }
  })

  async function sendStat(obj) {
    await fetch(
      urlServer + ".netlify/functions/sendStats?uid=" + uid + "&obj=" + JSON.stringify(obj),
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
  }
  setInterval(() => {
    if (JSON.parse(localStorage.getItem("farmadoc-reqs"))?.length > 4) {
      let st = JSON.parse(localStorage.getItem("farmadoc-reqs"))
      sendStat(st.slice(0, -1))
      localStorage.setItem("farmadoc-reqs", JSON.stringify([st[st.length - 1]]))
    }
  }, 1000);

  // +++++++++++++++++++++++++++++++++ //
  // BASIC FUNCTIONS                   //

  const { NeuralNetwork } = window.bot;

  const natural = window.natural;
  var tokenizer = new natural.WordTokenizer();

  let root = [];

  function getMsg() {
    let cache = root.length;
    return new Promise((resolve, reject) => {
      function check() {
        setTimeout(() => {
          if (cache != root.length) {
            if (root[root.length - 1]?.msg) {
              resolve(root[root.length - 1].msg);
            }
          }
          check();
        }, 1000);
      }
      check();
    });
  }

  let sessionData = {
    lastId: "",
    lastIndex: 0,
    confusionStage: 0,
    lastBranch: [],
    lastOptions: [],
  };

  let defaultIntents = intents;

  function createCorpus(input) {
    return new Promise((resolve, reject) => {
      let corpus = [];
      try {
        input.forEach((el, index) => {
          if (el.data.createdBy != "system") {
            let tokens = tokenizer.tokenize(el.data.title)
            let doc = {
              input: {},
              output: { [el?.ref["@ref"].id]: 1 },
            };
            tokens.forEach((tok) => {
              doc.input[natural.PorterStemmerIt.stem(tok)] = 1;
            });
            corpus.push(doc);
          }
          el.data?.phrases?.forEach((phrase) => {
            let tokens = tokenizer.tokenize(phrase.value);
            let doc = {
              input: {},
              output: { [el?.ref["@ref"].id]: 1 },
            };
            tokens.forEach((tok) => {
              doc.input[natural.PorterStemmerIt.stem(tok)] = 1;
            });
            corpus.push(doc);
          });
          if ((index = input.length)) {
            resolve(corpus);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  function detectIntent(input, intents) {
    const stopwords = ["ad", "fa", "fanno", "faccio", "quando", "al", "allo", "ai", "agli", "all", "agl", "alla", "alle", "con", "col", "coi", "da", "dal", "dallo", "dai", "dagli", "dall", "dagl", "dalla", "dalle", "di", "del", "dello", "dei", "degli", "dell", "degl", "della", "delle", "in", "nel", "nello", "nei", "negli", "nell", "negl", "nella", "nelle", "su", "sul", "sullo", "sui", "sugli", "sull", "sugl", "sulla", "sulle", "per", "tra", "contro", "io", "tu", "lui", "lei", "noi", "voi", "loro", "mio", "mia", "miei", "mie", "tuo", "tua", "tuoi", "tue", "suo", "sua", "suoi", "sue", "nostro", "nostra", "nostri", "nostre", "vostro", "vostra", "vostri", "vostre", "mi", "ti", "ci", "vi", "lo", "la", "li", "le", "gli", "ne", "il", "un", "uno", "una", "ma", "ed", "se", "perché", "anche", "come", "dov", "dove", "che", "chi", "cui", "non", "più", "quale", "quanto", "quanti", "quanta", "quante", "quello", "quelli", "quella", "quelle", "questo", "questi", "questa", "queste", "si", "tutto", "tutti", "a", "c", "e", "i", "l", "o", "ho", "hai", "ha", "abbiamo", "avete", "hanno", "abbia", "abbiate", "abbiano", "avrò", "avrai", "avrà", "avremo", "avrete", "avranno", "avrei", "avresti", "avrebbe", "avremmo", "avreste", "avrebbero", "avevo", "avevi", "aveva", "avevamo", "avevate", "avevano", "ebbi", "avesti", "ebbe", "avemmo", "aveste", "ebbero", "avessi", "avesse", "avessimo", "avessero", "avendo", "avuto", "avuta", "avuti", "avute", "sono", "sei", "è", "siamo", "siete", "sia", "siate", "siano", "sarò", "sarai", "sarà", "saremo", "sarete", "saranno", "sarei", "saresti", "sarebbe", "saremmo", "sareste", "sarebbero", "ero", "eri", "era", "eravamo", "eravate", "erano", "fui", "fosti", "fu", "fummo", "foste", "furono", "fossi", "fosse", "fossimo", "fossero", "essendo", "faccio", "fai", "facciamo", "fanno", "faccia", "facciate", "facciano", "farò", "farai", "farà", "faremo", "farete", "faranno", "farei", "faresti", "farebbe", "faremmo", "fareste", "farebbero", "facevo", "facevi", "faceva", "facevamo", "facevate", "facevano", "feci", "facesti", "fece", "facemmo", "faceste", "fecero", "facessi", "facesse", "facessimo", "facessero", "facendo", "sto", "stai", "sta", "stiamo", "stanno", "stia", "stiate", "stiano", "starò", "starai", "starà", "staremo", "starete", "staranno", "starei", "staresti", "starebbe", "staremmo", "stareste", "starebbero", "stavo", "stavi", "stava", "stavamo", "stavate", "stavano", "stetti", "stesti", "stette", "stemmo", "steste", "stettero", "stessi", "stesse", "stessimo", "stessero", "stando"]

    function removeStopwords(inputString) {
      // Convert the input string to lowercase to make the comparison case-insensitive
      inputString = inputString.toLowerCase();

      // Split the input string into an array of words
      var words = inputString.split(/\s+/);

      // Filter out the stopwords
      var filteredWords = words.filter(function (word) {
        return stopwords.indexOf(word) === -1;
      });

      // Join the filtered words back into a string
      var resultString = filteredWords.join(' ');

      return resultString;
    }
    input = removeStopwords(input)

    return new Promise((resolve, reject) => {
      const net = new NeuralNetwork();
      createCorpus(intents).then((corpus) => {
        //console.log(JSON.stringify(corpus))
        net.train(corpus);
        let tokens = tokenizer.tokenize(input); //tokenize input
        //create corpus from input
        let transformedInput = [];
        tokens.forEach((token) => {
          transformedInput[natural.PorterStemmerIt.stem(token)] = 1;
        });

        let result = net.run(transformedInput); //analyze input
        //console.log(result)
        //transform result
        let objres = [];
        Object.keys(result).forEach((key) => {
          objdoc = {
            intent: key,
            probability: result[key],
          };
          objres.push(objdoc);
        });
        //console.log(objres)
        /* let inputphr = input.toLowerCase().split(/\W+/).filter(word => word !== '' && !stopwords.includes(word))
        function showCommonElements(arr1, arr2) {
          let count = [];
          arr1.forEach(element => {
              if (arr2.includes(element)) {
                  count.push(element)
              }
          });
          return [...new Set(count)];
        } */
        /* objres = objres.map(e=>{
          let matchDoc = intents.find(
            (item) => item.ref["@ref"].id == e.intent
          )
          let phr = matchDoc.data.phrases.map(v=>v.value.split(/\W+/).filter(word => word !== '')).flat()
          let common = showCommonElements(phr,inputphr).length
          let fin = e
          fin.probability = fin.probability+(fin.probability*(common/10))
          return fin
        }).sort((a,b)=>b[1]-a[1]) */
        let vals = objres.map((a) => a.probability);
        let maxval = Math.max(...vals);
        console.log(maxval)
        if (maxval > 0.35) {
          if(maxval > 0.90){
            let matchingId = objres.find(
              (item) => item.probability == maxval
            ).intent;
            let matchDoc = intents.find(
              (item) => item.ref["@ref"].id == matchingId
            );
            //console.log(matchDoc)
            resolve(matchDoc);
          } else {
            let objsort = objres.sort((a, b) => b.probability - a.probability);
            //console.log(objsort)
            topmatches = objsort.filter(e => e.probability > 0.01) // Threshold
            const calculateMean = (values) => {
              const mean = (values.reduce((sum, current) => sum + current)) / values.length;
              return mean;
            };
            const calculateVariance = (values) => {
              const average = calculateMean(values);
              const squareDiffs = values.map((value) => {
                const diff = value - average;
                return diff * diff;
              });
              const variance = calculateMean(squareDiffs);
              return variance;
            };
            //console.log(topmatches.map(e=>e.probability))
            //console.log(Math.max(...topmatches.map(e=>e.probability)))
            //console.log(Math.max(...topmatches.map(e=>e.probability))*calculateVariance(topmatches.map(e=>e.probability)))
            //console.log(topmatches.filter(e=>e.probability > Math.max(...topmatches.map(e=>e.probability))*calculateVariance(topmatches.map(e=>e.probability))))
            if (calculateVariance(topmatches.map(e => e.probability)) > 0.75) {
              topmatches = topmatches.filter(e => e.probability > (Math.max(...topmatches.map(e => e.probability)) * calculateVariance(topmatches.map(e => e.probability))))
            }
            if (topmatches.length > 1) {
              topmatches = topmatches.filter(e => {
                let pres = intents.find(
                  (item) => item.ref["@ref"].id == e.intent
                )
                return pres.data.createdBy != "system"
              })
            }
            if (topmatches.length == 1) {
              if (topmatches[0].probability > 0.8) {
                let match = intents.find(
                  (item) => item.ref["@ref"].id == topmatches[0].intent
                )
                resolve(match);
              } else {
                reject("no matches")
              }

            }
            if (topmatches.length < 2) {
              reject("no matches");
            } else {
              addRes("in base ai tuoi sintomi, potresti avere bisogno di assistenza per:", true, null)
              document.getElementById(msgid).disabled = true;
              let htmlD = `<div id="buttonrowclear" style="display: flex; justify-content:flex-end; flex-wrap: wrap; flex-direction: row; margin-top: 15px;"></div>`
              document.getElementById(chatid).insertAdjacentHTML("afterbegin", htmlD)
              topmatches.reverse()
              let totbtns = 0
              document.getElementById("buttonrowclear").insertAdjacentHTML("afterbegin", `<button class="farmadoc-int-btn" id="farmadoc-int-no-choice"' style="cursor: pointer;margin-right: 5px; margin-bottom: 5px; border: none; background-color: #ffb0ab; padding: 10px; border-radius: 10px; display: inline-block; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">Nessuna delle precedenti</button>`);
              document.getElementById("farmadoc-int-no-choice").addEventListener('click', function() {
                this.style.backgroundColor = "#33e894";
              })
              topmatches.forEach((el,index)=>{
                let curD = intents.find(
                  (item) => item.ref["@ref"].id == el.intent
                )
                //console.log(el)
                let htmlC = `<button class="farmadoc-int-btn" id="farmadoc-int-choice-${el.intent}"' style="cursor: pointer; opacity: ${el.probability+0.5};margin-right: 5px; margin-bottom: 5px; border: none; background-color: #b9b9b9; padding: 10px; border-radius: 10px; display: inline-block; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">${curD.data.title}</button>`
                //if(curD.data.createdBy != "system"){
                totbtns = totbtns+1
                document.getElementById("buttonrowclear").insertAdjacentHTML("afterbegin", htmlC);
                document.getElementById("farmadoc-int-choice-"+el.intent).addEventListener('click', function() {
                  this.style.backgroundColor = "#33e894";
                });
                //}
              })
            }

            /* if(totbtns < 2 ){
              document.getElementById("buttonrowclear").remove()
              document.getElementById(chatid).getElementsByTagName('span')[0].remove()
              reject("no matches")
            } */
            function waitUntilIntervalCleared(topmatch) {
              return new Promise(resolve => {
                const waitforCoice = setInterval(() => {
                  topmatch.forEach(el => {
                    let curD = intents.find(
                      (item) => item.ref["@ref"].id == el.intent
                    )
                    if(curD.data.createdBy != "system"){
                      if(document.getElementById("farmadoc-int-choice-"+el.intent)?.style.backgroundColor == "#33e894" || document.getElementById("farmadoc-int-choice-"+el.intent)?.style.backgroundColor ==  "rgb(51, 232, 148)"){
                        /* document.getElementById("buttonrowclear")?.remove()
                        document.getElementById(chatid).getElementsByTagName('span')[0]?.remove() */
                        document.getElementById(msgid).disabled = false;
                        resolve(el.intent)
                        clearInterval(waitforCoice)
                      }
                      if(document.getElementById("farmadoc-int-no-choice")?.style.backgroundColor == "#33e894" || document.getElementById("farmadoc-int-no-choice")?.style.backgroundColor == "rgb(51, 232, 148)"){
                        document.getElementById(msgid).disabled = false;
                        resolve("no")
                        clearInterval(waitforCoice)
                      }
                    }
                  })
                }, 250);
              });
            }
            waitUntilIntervalCleared(topmatches).then(choseInt=>{
              Array.from(document.getElementsByClassName("farmadoc-int-btn")).forEach(button=>{
                button.style.cursor = "text"
                const clone = button.cloneNode(true);
                button.parentNode.replaceChild(clone, button);
              })
              if(choseInt == "no"){
                addRes("Forse i tuoi specifici sintomi non sono ancora nella nostra banca dati, per il momento non posso aiutarti con la tua richiesta.", false);
                reject("ignore")
              }else{
                let matchDoc = intents.find(
                  (item) => item.ref["@ref"].id == choseInt
                )
                document.getElementById(msgid).disabled = false;
                resolve(matchDoc);
              }
              
            })
          }
        } else {
          if (sessionData.lastOptions.length > 0) {
            sessionData.lastOptions.forEach((branch, index) => {
              branch.forEach((option, optionIndex) => {
                if (
                  natural.PorterStemmerIt.stem(input.toLowerCase()).includes(
                    natural.PorterStemmerIt.stem(option)
                  )
                ) {
                  let oldBranch = sessionData.lastBranch;
                  oldBranch[index] = option;

                  remediesList = defaultIntents.find(
                    (element) => element.id == sessionData.lastId
                  ).remedies;
                  remediesList.forEach((remedy) => {
                    if (
                      JSON.stringify(remedy.suitableFor.sort()) ==
                      JSON.stringify(oldBranch.sort())
                    ) {
                      addRes(remedy.items, true);
                      reject("ignore");
                    }
                  });
                } else {
                  if (
                    optionIndex == branch.length - 1 &&
                    index == sessionData.lastOptions.length - 1
                  ) {
                    reject("no matches");
                  }
                }
              });
            });
          } else {
            reject("no matches");
          }
        }
        //waitUntilIntervalCleared(topmatches).then(choseInt=>{
        /* let vals = objres.map((a) => a.probability);
        let maxval = Math.max(...vals);
        if (maxval > 0.6) { */
        /* let matchDoc = intents.find(
          (item) => item.ref["@ref"].id == choseInt
        )
        resolve(matchDoc); */
        /* } else {
          if (sessionData.lastOptions.length > 0) {
            sessionData.lastOptions.forEach((branch, index) => {
              branch.forEach((option, optionIndex) => {
                if (
                  natural.PorterStemmerIt.stem(input.toLowerCase()).includes(
                    natural.PorterStemmerIt.stem(option)
                  )
                ) {
                  let oldBranch = sessionData.lastBranch;
                  oldBranch[index] = option;
   
                  remediesList = defaultIntents.find(
                    (element) => element.id == sessionData.lastId
                  ).remedies;
                  remediesList.forEach((remedy) => {
                    if (
                      JSON.stringify(remedy.suitableFor.sort()) ==
                      JSON.stringify(oldBranch.sort())
                    ) {
                      addRes(remedy.items, true);
                      reject("ignore");
                    }
                  });
                } else {
                  if (
                    optionIndex == branch.length - 1 &&
                    index == sessionData.lastOptions.length - 1
                  ) {
                    reject("no matches");
                  }
                }
              });
            });
          } else {
            reject("no matches");
          }
        } */
        //})
        //get best match
        /* console.log(objres)
        let vals = objres.map((a) => a.probability);
        let maxval = Math.max(...vals); */

        //return best match
        /* if (maxval > 0.6) {
          let matchingId = objres.find(
            (item) => item.probability == maxval
          ).intent;
          let matchDoc = intents.find(
            (item) => item.ref["@ref"].id == matchingId
          );
          
          resolve(matchDoc);
        } else {
          if (sessionData.lastOptions.length > 0) {
            sessionData.lastOptions.forEach((branch, index) => {
              branch.forEach((option, optionIndex) => {
                if (
                  natural.PorterStemmerIt.stem(input.toLowerCase()).includes(
                    natural.PorterStemmerIt.stem(option)
                  )
                ) {
                  let oldBranch = sessionData.lastBranch;
                  oldBranch[index] = option;
   
                  remediesList = defaultIntents.find(
                    (element) => element.id == sessionData.lastId
                  ).remedies;
                  remediesList.forEach((remedy) => {
                    if (
                      JSON.stringify(remedy.suitableFor.sort()) ==
                      JSON.stringify(oldBranch.sort())
                    ) {
                      addRes(remedy.items, true);
                      reject("ignore");
                    }
                  });
                } else {
                  if (
                    optionIndex == branch.length - 1 &&
                    index == sessionData.lastOptions.length - 1
                  ) {
                    reject("no matches");
                  }
                }
              });
            });
          } else {
            reject("no matches");
          }
        } */
      });
    });
  }

  const calculateQty = (qty) => {
    if (qty >= 3) {
      return { status: "green", msg: "Attualmente disponibile" };
    } else if (qty <= 0) {
      return {
        status: "red",
        msg: "Attualmente non disponibile, contatta la farmacia per ordinare",
      };
    } else {
      return {
        status: "yellow",
        msg: "Disponibile in quantità limitata",
      };
    }
  };

  async function getDrugsInfo(id) {
    const respo = await fetch(
      urlServer + ".netlify/functions/getDrugs?id=" + id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const drug = await respo.json();
    return drug;
  }

  const chatProdotti = (name, id) => {
    let msgsend =
      `<div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">
      <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
        ${name}
      </span>
    </div>
    `
    document
      .getElementById(chatid + "-prod")
      .insertAdjacentHTML("afterbegin", msgsend);

    getDrugsInfo(id).then((respDrug) => {
      let qtyBar = {
        msg: calculateQty(respDrug?.remedy?.qty).msg,
        color: calculateQty(respDrug?.remedy?.qty).status,
      };
      addResProd(
        `Il prodotto trovato è ${respDrug?.remedy?.name}`,
        null
      );
      if (respDrug?.remedy?.promo) {
        addResProd(
          `${respDrug?.remedy?.promodetail}`
        )
      }
      addResProd(qtyBar.msg, qtyBar.color);
    });

    document.getElementById(msgid + "-prod").value = '';
  }

  document.addEventListener("click", function (e) {
    const indietro = e.target.closest(".btnIndietro");
    if (indietro) {
      document.getElementById(`pulsanti-${diramCount - 1}`).remove();
      document.getElementById(`domanda-${diramCount - 1}`).remove();
      document.getElementById(`indietro-${diramCount - 1}`).remove();

      let padre = document.getElementById(`pulsanti-${diramCount === 1 ? 0 : diramCount - 2}`)
      for (const child of padre.children) {
        child.disabled = false;
      };

      risposteBranch.pop();
      domandaBranch = tempDiramsData[diramCount - 1]?.domanda;
      diramCount--
      lastDomanda = false;
    }

    const target = e.target.closest(".pulsanteDiram");
    if (target) {
      let padre = target.parentElement;
      for (const child of padre.children) {
        child.disabled = true;
      }

      const checkRimedioDiram = () => {
        rimediSimple = rimedi.map(x => ({ remFor: x.for.toString(), prodotto: x.res, note: x.note }));
        rimedioTrovato = rimediSimple.filter((x) => x.remFor === risposteBranch.toString());
        //console.log(risposteBranch)
        //console.log(rimediSimple)
        //console.log(rimedioTrovato)

        let rimedioFound;

        if (rimedioTrovato.length) {
          rimedioFound = { prodTrov: rimedioTrovato[0].prodotto, rispNota: rimedioTrovato[0].note };
          /* sendStat(rimedioFound.prodTrov, currisp, uid) */
        }
        if (Object.keys(rimedioFound).length !== 0) {
          if (rimedioFound.prodTrov && rimedioFound.prodTrov !== '') {
            getDrugsInfo(rimedioFound.prodTrov).then((respDrug) => {
              let qtyBar = {
                msg: calculateQty(respDrug?.remedy?.qty).msg,
                color: calculateQty(respDrug?.remedy?.qty).status,
              };
              let storedValue = []
              if (localStorage.getItem('farmadoc-reqs')) {
                storedValue = JSON.parse(localStorage.getItem('farmadoc-reqs'))
              }
              storedValue[storedValue.length - 1][1] = rimedioFound?.prodTrov
              localStorage.setItem('farmadoc-reqs', JSON.stringify(storedValue));
              addRes(
                `Il prodotto suggerito in questo caso è ${respDrug?.remedy?.name}`,
                true,
                null
              );
              if (respDrug?.remedy?.promo) {
                addRes(
                  `${respDrug?.remedy?.promodetail}`, true, null
                );
              }
              addRes(qtyBar.msg, true, qtyBar.color);
            });
          }
          if (rimedioFound.rispNota && rimedioFound.rispNota !== '') {
            addRes(rimedioFound.rispNota, true, null);
          }

          risposteBranch = [];
          opzioni = [];
          lastDomanda = false;
          domandaBranch = "";
          diramCount = 0;
          document.getElementById(msgid).disabled = false;
          let btnIndietro = document.getElementsByClassName(`btnIndietro`)
          if (btnIndietro.length) {
            btnIndietro[0].remove();
          }
        }
      };

      if (domandaBranch !== "" || lastDomanda === true) {
        let resp = target.dataset.value;
        risposteBranch.push(resp);
        opzioni = [];
        tempDiramsData[diramCount]?.opz?.map((x) => opzioni.push(x.value));
      }

      if (domandaBranch === undefined) {
        checkRimedioDiram();
      } else {
        let btnIndietro = document.getElementsByClassName(`btnIndietro`)
        if (btnIndietro.length) {
          btnIndietro[0].remove();
        }
        printDomanda(domandaBranch);
        diramCount++;
        domandaBranch = tempDiramsData[diramCount]?.domanda;
        domandaBranch === undefined
          ? (lastDomanda = true)
          : (lastDomanda = false);
      }
    }
  });

  function ask(intents) {
    opzioni = [];
    risposteBranch = [];
    localStorage.setItem("Farmacia", JSON.stringify(root));
    getMsg().then((input) => {
      detectIntent(input, intents)
        .then((res) => {
          let storedValue = []
          if (localStorage.getItem('farmadoc-reqs')) {
            storedValue = JSON.parse(localStorage.getItem('farmadoc-reqs'))
          }
          storedValue.push([res.ref["@ref"].id, 0, Date.now()])
          localStorage.setItem('farmadoc-reqs', JSON.stringify(storedValue));
          currisp = res.ref["@ref"].id
          rimedi = res?.data?.rems;
          tempDiramsData = res?.data?.dirams;

          if (tempDiramsData.length > 1) {
            domandaBranch = tempDiramsData[diramCount].domanda;
            opzioni = [];
            tempDiramsData[diramCount].opz?.map((x) => opzioni.push(x.value));
            printDomanda(domandaBranch);
            diramCount++;
            domandaBranch = tempDiramsData[diramCount].domanda;
          } else if (tempDiramsData.length === 1) {
            domandaBranch = tempDiramsData[diramCount].domanda;
            opzioni = [];
            tempDiramsData[diramCount].opz?.map((x) => opzioni.push(x.value));
            printDomanda(domandaBranch);
            diramCount++;
            domandaBranch = tempDiramsData[diramCount]?.domanda;
          } else if (tempDiramsData.length === 0 && rimedi.length > 0) {
            lastDomanda === true;
          }

          if (res.confusedBot) {
            sessionData.confusionStage++;
          } else {
            sessionData.confusionStage = 0;
          }

          const printRimedio = () => {
            if (rimedi[0] !== undefined && !regex.test(rimedi[0])) {
              addRes(rimedi[0], false);
            } else if (rimedi[0] !== undefined && regex.test(rimedi[0])) {
              getDrugsInfo(rimedi[0]).then((respDrug) => {
                let qtyBar = {
                  msg: calculateQty(respDrug?.remedy?.qty).msg,
                  color: calculateQty(respDrug?.remedy?.qty).status,
                };

                addRes(
                  `<span>Il prodotto suggerito in questo caso è<br/><strong>${respDrug?.remedy?.name}</strong><br/>${qtyBar.msg}</span>`,
                  true,
                  qtyBar.color
                );
                if (respDrug?.remedy?.promo) {
                  addRes(
                    `${respDrug?.remedy?.promodetail}`
                  )
                }
              });
            } else {
              return "Purtroppo non ho un rimedio da consigliare :(";
            }
          };

          const printRimediMulti = () => {
            addRes(
              `I prodotti suggeriti in questo caso sono:`,
              true,
              null
            );
            rimedi.map((x) => {
              getDrugsInfo(x).then((respDrug) => {
                let qtyBar = {
                  msg: calculateQty(respDrug?.remedy?.qty).msg,
                  color: calculateQty(respDrug?.remedy?.qty).status,
                };
                addRes(
                  `<span>
                    <strong>${respDrug?.remedy?.name}</strong><br/>${qtyBar.msg}
                    ${respDrug?.remedy?.promo ? '<br />' + respDrug?.remedy?.promodetail : ''}
                  </span>`,
                  true,
                  qtyBar.color
                );
              });
            })
          }

          if (rimedi.length <= 1) {
            printRimedio();
          } else {
            if (tempDiramsData.length <= 0) {
              printRimediMulti();
            }
          }
          ask(defaultIntents);
        })
        .catch((err) => {
          //console.log(err);
          if (err != "ignore") {
            root = [];
            sessionData.confusionStage++;
            let confusedPhrases = [
              "Potresti essere più specifico?",
              "Scusami, non ho capito, potresti rifare la domanda?",
              "Non ho capito :(",
            ];
            if (sessionData.confusionStage > 3) {
              sessionData.confusionStage = 0;
              addRes(
                `<span>
                  <span>Purtroppo sto avendo difficoltà a capire le tue domande, se il problema persiste ti consiglio di lasciare un feedback a</span>
                  <a href="mailto:${userMail}" target="_blank">${userMail}</a>
                  <span>oppure contattandoci su watsapp al</span>
                  <a href="https://wa.me/${userPhone}" target="_blank">${userPhone}</a>
                </span>`,
                false
              );
            } else {
              addRes(confusedPhrases[sessionData.lastIndex], false);
            }
            if (sessionData.lastIndex < 2) {
              sessionData.lastIndex++;
            } else {
              sessionData.lastIndex = 0;
            }
          }
          ask(defaultIntents);
        });
    });
  }

  ask(defaultIntents);

  // ********************************* //

  const chatResponder = (msg) => {
    /* console.log(intents);
    console.log("MESSAGGIO INSERITO: " + msg); */

    let newdoc = {
      msg,
      sender: "user",
    };

    root.push(newdoc);
  }; // end chatResponder

  const addResProd = (messaggio, color) => {
    let colorBar;
    if (color) {
      colorBar = `<span class="color-bar" style="background-color:${color}; width: 10px; min-width: 10px; height: 10px; margin-right: 10px; border: solid 1px #fff; border-radius: 50%; display: block;"></span>`;
    }

    let answer = `
    <div style="all: unset; display: block; text-align: left; width: 100%; position: relative; box-sizing: border-box; margin-top: 10px">
      <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-flex; align-items: center; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
      ${colorBar ? colorBar : ""} ${messaggio} 
      </span>
    </div>
    `;
    document.getElementById(chatid + '-prod').insertAdjacentHTML("afterbegin", answer);
  };

  const addRes = (messaggio, status, color) => {
    let colorBar;
    if (color) {
      colorBar = `<span class="color-bar" style="background-color:${color}; width: 10px; min-width: 10px; height: 10px; margin-right: 10px; border: solid 1px #fff; border-radius: 50%; display: block;"></span>`;
    }

    let answer = `
    <div style="all: unset; display: block; text-align: left; width: 100%; position: relative; box-sizing: border-box; margin-top: 10px">
      <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-flex; align-items: center; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
      ${colorBar ? colorBar : ""} ${messaggio} 
      </span>
    </div>
    `;
    document.getElementById(chatid).insertAdjacentHTML("afterbegin", answer);
  };

  const printDomanda = (domanda) => {
    document.getElementById(msgid).disabled = true;
    let printOpzioni = opzioni.map((x) => {
      return `<button class="pulsanteDiram" data-value="${x}" style="cursor: pointer; margin-right: 5px; margin-bottom: 5px; border: none; background-color: #b9b9b9; padding: 10px; border-radius: 10px; display: inline-block; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">${x}</button>`;
    }).join(' ');

    let indietro = `
    <div id="indietro-${diramCount}" style="display: flex; justify-content:flex-end; flex-wrap: wrap; flex-direction: row;">
      <span class="btnIndietro" data-value="indietro" style="cursor: pointer; font-size: 10px; margin-top: 15px;">
        torna indietro
        <svg style="height: 10px; width: 10px; fill: gray;" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318 145.6c-3.812 8.75-12.45 14.41-22 14.41L224 160v272c0 44.13-35.89 80-80 80H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h112C152.8 448 160 440.8 160 432V160L88 159.1c-9.547 0-18.19-5.656-22-14.41S63.92 126.7 70.41 119.7l104-112c9.498-10.23 25.69-10.23 35.19 0l104 112C320.1 126.7 321.8 136.8 318 145.6z"/></svg>
      </span>
    </div>
    `
    let question = `
      <div id="domanda-${diramCount}" style="all: unset; display: block; text-align: left; width: 100%; position: relative; box-sizing: border-box; margin-top: 10px">
        <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
          ${domanda}
        </span>
      </div>
    `;

    let pulsanti = `
      ${diramCount !== 0 ? indietro : ''}
      <div id="pulsanti-${diramCount}" style="display: flex; justify-content:flex-end; flex-wrap: wrap; flex-direction: row;">
        ${printOpzioni}
      </div>
    `;
    document.getElementById(chatid).insertAdjacentHTML("afterbegin", question);
    document.getElementById(chatid).insertAdjacentHTML("afterbegin", pulsanti);
  };


  if (result.authorised) {
    document.getElementById(servbtnid + "-chat").addEventListener("click", function () {
      document.getElementById(`${servbtnid}-chat`).style.display = 'none';
      document.getElementById(`${servbtnid}-serv`).style.display = 'block';
      document.getElementById(`${servbtnid}-prod`).style.display = 'block';

      document.getElementById(`${contentid}`).style.display = 'block';
      document.getElementById(`${contentid}-serv`).style.display = 'none';
      document.getElementById(`${contentid}-prod`).style.display = 'none';
    })
    document.getElementById(servbtnid + "-serv").addEventListener("click", function () {
      document.getElementById(`${servbtnid}-chat`).style.display = 'block';
      document.getElementById(`${servbtnid}-serv`).style.display = 'none';
      document.getElementById(`${servbtnid}-prod`).style.display = 'none';

      document.getElementById(`${contentid}`).style.display = 'none';
      document.getElementById(`${contentid}-serv`).style.display = 'block';
      document.getElementById(`${contentid}-prod`).style.display = 'none';
    })
    document.getElementById(servbtnid + "-prod").addEventListener("click", function () {

      if (inventoryLoaded === false) {
        getInventory();
      }

      document.getElementById(`${servbtnid}-chat`).style.display = 'block';
      document.getElementById(`${servbtnid}-serv`).style.display = 'none';
      document.getElementById(`${servbtnid}-prod`).style.display = 'none';

      document.getElementById(`${contentid}`).style.display = 'none';
      document.getElementById(`${contentid}-serv`).style.display = 'none';
      document.getElementById(`${contentid}-prod`).style.display = 'block';
    })
    /* document.getElementById(servbtnid+"-prod").addEventListener("click", function () {
      if (isSearchProd === false) {
        if (inventoryLoaded === false) {
          getInventory();
        }
        isSearchProd = true;
        document.getElementById(`${contentid}-prod`).style.display = 'block';
        document.getElementById(`${contentid}`).style.display = 'none';
      } else {
        isSearchProd = false;
        this.innerText = 'Ricerca prodotti';
        document.getElementById(`${contentid}-prod`).style.display = 'none';
        document.getElementById(`${contentid}`).style.display = 'block';
      }
    }); */

    document.getElementById(sendid).addEventListener("click", function () {
      let msgsend =
        '<div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">' +
        '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">' +
        document.getElementById(msgid).value +
        "                    </span>" +
        "                </div>";

      if (document.getElementById(msgid).value !== "") {
        document
          .getElementById(chatid)
          .insertAdjacentHTML("afterbegin", msgsend);
        chatResponder(document.getElementById(msgid).value);
        document.getElementById(msgid).value = "";
      }
    });

    document.getElementById(msgid).addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let msgsend =
          '<div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">' +
          '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">' +
          document.getElementById(msgid).value +
          "                    </span>" +
          "                </div>";

        if (document.getElementById(msgid).value !== "") {
          document
            .getElementById(chatid)
            .insertAdjacentHTML("afterbegin", msgsend);
          chatResponder(document.getElementById(msgid).value);
          document.getElementById(msgid).value = "";
        }
      }
    });

    document.addEventListener("click", function (e) {
      const listaProd = document.getElementById('lista-prod');
      let target = e.target.classList.contains('remedy-click');
      if (target) {
        listaProd.style.display = 'none';
        listaProd.innerHTML = '';
        chatProdotti(e.target.dataset.value, e.target.dataset.id)
      } else {
        listaProd.style.display = 'none';
        listaProd.innerHTML = '';
      }
    });

    document.getElementById(msgid + '-prod').addEventListener("input", function (e) {
      const listaProd = document.getElementById('lista-prod');
      let searchValue = this.value;

      const findValue = (object, value) => {
        return object.filter(x => (x.name.toLowerCase().startsWith(value.toLowerCase())))
      }

      if (searchValue === '') {
        listaProd.style.display = 'none';
        listaProd.innerHTML = '';
      } else if (typeof drugIndex !== 'undefined' && searchValue !== '' && searchValue.length > 1) {
        drugFound = findValue(drugIndex, searchValue);
        /* console.log(drugFound) */

        if (drugFound.length !== 0) {
          let names = drugFound.map(x => {
            return `
            <li class="remedy-click"
            onMouseOver="this.style.backgroundColor='lightgrey'" 
            onMouseOut="this.style.backgroundColor='white'"
            style="border-bottom: solid 1px #cecece;padding: 10px 10px 7px;
            line-height: 1rem;
            font-size: 14px;
            cursor: pointer"
            data-value="${x.name}" data-id="${x.remedyId}"
            >
              ${x.name}
            </li>`
          }).join(' ');

          listaProd.style.display = 'block';
          listaProd.innerHTML = `<ul style="list-style: none; padding: 0; margin: 0;">${names}</ul>`;
        }
      }

      if (e.key === "Enter") {
        let msgsend =
          '<div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">' +
          '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">' +
          document.getElementById(msgid).value +
          "                    </span>" +
          "                </div>";

        if (document.getElementById(msgid).value !== "") {
          document
            .getElementById(chatid)
            .insertAdjacentHTML("afterbegin", msgsend);
          chatResponder(document.getElementById(msgid).value);
          document.getElementById(msgid).value = "";
        }
      }
    });

    if (!result.res.activeSub) {
      document.getElementById(chatid).style.alignItems = "center";
      document.getElementById(chatid).style.flexDirection = "unset";
      document.getElementById(chatid).innerHTML =
        "<p style='color: grey'>Questa chat attualmente non è disponibile</p>";
    }
  } else {
    document.getElementById(chatid).style.alignItems = "center";
    document.getElementById(chatid).style.flexDirection = "unset";
    document.getElementById(chatid).innerHTML =
      "<p style='color: grey'>Questo sito internet non è autorizzato per usare la chat di Farmadoc</p>";
  }
}catch(err){
  fetch(urlServer + ".netlify/functions/send-bug-report",{
    method: "POST",
    body: JSON.stringify({
      message: err,
      navigator: nav,
      client: uid
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
}
