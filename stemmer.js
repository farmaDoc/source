const stopwords = [
    'ad', 'al', 'allo', 'ai', 'agli', 'all', 'agl', 'alla', 'alle', 'con', 'col', 'coi', 'da', 'dal', 'dallo',
    'dai', 'dagli', 'dall', 'dagl', 'dalla', 'dalle', 'di', 'del', 'dello', 'dei', 'degli', 'dell', 'degl',
    'della', 'delle', 'in', 'nel', 'nello', 'nei', 'negli', 'nell', 'negl', 'nella', 'nelle', 'su', 'sul',
    'sullo', 'sui', 'sugli', 'sull', 'sugl', 'sulla', 'sulle', 'per', 'tra', 'contro', 'io', 'tu', 'lui',
    'lei', 'noi', 'voi', 'loro', 'mio', 'mia', 'miei', 'mie', 'tuo', 'tua', 'tuoi', 'tue', 'suo', 'sua', 'suoi',
    'sue', 'nostro', 'nostra', 'nostri', 'nostre', 'vostro', 'vostra', 'vostri', 'vostre', 'mi', 'ti', 'ci',
    'vi', 'lo', 'la', 'li', 'le', 'gli', 'ne', 'il', 'un', 'uno', 'una', 'ma', 'ed', 'se', 'perché', 'anche', 'come',
    'dov', 'dove', 'che', 'chi', 'cui', 'non', 'più', 'quale', 'quanto', 'quanti', 'quanta', 'quante', 'quello',
    'quelli', 'quella', 'quelle', 'questo', 'questi', 'questa', 'queste', 'si', 'tutto', 'tutti', 'a', 'c', 'e',
    'i', 'l', 'o', 'ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno', 'abbia', 'abbiate', 'abbiano', 'avrò', 'avrai',
    'avrà', 'avremo', 'avrete', 'avranno', 'avrei', 'avresti', 'avrebbe', 'avremmo', 'avreste', 'avrebbero',
    'avevo', 'avevi', 'aveva', 'avevamo', 'avevate', 'avevano', 'ebbi', 'avesti', 'ebbe', 'avemmo', 'aveste',
    'ebbero', 'avessi', 'avesse', 'avessimo', 'avessero', 'avendo', 'avuto', 'avuta', 'avuti', 'avute', 'sono',
    'sei', 'è', 'siamo', 'siete', 'sia', 'siate', 'siano', 'sarò', 'sarai', 'sarà', 'saremo', 'sarete', 'saranno',
    'sarei', 'saresti', 'sarebbe', 'saremmo', 'sareste', 'sarebbero', 'ero', 'eri', 'era', 'eravamo', 'eravate',
    'erano', 'fui', 'fosti', 'fu', 'fummo', 'foste', 'furono', 'fossi', 'fosse', 'fossimo', 'fossero', 'essendo',
    'faccio', 'fai', 'facciamo', 'fanno', 'faccia', 'facciate', 'facciano', 'farò', 'farai', 'farà', 'faremo',
    'farete', 'faranno', 'farei', 'faresti', 'farebbe', 'faremmo', 'fareste', 'farebbero', 'facevo', 'facevi',
    'faceva', 'facevamo', 'facevate', 'facevano', 'feci', 'facesti', 'fece', 'facemmo', 'faceste', 'fecero',
    'facessi', 'facesse', 'facessimo', 'facessero', 'facendo', 'sto', 'stai', 'sta', 'stiamo', 'stanno', 'stia',
    'stiate', 'stiano', 'starò', 'starai', 'starà', 'staremo', 'starete', 'staranno', 'starei', 'staresti',
    'starebbe', 'staremmo', 'stareste', 'starebbero', 'stavo', 'stavi', 'stava', 'stavamo', 'stavate', 'stavano',
    'stetti', 'stesti', 'stette', 'stemmo', 'steste', 'stettero', 'stessi', 'stesse', 'stessimo', 'stessero', 'stando',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_']

const Stemmer = function () {

  const stemmer = this

  stemmer.stem = function (token) {
    return token
  }

  stemmer.tokenizeAndStem = function (text, keepStops) {
    const stemmedTokens = []

    new Tokenizer().tokenize(text).forEach(function (token) {
      if (keepStops || stopwords.words.indexOf(token) === -1) {
        let resultToken = token.toLowerCase()
        if (resultToken.match(/[a-zàèìòù0-9]/gi)) {
          resultToken = stemmer.stem(resultToken)
        }
        stemmedTokens.push(resultToken)
      }
    })

    return stemmedTokens
  }
}

const PorterStemmer = new Stemmer()

function isVowel (letter) {
  return (letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u' || letter === 'à' ||
    letter === 'è' || letter === 'ì' || letter === 'ò' || letter === 'ù')
}

function getNextVowelPos (token, start) {
  start = start + 1
  const length = token.length
  for (let i = start; i < length; i++) {
    if (isVowel(token[i])) {
      return i
    }
  }
  return length
}

function getNextConsonantPos (token, start) {
  const length = token.length
  for (let i = start; i < length; i++) { if (!isVowel(token[i])) return i }
  return length
}

function endsin (token, suffix) {
  if (token.length < suffix.length) return false
  return (token.slice(-suffix.length) === suffix)
}

function endsinArr (token, suffixes) {
  for (let i = 0; i < suffixes.length; i++) {
    if (endsin(token, suffixes[i])) return suffixes[i]
  }
  return ''
}

function replaceAcute (token) {
  let str = token.replace(/á/gi, 'à')
  str = str.replace(/é/gi, 'è')
  str = str.replace(/í/gi, 'ì')
  str = str.replace(/ó/gi, 'ò')
  str = str.replace(/ú/gi, 'ù')
  return str
}

function vowelMarking (token) {
  function replacer (match, p1, p2, p3) {
    return p1 + p2.toUpperCase() + p3
  }
  const str = token.replace(/([aeiou])(i|u)([aeiou])/g, replacer)
  return str
}

// perform full stemming algorithm on a single word
PorterStemmer.stem = function (token) {
  token = token.toLowerCase()
  token = replaceAcute(token)
  token = token.replace(/qu/g, 'qU')
  token = vowelMarking(token)

  if (token.length < 3) {
    return token
  }

  let r1 = token.length
  let r2 = token.length
  let rv = token.length
  const len = token.length
  // R1 is the region after the first non-vowel following a vowel,
  for (let i = 0; i < token.length - 1 && r1 === len; i++) {
    if (isVowel(token[i]) && !isVowel(token[i + 1])) {
      r1 = i + 2
    }
  }
  // Or is the null region at the end of the word if there is no such non-vowel.

  // R2 is the region after the first non-vowel following a vowel in R1
  for (let i = r1; i < token.length - 1 && r2 === len; i++) {
    if (isVowel(token[i]) && !isVowel(token[i + 1])) {
      r2 = i + 2
    }
  }

  // Or is the null region at the end of the word if there is no such non-vowel.

  // If the second letter is a consonant, RV is the region after the next following vowel,

  // RV as follow

  if (len > 3) {
    if (!isVowel(token[1])) {
      // If the second letter is a consonant, RV is the region after the next following vowel
      rv = getNextVowelPos(token, 1) + 1
    } else if (isVowel(token[0]) && isVowel(token[1])) {
      // or if the first two letters are vowels, RV is the region after the next consonant
      rv = getNextConsonantPos(token, 2) + 1
    } else {
      // otherwise (consonant-vowel case) RV is the region after the third letter. But RV is the end of the word if these positions cannot be found.
      rv = 3
    }
  }

  let r1txt = token.substring(r1)
  let r2txt = token.substring(r2)
  let rvtxt = token.substring(rv)

  const tokenOrig = token

  // Step 0: Attached pronoun

  const pronounSuf = ['glieli', 'glielo', 'gliene', 'gliela', 'gliele', 'sene', 'tene', 'cela', 'cele', 'celi', 'celo', 'cene', 'vela', 'vele', 'veli', 'velo', 'vene', 'mela', 'mele', 'meli', 'melo', 'mene', 'tela', 'tele', 'teli', 'telo', 'gli', 'ci', 'la', 'le', 'li', 'lo', 'mi', 'ne', 'si', 'ti', 'vi']
  const pronounSufPre1 = ['ando', 'endo']
  const pronounSufPre2 = ['ar', 'er', 'ir']
  let suf = endsinArr(token, pronounSuf)

  if (suf !== '') {
    const preSuff1 = endsinArr(rvtxt.slice(0, -suf.length), pronounSufPre1)
    const preSuff2 = endsinArr(rvtxt.slice(0, -suf.length), pronounSufPre2)

    if (preSuff1 !== '') {
      token = token.slice(0, -suf.length)
    }
    if (preSuff2 !== '') {
      token = token.slice(0, -suf.length) + 'e'
    }
  }

  if (token !== tokenOrig) {
    r1txt = token.substring(r1)
    r2txt = token.substring(r2)
    rvtxt = token.substring(rv)
  }

  const tokenAfter0 = token

  // Step 1:  Standard suffix removal

  if ((suf = endsinArr(r2txt, ['ativamente', 'abilamente', 'ivamente', 'osamente', 'icamente'])) !== '') {
    token = token.slice(0, -suf.length) // delete
  } else if ((suf = endsinArr(r2txt, ['icazione', 'icazioni', 'icatore', 'icatori', 'azione', 'azioni', 'atore', 'atori'])) !== '') {
    token = token.slice(0, -suf.length) // delete
  } else if ((suf = endsinArr(r2txt, ['logia', 'logie'])) !== '') {
    token = token.slice(0, -suf.length) + 'log' // replace with log
  } else if ((suf = endsinArr(r2txt, ['uzione', 'uzioni', 'usione', 'usioni'])) !== '') {
    token = token.slice(0, -suf.length) + 'u' // replace with u
  } else if ((suf = endsinArr(r2txt, ['enza', 'enze'])) !== '') {
    token = token.slice(0, -suf.length) + 'ente' // replace with ente
  } else if ((suf = endsinArr(rvtxt, ['amento', 'amenti', 'imento', 'imenti'])) !== '') {
    token = token.slice(0, -suf.length) // delete
  } else if ((suf = endsinArr(r1txt, ['amente'])) !== '') {
    token = token.slice(0, -suf.length) // delete
  } else if ((suf = endsinArr(r2txt, ['atrice', 'atrici', 'abile', 'abili', 'ibile', 'ibili', 'mente', 'ante', 'anti', 'anza', 'anze', 'iche', 'ichi', 'ismo', 'ismi', 'ista', 'iste', 'isti', 'istà', 'istè', 'istì', 'ico', 'ici', 'ica', 'ice', 'oso', 'osi', 'osa', 'ose'])) !== '') {
    token = token.slice(0, -suf.length) // delete
  } else if ((suf = endsinArr(r2txt, ['abilità', 'icità', 'ività', 'ità'])) !== '') {
    token = token.slice(0, -suf.length) // delete
  } else if ((suf = endsinArr(r2txt, ['icativa', 'icativo', 'icativi', 'icative', 'ativa', 'ativo', 'ativi', 'ative', 'iva', 'ivo', 'ivi', 'ive'])) !== '') {
    token = token.slice(0, -suf.length)
  }

  if (token !== tokenAfter0) {
    r1txt = token.substring(r1)
    r2txt = token.substring(r2)
    rvtxt = token.substring(rv)
  }

  const tokenAfter1 = token

  // Step 2:  Verb suffixes

  if (tokenAfter0 === tokenAfter1) {
    if ((suf = endsinArr(rvtxt, ['erebbero', 'irebbero', 'assero', 'assimo', 'eranno', 'erebbe', 'eremmo', 'ereste', 'eresti', 'essero', 'iranno', 'irebbe', 'iremmo', 'ireste', 'iresti', 'iscano', 'iscono', 'issero', 'arono', 'avamo', 'avano', 'avate', 'eremo', 'erete', 'erono', 'evamo', 'evano', 'evate', 'iremo', 'irete', 'irono', 'ivamo', 'ivano', 'ivate', 'ammo', 'ando', 'asse', 'assi', 'emmo', 'enda', 'ende', 'endi', 'endo', 'erai', 'Yamo', 'iamo', 'immo', 'irai', 'irei', 'isca', 'isce', 'isci', 'isco', 'erei', 'uti', 'uto', 'ita', 'ite', 'iti', 'ito', 'iva', 'ivi', 'ivo', 'ono', 'uta', 'ute', 'ano', 'are', 'ata', 'ate', 'ati', 'ato', 'ava', 'avi', 'avo', 'erà', 'ere', 'erò', 'ete', 'eva', 'evi', 'evo', 'irà', 'ire', 'irò', 'ar', 'ir'])) !== '') {
      token = token.slice(0, -suf.length)
    }
  }

  r1txt = token.substring(r1)
  r2txt = token.substring(r2)
  rvtxt = token.substring(rv)

  // Always do step 3.

  if ((suf = endsinArr(rvtxt, ['ia', 'ie', 'ii', 'io', 'ià', 'iè', 'iì', 'iò', 'a', 'e', 'i', 'o', 'à', 'è', 'ì', 'ò'])) !== '') {
    token = token.slice(0, -suf.length)
  }

  r1txt = token.substring(r1)
  r2txt = token.substring(r2)
  rvtxt = token.substring(rv)

  if ((suf = endsinArr(rvtxt, ['ch'])) !== '') {
    token = token.slice(0, -suf.length) + 'c' // replace with c
  } else if ((suf = endsinArr(rvtxt, ['gh'])) !== '') {
    token = token.slice(0, -suf.length) + 'g' // replace with g
  }

  r1txt = token.substring(r1)
  r2txt = token.substring(r2)
  rvtxt = token.substring(rv)

  return token.toLowerCase()
}