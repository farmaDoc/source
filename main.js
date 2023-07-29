async function farmadocInit(el) {
  let regex = /^[0-9]{0,25}$/;
  let opzioni = [];
  let domandaBranch;
  let rimedi = [];
  let tempDiramsData = [];
  let diramCount = 0;
  let risposteBranch = [];
  let lastDomanda = false;
  let uid;
  let inventoryLoaded = false;

  let result = await fetch(
    "https://source.farmadoc.it/.netlify/functions/checkIn?key=" + el,
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
    console.log(error);
  });

  console.log(result)
  let ServData = result.res.serv
  uid = result.uid['@ref'].id;
  console.log(uid)

  let usrIntents = await fetch(
    "https://source.farmadoc.it/.netlify/functions/getIntents?createdBy=" +
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
      console.log(error);
    });

  usrIntents = usrIntents.res;
  console.log("USR INTENTS ", usrIntents);

  let sysIntents = await fetch(
    "https://source.farmadoc.it/.netlify/functions/getIntents?createdBy=system",
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
      console.log(error);
    });

  async function getInventory() {
    const respo = await fetch(
      "https://source.farmadoc.it/.netlify/functions/getInventory?uid=" + uid,
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
  console.log("SYS INTENTS ", sysIntents);

  let intents = sysIntents.concat(usrIntents);
  console.log("GLOBAL INTENTS", intents);
  console.log("GLOBAL INTENTS length ", intents.length);

  let minimizeid = btoa(Math.random().toString()).substring(10, 20);
  let contentid = btoa(Math.random().toString()).substring(10, 20);
  let minimizeel = btoa(Math.random().toString()).substring(10, 20);
  let chatid = btoa(Math.random().toString()).substring(10, 20);
  let sendid = btoa(Math.random().toString()).substring(10, 20);
  let msgid = btoa(Math.random().toString()).substring(10, 20);
  let servbtnid = btoa(Math.random().toString()).substring(10, 20);
  let width = screen.width < 960 ? "calc(100% - 20px)" : "500px";

  /* function parseserv(cont){
    console.log(cont)
    result = cont
    const phoneNumberRegex = /(\+\d{1,2}\s?)?(\(?\d{1,}\)?[\s-]?)?\d{1,}[\s-]?\d{1,}[\s-]?\d{1,}/g;
    const phoneNumbers = cont.match(phoneNumberRegex);
    phoneNumbers.forEach(el=>{
      result.replace(el,"<a href='tel:"+el+">"+el+"</a>")
    })
    result = result.replace(/\n/g, "<br>")
    return(result)
  } */

  let modal = `
        <div style="all: unset; background-color: white; box-sizing: border-box; font-family: Arial; z-index: 100000; width: ${width}; position: fixed; bottom: 10px; right: 10px; border: 1px solid grey; border-radius: 10px">
          <div style="all: unset; width: 100%">
            <div style="width: calc(90% - 40px); padding: 20px; display: inline-block; box-sizing: border-box;">
              <img style="all: unset; width: 150px;" src="https://i.ibb.co/YB2tmYP/app-farmadoc-it-2-1.png" alt=""><span style="font-style: italic; color: grey;">Chat</span>
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
                <input id="${msgid}-prod" placeholder="Digita qui" type="text" style="all: unset; height: 50px; width: 450px; padding: 20px; box-sizing: border-box;">
              </div>
            </div>
            <div id="${contentid}-serv" style="display: none">
              <div style="all: unset; width: 100%">
                <div style="height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">
                  <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">
                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">  
                      ${parseserv(ServData)}
                    </span>
                  </div>
                </div>
              </div>
              <hr style="all: unset; border-top: 1px solid grey; display: block;">
              <div style="all: unset; height: 50px; width: 100%; display: flex; position: relative;">
                
              </div>
            </div>
            <div id="${contentid}">
              <div style="all: unset; width: 100%">
                <div id="${chatid}" style="height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">
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
                <input id="${msgid}" placeholder="Digita qui" type="text" style="all: unset; height: 50px; width: 450px; padding: 20px; box-sizing: border-box;">
                <div id="${sendid}" style="all: unset; width: 50px; height: 50px; display: inline-block; min-width: 50px; background-color: #33e894; border-radius: 0 0 10px 0; border-left: 1px solid grey; display: flex; align-items: center; text-align: center; cursor: pointer;">
                  <svg style="all: unset; align-self: center; margin: auto;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

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
    return new Promise((resolve, reject) => {
      const net = new NeuralNetwork();
      createCorpus(intents).then((corpus) => {
        net.train(corpus);
        let tokens = tokenizer.tokenize(input); //tokenize input
        //create corpus from input
        let transformedInput = [];
        tokens.forEach((token) => {
          transformedInput[natural.PorterStemmerIt.stem(token)] = 1;
        });

        let result = net.run(transformedInput); //analyze input

        //transform result
        let objres = [];
        Object.keys(result).forEach((key) => {
          objdoc = {
            intent: key,
            probability: result[key],
          };
          objres.push(objdoc);
        });

        //get best match
        let vals = objres.map((a) => a.probability);
        let maxval = Math.max(...vals);

        //return best match
        if (maxval > 0.6) {
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
        }
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
      "https://source.farmadoc.it/.netlify/functions/getDrugs?id=" + id,
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
        `Il farmaco trovato è ${respDrug?.remedy?.name}`,
        null
      );
      if (respDrug?.remedy?.promo) {
        addResProd(
          `In promozione: ${respDrug?.remedy?.promodetail}`
        )
      }
      addResProd(qtyBar.msg, qtyBar.color);
    });

    document.getElementById(msgid + "-prod").value = '';
  }

  document.addEventListener("click", function (e) {
    const target = e.target.closest(".pulsanteDiram");
    if (target) {
      let padre = target.parentElement;
      for (const child of padre.children) {
        child.disabled = true;
      }

      const checkRimedioDiram = () => {
        rimediSimple = rimedi.map(x => ({ remFor: x.for.toString(), prodotto: x.res, note: x.note }));
        rimedioTrovato = rimediSimple.filter((x) => x.remFor === risposteBranch.toString());

        let rimedioFound;

        if (rimedioTrovato.length) {
          rimedioFound = { prodTrov: rimedioTrovato[0].prodotto, rispNota: rimedioTrovato[0].note };
        }

        if (rimedioFound !== {}) {
          if (rimedioFound.prodTrov && rimedioFound.prodTrov !== '') {
            getDrugsInfo(rimedioFound.prodTrov).then((respDrug) => {
              let qtyBar = {
                msg: calculateQty(respDrug?.remedy?.qty).msg,
                color: calculateQty(respDrug?.remedy?.qty).status,
              };
              addRes(
                `Il farmaco suggerito in questo caso è ${respDrug?.remedy?.name}`,
                true,
                null
              );
              if (respDrug?.remedy?.promo) {
                addRes(
                  `In promozione: ${respDrug?.remedy?.promodetail}`, true, null
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
                  `Il farmaco suggerito in questo caso è ${respDrug?.remedy?.name}`,
                  true,
                  null
                );
                addRes(qtyBar.msg, true, qtyBar.color);
              });
            } else {
              return "Purtroppo non ho un rimedio da consigliare :(";
            }
          };

          if (rimedi.length <= 1) {
            printRimedio();
          }
          ask(defaultIntents);
        })
        .catch((err) => {
          console.log(err);
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
                "Purtroppo sto avendo difficoltà a capire le tue domande, se il problema persiste ti consiglio di lasciare un feedback a info@farmadoc.it",
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
    console.log(intents);
    console.log("MESSAGGIO INSERITO: " + msg);

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

    let question = `
      <div style="all: unset; display: block; text-align: left; width: 100%; position: relative; box-sizing: border-box; margin-top: 10px">
        <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 80%; word-wrap: normal; overflow: hidden; position: relative; box-sizing: border-box">
          ${domanda}
        </span>
      </div>
      `;
    let pulsanti = `
      <div id="pulsanti" style="display: flex; justify-content:flex-end; flex-wrap: wrap; flex-direction: row;">${printOpzioni}</div>
    `;
    document.getElementById(chatid).insertAdjacentHTML("afterbegin", question);
    document.getElementById(chatid).insertAdjacentHTML("afterbegin", pulsanti);
  };


  if (result.authorised) {
    document.getElementById(servbtnid+"-chat").addEventListener("click", function () {
      document.getElementById(`${servbtnid}-chat`).style.display = 'none';
      document.getElementById(`${servbtnid}-serv`).style.display = 'block';
      document.getElementById(`${servbtnid}-prod`).style.display = 'block';

      document.getElementById(`${contentid}`).style.display = 'block';
      document.getElementById(`${contentid}-serv`).style.display = 'none';
      document.getElementById(`${contentid}-prod`).style.display = 'none';
    })
    document.getElementById(servbtnid+"-serv").addEventListener("click", function () {
      document.getElementById(`${servbtnid}-chat`).style.display = 'block';
      document.getElementById(`${servbtnid}-serv`).style.display = 'none';
      document.getElementById(`${servbtnid}-prod`).style.display = 'none';

      document.getElementById(`${contentid}`).style.display = 'none';
      document.getElementById(`${contentid}-serv`).style.display = 'block';
      document.getElementById(`${contentid}-prod`).style.display = 'none';
    })
    document.getElementById(servbtnid+"-prod").addEventListener("click", function () {

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
        console.log(drugFound)

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
}
