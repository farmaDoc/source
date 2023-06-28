async function farmadocInit(el) {
  let result = await fetch("https://source.farmadoc.it/.netlify/functions/checkIn?key=" + el, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    resultTemp = res.json();
    console.log(resultTemp);
    return resultTemp;
  }).catch((error) => {
    console.log(error)
  });

  console.log("RESULT ", result);

  let usrIntents = await fetch("https://source.farmadoc.it/.netlify/functions/getIntents?createdBy=" + result?.res?.id, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    resultTemp = res.json();
    return resultTemp;
  }).catch((error) => {
    console.log(error)
  });

  usrIntents = usrIntents.res;
  console.log("USR INTENTS ", usrIntents)

  let sysIntents = await fetch("https://source.farmadoc.it/.netlify/functions/getIntents?createdBy=system", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    resultTemp = res.json();
    return resultTemp;
  }).catch((error) => {
    console.log(error)
  });

  sysIntents = sysIntents.res;
  console.log("SYS INTENTS ", sysIntents)

  let intents = sysIntents.concat(usrIntents);
  console.log("GLOBAL INTENTS", intents)
  console.log("GLOBAL INTENTS length ", intents.length)

  let minimizeid = btoa(Math.random().toString()).substring(10, 20)
  let contentid = btoa(Math.random().toString()).substring(10, 20)
  let minimizeel = btoa(Math.random().toString()).substring(10, 20)
  let chatid = btoa(Math.random().toString()).substring(10, 20)
  let sendid = btoa(Math.random().toString()).substring(10, 20)
  let msgid = btoa(Math.random().toString()).substring(10, 20)

  let modal = '' +
    '    <div style="all: unset; background-color: white; box-sizing: border-box; font-family: Arial; z-index: 100000; width: 500px; position: fixed; bottom: 10px; right: 10px; border: 1px solid grey; border-radius: 10px">' +
    '        <div style="all: unset; width: 100%">' +
    '            <div style="width: 80%; padding: 20px; display: inline-block; box-sizing: border-box;">' +
    '                <img style="all: unset; width: 150px;" src="https://i.ibb.co/YB2tmYP/app-farmadoc-it-2-1.png" alt=""><span style="font-style: italic; color: grey;">Chat</span>' +
    '            </div>' +
    '            <div id="' + minimizeid + '" style="all: unset; width: 19%; padding: 20px; display: inline-block; text-align: right; box-sizing: border-box; cursor: pointer; color: grey">' +
    '                <h2 style="all: unset; margin: 0; font-size: 20px" id="' + minimizeel + '">—</h2>' +
    '            </div>' +
    '        </div>' +
    '        <span id="' + contentid + '">' +
    '        <hr style="all: unset; border-top: 1px solid grey; display: block;">' +
    '        <div style="all: unset; width: 100%">' +
    '            <div id="' + chatid + '" style="height: 400px; padding: 20px; display: flex; flex-direction: column-reverse; align-items: flex-end; box-sizing: border-box; width: 100%; background-color: #eaeaea; overflow-y: auto;">' +
    '' +
    '                <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">' +
    '                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">' +
    '                        Ciao!' +
    '                    </span><br />' +
    '                    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">' +
    '                        Come posso esserti utile?' +
    '                    </span>' +
    '                    ' +
    '                </div>' +
    '                ' +
    '            ' +
    '            </div>' +
    '        </div>' +
    '        <hr style="all: unset; border-top: 1px solid grey; display: block;">' +
    '        <div style="all: unset; height: 50px; width: 100%; display: flex; position: relative;">' +
    '            <input id="' + msgid + '" placeholder="Digita qui" type="text" style="all: unset; height: 50px; width: 450px; padding: 20px; box-sizing: border-box;">' +
    '            <div id="' + sendid + '" style="all: unset; width: 50px; height: 50px; display: inline-block; background-color: #33e894; border-radius: 0 0 10px 0; border-left: 1px solid grey; display: flex; align-items: center; text-align: center; cursor: pointer;">' +
    '                <svg style="all: unset; align-self: center; margin: auto;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-send" viewBox="0 0 16 16">' +
    '                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>' +
    '                </svg>' +
    '            </div>' +
    '        </div>' +
    '        </span>' +
    '    </div>'

  document.body.insertAdjacentHTML('beforeend', modal)

  let toggle = true

  document.getElementById(minimizeid).addEventListener("click", function () {
    toggle ^= true;
    if (toggle == true) {
      document.getElementById(contentid).style.display = "none"
      document.getElementById(minimizeel).innerHTML = "+"
    } else {
      document.getElementById(contentid).style.display = "block"
      document.getElementById(minimizeel).innerHTML = "—"
    }
  })

  // +++++++++++++++++++++++++++++++++ //
  // BASIC FUNCTIONS                   //

  const { NeuralNetwork } = window.bot;

  const natural = window.natural;
  var tokenizer = new natural.WordTokenizer();

  let root = [];

  function getMsg() {
    let cache = root.length
    return new Promise((resolve, reject) => {
      function check() {
        setTimeout(() => {
          if (cache != root.length) {
            if (root[root.length - 1]?.msg) {
              resolve(root[root.length - 1].msg)
            }
          }
          check()
        }, 1000);
      }
      check()
    })
  }

  let sessionData = {
    lastId: "",
    lastIndex: 0,
    confusionStage: 0,
    lastBranch: [],
    lastOptions: []
  }

  let defaultIntents = intents;

  function createCorpus(input) {
    return new Promise((resolve, reject) => {
      let corpus = []
      try {
        input.forEach((el, index) => {
          el.data?.phrases?.forEach(phrase => {
            let tokens = tokenizer.tokenize(phrase.value)
            let doc = {
              input: {},
              output: { [el?.ref["@ref"].id]: 1 }
            }
            tokens.forEach(tok => {
              doc.input[natural.PorterStemmerIt.stem(tok)] = 1
            })
            corpus.push(doc)
          })
          if (index = input.length) {
            resolve(corpus)
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  function detectIntent(input, intents) {
    return new Promise((resolve, reject) => {
      const net = new NeuralNetwork();
      createCorpus(intents).then(corpus => {
        net.train(corpus);
        let tokens = tokenizer.tokenize(input)          //tokenize input
        //create corpus from input
        let transformedInput = []
        tokens.forEach(token => {
          transformedInput[natural.PorterStemmerIt.stem(token)] = 1
        })

        let result = net.run(transformedInput)                //analyze input

        //transform result
        let objres = []
        Object.keys(result).forEach(key => {
          objdoc = {
            intent: key,
            probability: result[key]
          }
          objres.push(objdoc)
        })

        //get best match
        let vals = objres.map(a => a.probability)
        let maxval = Math.max(...vals)

        //return best match
        if (maxval > 0.6) {
          let matchingId = objres.find(item => item.probability == maxval).intent
          let matchDoc = intents.find(item => item.ref["@ref"].id == matchingId)
          resolve(matchDoc)
        } else {
          if (sessionData.lastOptions.length > 0) {
            sessionData.lastOptions.forEach((branch, index) => {
              branch.forEach((option, optionIndex) => {
                if (natural.PorterStemmerIt.stem(input.toLowerCase()).includes(natural.PorterStemmerIt.stem(option))) {
                  let oldBranch = sessionData.lastBranch
                  oldBranch[index] = option

                  remediesList = defaultIntents.find(element => element.id == sessionData.lastId).remedies
                  remediesList.forEach(remedy => {
                    if (JSON.stringify(remedy.suitableFor.sort()) == JSON.stringify(oldBranch.sort())) {
                      addRes(remedy.items, true)
                      reject("ignore")
                    }
                  })
                } else {
                  if (optionIndex == branch.length - 1 && index == sessionData.lastOptions.length - 1) {
                    reject("no matches")
                  }
                }
              })
            })
          } else {
            reject("no matches")
          }
        }
      })
    })
  }

  function selectBranch(branch, lastRes) {
    return new Promise((resolve, reject) => {
      root.addOptions(branch.options)
      addRes(branch.question, false)
      let soFar = []
      if (lastRes) {
        soFar = lastRes
      }

      let branchIntents = [
        { input: { per: 1, favor: 1, cancell: 1 }, output: { cancel: 1 } },
        { input: { cancell: 1, per: 1, favor: 1 }, output: { cancel: 1 } },
        { input: { annullal: 1 }, output: { cancel: 1 } },
        { input: { annull: 1 }, output: { cancel: 1 } },
        { input: { cancell: 1, quell: 1 }, output: { cancel: 1 } },
        { input: { cancellal: 1 }, output: { cancel: 1 } },
        { input: { cancell: 1 }, output: { cancel: 1 } },
        { input: { salt: 1 }, output: { cancel: 1 } },
        { input: { saltal: 1 }, output: { cancel: 1 } },
        { input: { diment: 1 }, output: { cancel: 1 } },
        { input: { dimentical: 1 }, output: { cancel: 1 } },
        { input: { lasc: 1 }, output: { cancel: 1 } },
        { input: { lasc: 1, perd: 1 }, output: { cancel: 1 } },
        { input: { lascial: 1 }, output: { cancel: 1 } },
        { input: { salt: 1 }, output: { cancel: 1 } },
        { input: { ferm: 1 }, output: { cancel: 1 } },
        { input: { no: 1, cancell: 1 }, output: { cancel: 1 } },
        { input: { chiud: 1, la: 1, ricerc: 1 }, output: { cancel: 1 } },
        { input: { cos: 1, intend: 1 }, output: { clarify: 1 } },
        { input: { cos: 1, vuol: 1, dir: 1 }, output: { clarify: 1 } },
        { input: { qual: 1, la: 1, different: 1 }, output: { clarify: 1 } },
        { input: { cos: 1, camb: 1 }, output: { clarify: 1 } },
        { input: { non: 1, lo: 1, so: 1 }, output: { clarify: 1 } },
        { input: { non: 1, ho: 1, ide: 1 }, output: { clarify: 1 } },
        { input: { non: 1, cap: 1 }, output: { clarify: 1 } },
        { input: { non: 1, saprei: 1 }, output: { clarify: 1 } },
        { input: { che: 1, different: 1, c: 1 }, output: { clarify: 1 } }
      ]

      branch.options.forEach((phrase) => {
        let tokens = tokenizer.tokenize(phrase)
        let doc = {
          input: {},
          output: { [phrase]: 1 }
        }
        tokens.forEach(tok => {
          doc.input[natural.PorterStemmerIt.stem(tok)] = 1
        })
        branchIntents.push(doc)
      })

      const net = new NeuralNetwork();
      net.train(branchIntents);

      //ask question
      function askBranches() {
        getMsg().then(input => {

          let tokens = tokenizer.tokenize(input)        //tokenize input

          //create corpus from input
          let transformedInput = []
          tokens.forEach(token => {
            transformedInput[natural.PorterStemmerIt.stem(token)] = 1
          })

          let result = net.run(transformedInput)                //analyze input

          //transform result
          let objres = []
          Object.keys(result).forEach(key => {
            objdoc = {
              intent: key,
              probability: result[key]
            }
            objres.push(objdoc)
          })

          //get best match
          let vals = objres.map(a => a.probability)
          let maxval = Math.max(...vals)

          //return best match
          if (maxval > 0.7) {
            let finalres = objres.find(item => item.probability == maxval)
            if (branch.options.includes(finalres.intent)) {
              soFar.push(finalres.intent)
              resolve(soFar)
            } else {
              if (finalres.intent == "clarify") {
                addRes(branch.explaination, false)
                askBranches()
              }
              if (finalres.intent == "cancel") {
                root.addOptions([])
                addRes("Ok.", false)
                reject()
              }
            }
          } else {
            addRes("non ho capito, " + branch.question, false)
            askBranches()
          }
        })
      }
      askBranches()
    })
  }

  function ask(intents) {
    localStorage.setItem("Farmacia", JSON.stringify(root));
    getMsg().then(input => {
      detectIntent(input, intents).then(res => {
        if (res.confusedBot) {
          sessionData.confusionStage++
        } else {
          sessionData.confusionStage = 0
        }
        if (res.branches) {
          if (res.branches.length > 0) {
            sessionData.lastOptions = []
            function selectBranches(branches) {
              var result = Promise.resolve();
              branches.forEach(branch => {
                sessionData.lastOptions.push(branch.options)
                result = result.then((lastRes) => selectBranch(branch, lastRes));
              });
              return result;
            }
            document.getElementById("inputrow").classList.add("animate__slideInDown")
            setTimeout(() => {
              document.getElementById("inputrow").classList.remove("animate__slideInDown")
            }, 1000);
            selectBranches(res.branches).then(branchSelection => {
              sessionData.lastBranch = branchSelection
              res.remedies.forEach((remedyOption) => {
                if (JSON.stringify(remedyOption.suitableFor.sort()) == JSON.stringify(branchSelection.sort())) {
                  root.addOptions([])
                  document.getElementById("inputrow").classList.add("animate__slideInUp")
                  setTimeout(() => {
                    document.getElementById("inputrow").classList.remove("animate__slideInUp")
                  }, 1000);
                  addRes(remedyOption.items, true)
                  let followupSuggestions = []
                  remedyOption.followUp.forEach(followupitem => {
                    followupSuggestions.push(defaultIntents.find(element => element.intent == followupitem.intent).desc)
                  })
                  root.addOptions(followupSuggestions)
                  ask(defaultIntents)
                }
              })
            }).catch(err => {
              ask(defaultIntents)
            })
          } else {
            addRes(res.remedies[0].items, true)
            ask(defaultIntents)
          }
        } else {
          sessionData.lastOptions = []
          if (res.category == "follow-up") {

            let lastIntent = defaultIntents.find(element => element.id == sessionData.lastId)
            if (lastIntent.branches.length > 0) {
              let lastRemedy = lastIntent.remedies.find(intentElement => JSON.stringify(intentElement.suitableFor.sort()) == JSON.stringify(sessionData.lastBranch.sort()))
              let followUp = lastRemedy.followUp.find(remedyElement => remedyElement.intent == res.intent)

              if (followUp) {
                addRes(followUp.response, false)
              } else {
                addRes("Non ho informazioni in merito.", false)
              }
            }

          } else {
            root = [];
          }
          if (res.category != "conferma" && res.category != "intercalare" && res.category != "sintomo") {
            if (res?.defaultResponse?.length > 0) {
              addRes(res.defaultResponse[0], false)
            }
          }
          if (res.endConversation) {
            console.log("END")
            addRes("Grazie per avermi usato! Puoi contattare la farmacia al <a href='tel:1234567891'>1234567891</a>", false)
          } else {
            ask(defaultIntents)
          }

        }
        // if (res.category != "follow-up") {
        //   sessionData.lastId = res.id
        // }

        const remedy = () => {
          if (typeof res?.data?.rems[0] === 'string') {
            return res.data.rems[0];
          } else if (res.data?.rems[0]?.type === 'prodotto') {
            return `Il prodotto consigliato è ${res.data.rems[0].name}`;
          } else {
            return 'Purtroppo non ho un rimedio da consigliare :(';
          }
        }

        addRes(remedy(), false)
        ask(defaultIntents)

      }).catch(err => {
        console.log(err)
        if (err != "ignore") {
          root = [];
          sessionData.confusionStage++
          let confusedPhrases = [
            "Potresti essere più specifico?",
            "Scusami, non ho capito, potresti rifare la domanda?",
            "Non ho capito :("
          ]
          if (sessionData.confusionStage > 3) {
            sessionData.confusionStage = 0
            addRes("Purtroppo sto avendo difficoltà a capire le tue domande, se il problema persiste ti consiglio di lasciare un feedback a info@farmadoc.it", false)
          } else {
            addRes(confusedPhrases[sessionData.lastIndex], false)
          }
          if (sessionData.lastIndex < 2) {
            sessionData.lastIndex++
          } else {
            sessionData.lastIndex = 0
          }
        }
        ask(defaultIntents)
      })
    })
  }

  ask(defaultIntents);

  // ********************************* //


  const chatResponder = (msg) => {
    console.log(intents);
    console.log("MESSAGGIO INSERITO: " + msg);

    let newdoc = {
      msg,
      sender: "user"
    }

    root.push(newdoc)
    console.log(root)

  } // end chatResponder

  const addRes = (messaggio, status) => {
    let answer = `
    <div style="all: unset; display: block; text-align: left; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">
    <span style="all: unset; background-color: #33e894; padding: 15px; border-radius: 10px 10px 10px 0; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">
    ${messaggio}
    </span>
    </div>
    `
    document.getElementById(chatid).insertAdjacentHTML('afterbegin', answer)
  }

  if (result.authorised) {
    document.getElementById(sendid).addEventListener("click", function () {

      let msgsend = '<div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">' +
        '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">' +
        document.getElementById(msgid).value +
        '                    </span>' +
        '                </div>'

      document.getElementById(chatid).insertAdjacentHTML('afterbegin', msgsend)

      chatResponder(document.getElementById(msgid).value);
      document.getElementById(msgid).value = ""
      document.getElementById(chatid).insertAdjacentHTML('afterbegin', msgsend)
    })

    document.getElementById(msgid).addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        let msgsend = '                <div style="all: unset; display: block; text-align: right; width: 100%; position: relative;  box-sizing: border-box; margin-top: 10px">' +
          '                    <span style="all: unset; background-color: #b9b9b9; padding: 15px; border-radius: 10px 10px 0 10px; display: inline-block; max-width: 50%; word-wrap: break-word; overflow: hidden; position: relative; box-sizing: border-box">' +
          document.getElementById(msgid).value +
          '                    </span>' +
          '                </div>'
        document.getElementById(chatid).insertAdjacentHTML('afterbegin', msgsend)

        chatResponder(document.getElementById(msgid).value);
        document.getElementById(msgid).value = ""
      }
    })
    if (!result.res.activeSub) {
      document.getElementById(chatid).style.alignItems = "center"
      document.getElementById(chatid).style.flexDirection = "unset"
      document.getElementById(chatid).innerHTML = "<p style='color: grey'>Questa chat attualmente non è disponibile</p>"
    }
  } else {
    document.getElementById(chatid).style.alignItems = "center"
    document.getElementById(chatid).style.flexDirection = "unset"
    document.getElementById(chatid).innerHTML = "<p style='color: grey'>Questo sito internet non è autorizzato per usare la chat di Farmadoc</p>"
  }
}
