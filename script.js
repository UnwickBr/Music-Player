const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const loopBtn = document.getElementById('loop-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const volume = document.getElementById('volume');
const volumeIcon = document.querySelector('.volume-wrap span');
const progressTrack = document.getElementById('progress-track');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.getElementById('progress-thumb');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const vinyl = document.getElementById('vinyl');
const cover = document.getElementById('cover');
const queueList = document.getElementById('queue-list');
const lyricsBody = document.getElementById('lyrics-body');
const translationBody = document.getElementById('translation-body');
const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const waveBars = Array.from(document.querySelectorAll('.wave-bar'));
const controlIcons = {
  shuffle: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 3h5v5"></path>
      <path d="M4 20l6.5-6.5"></path>
      <path d="M15.5 8.5L20 4"></path>
      <path d="M4 4l16 16"></path>
      <path d="M16 16h5v5"></path>
    </svg>
  `,
  prev: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5v14"></path>
      <path d="M18 6l-8 6 8 6V6z"></path>
    </svg>
  `,
  play: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" stroke="none"></path>
    </svg>
  `,
  pause: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5h3v14H8z" fill="currentColor" stroke="none"></path>
      <path d="M13 5h3v14h-3z" fill="currentColor" stroke="none"></path>
    </svg>
  `,
  next: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 5v14"></path>
      <path d="M6 6l8 6-8 6V6z"></path>
    </svg>
  `,
  loop: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 2l4 4-4 4"></path>
      <path d="M3 11V9a3 3 0 0 1 3-3h15"></path>
      <path d="M7 22l-4-4 4-4"></path>
      <path d="M21 13v2a3 3 0 0 1-3 3H3"></path>
    </svg>
  `,
  volume: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4V5z"></path>
      <path d="M15.5 9.5a4.5 4.5 0 0 1 0 5"></path>
      <path d="M18.5 7a8 8 0 0 1 0 10"></path>
    </svg>
  `
};

const startDate = new Date(2025, 5, 7, 0, 0, 0, 0);

const aThousandYearsLrc = `[ti:A Thousand Years]
[ar:John Michael Howell]
[au:John Michael Howell ,JVKE e ZVC]
[la:EN]
[re:LRCgenerator.com]
[ve:4.00]

[00:00.75]I was a kid looking for love, full of hope inside
[00:12.40]But time was never kind to me, my heart grew cold as ice
[00:16.69]All out of luck, thought I was stuck, alone for all my life
[00:20.88]But I was proven wrong the moment I looked in your eyes

[00:25.03]It's true, until I'm in the grave
[00:29.08]Darling, I'll love you

[00:31.44]For a thousand years, dear
[00:35.51]Time is nothing when I'm here with you, oh-oh-ooh
[00:40.93]All my fears, tears, those memories, they disappear with you, oh-oh-ooh
[00:49.33]Till I turn into dust, I'll carry this love, my dear
[00:56.46]For a thousand years

[01:06.28]Saw very soon, something will bloom, like a lotus flower
[01:11.07]The bluest Moon will soon be Sun and turn to golden hour
[01:15.24]Hours and days, lost in your gaze, losing track of time
[01:19.21]Learning how to slow it down, appreciate our lives

[01:23.39]Just know, until I'm in the grave
[01:27.90]Darling, I'll love you

[01:33.00]For a thousand years, dear
[01:34.56]Time is nothing when I'm here with you, oh-oh-ooh
[01:39.53]All my fears, tears, those memories, they disappear with you, oh-oh-ooh
[01:48.10]Till I turn into dust, I'll carry this love, my dear
[01:55.12]For a thousand years

[02:01.02]Oh-ooh, ayy
[02:05.94]Set it all on fire, let it burn up brighter
[02:09.67]Love is a flame, and it's dancing away, to David playing on a lyre
[02:13.55]Set it all on fire, let the smoke go higher

[02:18.32]'Cause daring, I'll love you

[02:20.43]For a thousand years, dear
[02:24.40]Time is nothing when I'm here with you, oh-oh-ooh
[02:29.69]All my fears, tears, those memories, they disappear with you, oh-oh-ooh
[02:38.41]Till the air leaves my lungs, with each breath, I'll hold you near
[02:46.83]Till I turn into dust, I'll carry this love, my dear
[02:53.96]For a thousand years

[02:59.14]--- www.LRCgenerator.com ---`;

const blueLrc = `[ti:blue]
[ar:young aki]
[la:EN]
[re:LRCgenerator.com]
[ve:4.00]

[00:00.63]Your morning eyes, I could stare like watching stars
[00:25.96]I could walk you by and I'll tell without a thought
[00:32.32]You'd be mine, would you mind if I took your hand tonight?
[00:39.89]Know you're all that I want, this life

[00:47.35]I'll imagine we fell in love
[00:50.62]I'll nap under moonlight skies with you
[00:54.54]I think I'll picture us, you with the waves
[00:58.18]The ocean's colors on your face
[01:01.90]I'll leave my heart with your air
[01:06.05]So let me fly with you
[01:09.67]Will you be forever with me?

[01:46.92]My love will always stay by you
[01:52.39]I'll keep it safe, so don't you worry a thing
[01:57.87]I'll tell you I love you more
[02:01.44]It's stuck with you forever, so promise you won't let it go
[02:08.28]I'll trust the Universe will always bring me to you

[02:16.44]I'll imagine we fell in love
[02:19.36]I'll nap under moonlight skies with you
[02:23.23]I think I'll picture us, you with the waves
[02:26.85]The ocean's colors on your face
[02:30.62]I'll leave my heart with your air
[02:34.74]So let me fly with you
[02:38.46]Will you be forever with me?

[02:47.54]--- www.LRCgenerator.com ---`;

const blueTranslationLrc = `[ti:blue]
[ar:young aki]
[la:PT-BR]

[00:00.63]Seus olhos de manha, eu poderia ficar olhando como quem observa as estrelas
[00:25.96]Eu poderia caminhar ao seu lado e dizer tudo sem nem pensar
[00:32.32]Voce seria minha, se importaria se eu segurasse sua mao esta noite?
[00:39.89]Sei que voce e tudo o que eu quero nesta vida

[00:47.35]Eu vou imaginar que nos apaixonamos
[00:50.62]Vou cochilar com voce sob ceus iluminados pela lua
[00:54.54]Acho que vou imaginar nos dois, voce junto das ondas
[00:58.18]As cores do oceano no seu rosto
[01:01.90]Vou deixar meu coracao no seu ar
[01:06.05]Entao me deixa voar com voce
[01:09.67]Voce vai ficar para sempre comigo?

[01:46.92]Meu amor sempre vai permanecer ao seu lado
[01:52.39]Vou mante-lo seguro, entao nao se preocupe com nada
[01:57.87]Vou te dizer que eu te amo ainda mais
[02:01.44]Isso ficou preso em voce para sempre, entao promete que nao vai deixar escapar
[02:08.28]Vou confiar que o Universo sempre vai me trazer ate voce

[02:16.44]Eu vou imaginar que nos apaixonamos
[02:19.36]Vou cochilar com voce sob ceus iluminados pela lua
[02:23.23]Acho que vou imaginar nos dois, voce junto das ondas
[02:26.85]As cores do oceano no seu rosto
[02:30.62]Vou deixar meu coracao no seu ar
[02:34.74]Entao me deixa voar com voce
[02:38.46]Voce vai ficar para sempre comigo?`;

const herLrc = `[ti:audio]
[ar:jvke]
[la:EN]
[re:LRCgenerator.com]
[ve:4.00]

[00:00.48]look me dead in my eyes
[00:10.22](Dead in my) 'til the day that I die
[00:13.45](Dead inside) I just wanna feel alive
[00:16.82](With you, I'm alive) with you, I'm alive
[00:19.99]Fell in love, but it left me lonely
[00:23.40]Tried to trust, but it burned me slowly
[00:27.21]I didn't know what I was looking for
[00:31.19]'Til I found her
[00:37.83]I found her
[00:45.21]Without her
[00:47.97]I'm a mess (I'm a mess)
[00:49.49]There was nothing 'bout that love that made sense, I was stressed
[00:51.48]'Til I found her (oh, oh)
[00:58.12]I've run for many miles trying to find love
[01:02.95]From a woman that could love me and never leave my side
[01:06.15]And I've run for many miles trying to get away from
[01:09.89]The things I'm afraid of and everything inside
[01:13.04]You say that we're already done (done)
[01:15.67]But what does that even mean?
[01:16.98]You tell me to open my eyes
[01:18.62]Thank God it was just a dream
[01:20.20]I guess that's how you know that it's love
[01:21.96]When you're scared to death they'll leave
[01:23.58]Just say that you'll never leave, never leave
[01:25.36]look me dead in my eyes
[01:29.91](Dead in my) 'til the day that I die
[01:33.24](Dead inside) I just wanna feel alive
[01:36.64](With you, I'm alive) with you, I'm a-, uh
[01:40.22]Fell in love, but it left me lonely
[01:43.11]Tried to trust, but it burned me slowly
[01:46.68]I didn't know what I was looking for
[01:50.91]'Til I found her
[01:57.77]I found her
[02:04.55]Without her
[02:07.76]I'm a mess (I'm a mess)
[02:08.89]There was nothing 'bout that love that made sense, I was stressed
[02:11.38]'Til I found her (oh, oh)
[02:17.84]'Til we found her
[02:21.30]I'm a mess (I'm a mess)
[02:22.07]There was nothing 'bout that love that made sense, I was stressed
[02:24.83]'Til I found her (oh, oh)
[02:31.30]'Til I found her
[02:38.31]Ooh-ooh-ooh

[02:48.00]--- www.LRCgenerator.com ---`;

const herTranslationLrc = `[ti:Her]
[ar:JVKE]
[la:PT-BR]

[00:00.48]Olhe bem no fundo dos meus olhos
[00:10.22](No fundo dos meus) ate o dia em que eu morrer
[00:13.45](Morto por dentro) eu so quero me sentir vivo
[00:16.82](Com voce, eu estou vivo) com voce, eu estou vivo
[00:19.99]Me apaixonei, mas isso me deixou solitario
[00:23.40]Tentei confiar, mas isso me queimou aos poucos
[00:27.21]Eu nao sabia o que estava procurando
[00:31.19]Ate encontrar ela
[00:37.83]Eu encontrei ela
[00:45.21]Sem ela
[00:47.97]Eu sou uma bagunca (eu sou uma bagunca)
[00:49.49]Nao havia nada naquele amor que fizesse sentido, eu estava destruido
[00:51.48]Ate encontrar ela (oh, oh)
[00:58.12]Eu corri por muitas milhas tentando encontrar amor
[01:02.95]De uma mulher que pudesse me amar e nunca sair do meu lado
[01:06.15]E eu corri por muitas milhas tentando fugir de
[01:09.89]Das coisas que eu temo e de tudo aqui dentro
[01:13.04]Voce diz que nos ja terminamos (terminamos)
[01:15.67]Mas o que isso sequer significa?
[01:16.98]Voce me diz para abrir os olhos
[01:18.62]Ainda bem que foi so um sonho
[01:20.20]Acho que e assim que voce sabe que e amor
[01:21.96]Quando voce morre de medo de que a pessoa va embora
[01:23.58]So diga que voce nunca vai embora, nunca vai embora
[01:25.36]Olhe bem no fundo dos meus olhos
[01:29.91](No fundo dos meus) ate o dia em que eu morrer
[01:33.24](Morto por dentro) eu so quero me sentir vivo
[01:36.64](Com voce, eu estou vivo) com voce, eu estou, uh
[01:40.22]Me apaixonei, mas isso me deixou solitario
[01:43.11]Tentei confiar, mas isso me queimou aos poucos
[01:46.68]Eu nao sabia o que estava procurando
[01:50.91]Ate encontrar ela
[01:57.77]Eu encontrei ela
[02:04.55]Sem ela
[02:07.76]Eu sou uma bagunca (eu sou uma bagunca)
[02:08.89]Nao havia nada naquele amor que fizesse sentido, eu estava destruido
[02:11.38]Ate encontrar ela (oh, oh)
[02:17.84]Ate nos encontrarmos nela
[02:21.30]Eu sou uma bagunca (eu sou uma bagunca)
[02:22.07]Nao havia nada naquele amor que fizesse sentido, eu estava destruido
[02:24.83]Ate encontrar ela (oh, oh)
[02:31.30]Ate encontrar ela
[02:38.31]Ooh-ooh-ooh`;

const ordinaryLrc = `[ti:Alex Warren - Ordinary]

[00:08.00]They say the holy water's watered down
[00:11.56]And this town's lost its faith
[00:14.24]Our colors will fade eventually
[00:17.26]So if our time is running out day after day
[00:22.44]We'll make the mundane our masterpiece

[00:26.22]Oh my, my
[00:28.54]Oh my, my love
[00:32.04]I take one look at you

[00:33.99]You're taking me out of the ordinary
[00:37.44]I want you laying me down
[00:39.58]Till we're dead and buried
[00:41.67]On the edge of your knife
[00:44.00]Staying drunk on your vine
[00:46.74]The angels up in the clouds
[00:49.42]Are jealous knowing we found
[00:51.31]Something so out of the ordinary
[00:54.44]You got me kissing the ground of your sanctuary
[00:58.84]Shatter me with your touch
[01:01.07]Oh, Lord, return me to dust
[01:04.10]The angels up in the clouds
[01:06.50]Are jealous knowing we found

[01:09.72]Hopeless hallelujah
[01:13.74]Oh, this side of Heaven's gate
[01:18.23]Oh, my life, how do ya
[01:22.60]Breathe and take my breath away?

[01:27.36]At your altar, I will pray
[01:29.82]You're the sculptor, I'm the clay
[01:32.71]Oh my, my

[01:34.07]You're taking me out of the ordinary
[01:37.53]I want you laying me down
[01:39.57]Till we're dead and buried
[01:41.88]On the edge of your knife
[01:43.98]Staying drunk on your vine
[01:46.98]The angels up in the clouds
[01:49.40]Are jealous knowing we found
[01:51.21]Something so out (out) of the ordinary (ordinary)
[01:54.93]You got me kissing the ground (ground) of your sanctuary (sanctuary)
[01:59.14]Shatter me with your touch
[02:01.17]Oh, Lord, return me to dust
[02:04.19]The angels up in the clouds
[02:06.47]Are jealous knowing we found

[02:09.30]Something so heavenly, higher than ecstasy
[02:13.57]Whenever you're next to me, oh my, my
[02:17.84]World was in black and white until I saw your light
[02:22.14]I thought you had to die to find

[02:25.56]Something so out of the ordinary
[02:29.13]I want you laying me down
[02:31.04]Till we're dead and buried
[02:33.33]On the edge of your knife
[02:35.29]Staying drunk on your vine
[02:38.28]The angels up in the clouds
[02:40.56]Are jealous knowing we found
[02:42.56]Something so out (out) of the ordinary
[02:46.00]You got me kissing the ground (ground) of your sanctuary (sanctuary)
[02:50.39]Shatter me with your touch
[02:52.86]Oh, Lord, return me to dust
[02:55.50]The angels up in the clouds
[02:57.80]Are jealous knowing we found`;

const ordinaryTranslationLrc = `[ti:Ordinary]
[ar:Alex Warren]
[la:PT-BR]

[00:08.00]Dizem que a agua benta esta diluida
[00:11.56]E que esta cidade perdeu a fe
[00:14.24]Nossas cores vao desaparecer um dia
[00:17.26]Entao, se o nosso tempo esta acabando dia apos dia
[00:22.44]Vamos transformar o comum em nossa obra-prima

[00:26.22]Oh meu, meu
[00:28.54]Oh meu, meu amor
[00:32.04]Eu dou uma olhada em voce

[00:33.99]Voce esta me tirando do comum
[00:37.44]Eu quero voce me deitando
[00:39.58]Ate estarmos mortos e enterrados
[00:41.67]Na ponta da sua faca
[00:44.00]Embriagado na sua vinha
[00:46.74]Os anjos la nas nuvens
[00:49.42]Têm inveja de saber que encontramos
[00:51.31]Algo tao fora do comum
[00:54.44]Voce me faz beijar o chao do seu santuario
[00:58.84]Me despedace com o seu toque
[01:01.07]Oh, Senhor, me devolva ao po
[01:04.10]Os anjos la nas nuvens
[01:06.50]Têm inveja de saber que encontramos

[01:09.72]Aleluia sem esperanca
[01:13.74]Oh, deste lado dos portoes do ceu
[01:18.23]Oh, minha vida, como voce
[01:22.60]Respira e tira o meu folego?

[01:27.36]No seu altar, eu vou rezar
[01:29.82]Voce e a escultora, eu sou o barro
[01:32.71]Oh meu, meu

[01:34.07]Voce esta me tirando do comum
[01:37.53]Eu quero voce me deitando
[01:39.57]Ate estarmos mortos e enterrados
[01:41.88]Na ponta da sua faca
[01:43.98]Embriagado na sua vinha
[01:46.98]Os anjos la nas nuvens
[01:49.40]Têm inveja de saber que encontramos
[01:51.21]Algo tao fora (fora) do comum (comum)
[01:54.93]Voce me faz beijar o chao (chao) do seu santuario (santuario)
[01:59.14]Me despedace com o seu toque
[02:01.17]Oh, Senhor, me devolva ao po
[02:04.19]Os anjos la nas nuvens
[02:06.47]Têm inveja de saber que encontramos

[02:09.30]Algo tao celestial, mais alto que o extase
[02:13.57]Sempre que voce esta ao meu lado, oh meu, meu
[02:17.84]O mundo estava em preto e branco ate eu ver a sua luz
[02:22.14]Eu pensei que precisava morrer para encontrar

[02:25.56]Algo tao fora do comum
[02:29.13]Eu quero voce me deitando
[02:31.04]Ate estarmos mortos e enterrados
[02:33.33]Na ponta da sua faca
[02:35.29]Embriagado na sua vinha
[02:38.28]Os anjos la nas nuvens
[02:40.56]Têm inveja de saber que encontramos
[02:42.56]Algo tao fora (fora) do comum
[02:46.00]Voce me faz beijar o chao (chao) do seu santuario (santuario)
[02:50.39]Me despedace com o seu toque
[02:52.86]Oh, Senhor, me devolva ao po
[02:55.50]Os anjos la nas nuvens
[02:57.80]Têm inveja de saber que encontramos`;

const letTheWorldBurnLrc = `[ti:Chris Grey - LET THE WORLD BURN]

[00:02.06]Lost in the fog
[00:08.38]I fear that there's still further to fall
[00:13.75]It's dangerous 'cause I want it all
[00:18.92]And I don't think I care what it costs
[00:23.97]I shouldn't have fallen in love
[00:26.71]Look what it made me become
[00:29.42]I let you get too close
[00:31.95]Just to wake up alone
[00:34.50]And I know you think you can run
[00:37.05]You're scared to believe I'm the one
[00:39.90]But I just can't let you go
[00:44.85]I'd let the world burn
[00:47.87]Let the world burn for you
[00:50.47]This is how it always had to end
[00:53.25]If I can't have you then no one can
[00:55.98]I'd let it burn
[00:58.35]I'd let the world burn
[01:00.94]Just to hear you calling out my name
[01:03.49]Watching it all go down in flames
[01:06.78]Fear in their eyes
[01:10.65]Ash raining from the blood orange sky
[01:15.47]I let everybody know that you're mine
[01:19.96]Now it's just a matter of time
[01:25.78]Before we're swept into the dust
[01:28.63]Look what you made me become
[01:31.26]I let you get too close
[01:33.86]Just to wake up alone
[01:36.43]And I know you think you can run
[01:38.92]You're scared to believe I'm the one
[01:41.71]But I just can't let you go
[01:46.68]I'd let the world burn
[01:49.46]Let the world burn for you
[01:52.41]This is how it always had to end
[01:55.22]If I can't have you then no one can
[01:57.96]I'd let it burn
[02:00.27]I'd let the world burn
[02:02.86]Just to hear you calling out my name
[02:05.49]Watching it all go down in flames
[02:08.75]Let it all burn
[02:12.63]Oh, I'd burn this world for you
[02:17.25]Oh, baby, I'd let it burn
[02:23.53]For you
[02:27.76]I'd let the world burn
[02:30.76]Let the world burn for you
[02:33.67]This is how it always had to end
[02:36.70]If I can't have you then no one can`;

const letTheWorldBurnTranslationLrc = `[ti:LET THE WORLD BURN]
[ar:Chris Grey]
[la:PT-BR]

[00:02.06]Perdido na nevoa
[00:08.38]Eu temo que ainda haja mais para cair
[00:13.75]E perigoso porque eu quero tudo
[00:18.92]E eu nao acho que me importe com o preco
[00:23.97]Eu nao deveria ter me apaixonado
[00:26.71]Olha no que isso me transformou
[00:29.42]Eu deixei voce chegar perto demais
[00:31.95]So para acordar sozinho
[00:34.50]E eu sei que voce acha que pode fugir
[00:37.05]Voce tem medo de acreditar que eu sou o certo
[00:39.90]Mas eu simplesmente nao consigo te deixar ir
[00:44.85]Eu deixaria o mundo queimar
[00:47.87]Deixaria o mundo queimar por voce
[00:50.47]E assim que isso sempre teve que terminar
[00:53.25]Se eu nao puder ter voce, ninguem pode
[00:55.98]Eu deixaria queimar
[00:58.35]Eu deixaria o mundo queimar
[01:00.94]So para ouvir voce chamar o meu nome
[01:03.49]Vendo tudo desabar em chamas
[01:06.78]Medo nos olhos deles
[01:10.65]Cinzas caindo de um ceu vermelho-sangue
[01:15.47]Eu deixei todo mundo saber que voce e minha
[01:19.96]Agora e so questao de tempo
[01:25.78]Antes de sermos varridos para o po
[01:28.63]Olha no que voce me transformou
[01:31.26]Eu deixei voce chegar perto demais
[01:33.86]So para acordar sozinho
[01:36.43]E eu sei que voce acha que pode fugir
[01:38.92]Voce tem medo de acreditar que eu sou o certo
[01:41.71]Mas eu simplesmente nao consigo te deixar ir
[01:46.68]Eu deixaria o mundo queimar
[01:49.46]Deixaria o mundo queimar por voce
[01:52.41]E assim que isso sempre teve que terminar
[01:55.22]Se eu nao puder ter voce, ninguem pode
[01:57.96]Eu deixaria queimar
[02:00.27]Eu deixaria o mundo queimar
[02:02.86]So para ouvir voce chamar o meu nome
[02:05.49]Vendo tudo desabar em chamas
[02:08.75]Deixe tudo queimar
[02:12.63]Oh, eu queimaria este mundo por voce
[02:17.25]Oh, baby, eu deixaria queimar
[02:23.53]Por voce
[02:27.76]Eu deixaria o mundo queimar
[02:30.76]Deixaria o mundo queimar por voce
[02:33.67]E assim que isso sempre teve que terminar
[02:36.70]Se eu nao puder ter voce, ninguem pode`;

const infinityLrc = `[ti:jaymes young - infinity]

[00:03.51]Baby, this love
[00:18.11]I'll never let it die
[00:21.09]Can't be touched by no one
[00:25.21]I'd like to see 'em try
[00:28.93]I'm a mad man for your touch, girl, I've lost control
[00:36.78]I'm gonna make this last forever, don't tell me it's impossible
[00:44.95]'Cause I love you for infinity (oh-oh-oh)
[00:50.36]I love you for infinity (oh-oh-oh)
[00:53.95]'Cause I love you for infinity (oh-oh-oh)
[00:57.99]I love you for infinity (oh-oh-oh)
[01:17.75]Oh, darling, my soul
[01:20.85]You know it aches for yours
[01:24.08]And you've been filling this hole
[01:28.57]Since you were born, oh
[01:34.15]'Cause you're the reason I believe in fate, you're my paradise
[01:40.30]And I'll do anything to be your love or be your sacrifice
[01:47.83]'Cause I love you for infinity (oh-oh-oh)
[01:53.02]I love you for infinity (oh-oh-oh)
[01:56.90]'Cause I love you for infinity (oh-oh-oh)
[02:01.00]I love you for infinity (yeah-eh, oh-oh-oh)
[02:22.00]Meet me at the bottom of the ocean
[02:26.71]Where the time is frozen
[02:30.27]Where all the universe is open
[02:34.54]Love isn't random, we are chosen
[02:38.31]And we could wear the same crown
[02:42.65]Keep slowing your heart down
[02:47.43]We are the gods now
[02:51.65]'Cause I love you for infinity (oh-oh-oh)
[02:56.21]I love you for infinity (oh-oh-oh)
[02:59.86]'Cause I love you for infinity (oh-oh-oh)
[03:03.83]I love you for infinity (oh-oh-oh)`;

const infinityTranslationLrc = `[ti:Infinity]
[ar:Jaymes Young]
[la:PT-BR]

[00:03.51]Baby, este amor
[00:18.11]Eu nunca vou deixar morrer
[00:21.09]Nao pode ser tocado por ninguem
[00:25.21]Eu gostaria de ver tentarem
[00:28.93]Eu sou louco pelo seu toque, garota, perdi o controle
[00:36.78]Vou fazer isso durar para sempre, nao me diga que e impossivel
[00:44.95]Porque eu te amo ate o infinito (oh-oh-oh)
[00:50.36]Eu te amo ate o infinito (oh-oh-oh)
[00:53.95]Porque eu te amo ate o infinito (oh-oh-oh)
[00:57.99]Eu te amo ate o infinito (oh-oh-oh)
[01:17.75]Oh, querida, minha alma
[01:20.85]Voce sabe que ela anseia pela sua
[01:24.08]E voce tem preenchido esse vazio
[01:28.57]Desde que nasceu, oh
[01:34.15]Porque voce e a razao pela qual eu acredito no destino, voce e o meu paraiso
[01:40.30]E eu faria qualquer coisa para ser o seu amor ou o seu sacrificio
[01:47.83]Porque eu te amo ate o infinito (oh-oh-oh)
[01:53.02]Eu te amo ate o infinito (oh-oh-oh)
[01:56.90]Porque eu te amo ate o infinito (oh-oh-oh)
[02:01.00]Eu te amo ate o infinito (yeah-eh, oh-oh-oh)
[02:22.00]Me encontre no fundo do oceano
[02:26.71]Onde o tempo esta congelado
[02:30.27]Onde todo o universo esta aberto
[02:34.54]O amor nao e aleatorio, fomos escolhidos
[02:38.31]E poderiamos usar a mesma coroa
[02:42.65]Continue desacelerando o seu coracao
[02:47.43]Nos somos os deuses agora
[02:51.65]Porque eu te amo ate o infinito (oh-oh-oh)
[02:56.21]Eu te amo ate o infinito (oh-oh-oh)
[02:59.86]Porque eu te amo ate o infinito (oh-oh-oh)
[03:03.83]Eu te amo ate o infinito (oh-oh-oh)`;

const dieWithASmileLrc = `[ti:Lady Gaga, Bruno Mars - Die With A Smile]
[la:EN]
[re:LRCgenerator.com]
[ve:4.00]

[00:00.40]Ooh
[00:08.18]I

[00:11.03]I just woke up from a dream
[00:15.00]Where you and I had to say goodbye
[00:19.62]And I don't know what it all means
[00:24.22]But since I survived, I realized

[00:28.72]Wherever you go, that's where I'll follow
[00:33.60]Nobody's promised tomorrow
[00:37.99]So I'ma love you every night like it's the last night
[00:42.96]Like it's the last night

[00:44.60]If the world was ending, I'd wanna be next to you
[00:53.18]If the party was over and our time on Earth was through
[01:02.71]I'd wanna hold you just for a while
[01:07.59]And die with a smile
[01:11.71]If the world was ending, I'd wanna be next to you

[01:18.91]Woo-ooh

[01:24.53]Ooh, lost
[01:27.90]Lost in the words that we scream
[01:32.40]I don't even wanna do this anymore
[01:37.26]'Cause you already know what you mean to me
[01:40.99]And our love's the only war worth fighting for

[01:46.15]Wherever you go, that's where I'll follow
[01:51.08]Nobody's promised tomorrow
[01:55.40]So I'ma love you every night like it's the last night
[01:59.55]Like it's the last night

[02:02.04]If the world was ending, I'd wanna be next to you
[02:10.90]If the party was over and our time on Earth was through
[02:20.08]I'd wanna hold you just for a while
[02:24.66]And die with a smile
[02:29.21]If the world was ending, I'd wanna be next to you

[02:37.33]Right next to you
[02:41.42]Next to you
[02:46.74]Right next to you
[02:50.74]Oh-oh-oh

[03:09.53]If the world was ending, I'd wanna be next to you
[03:19.36]If the party was over and our time on Earth was through
[03:28.33]I'd wanna hold you just for a while
[03:33.21]And die with a smile
[03:37.75]If the world was ending, I'd wanna be next to you
[03:46.46]If the world was ending, I'd wanna be next to you

[03:54.92]Ooh, ooh
[03:58.79]I'd wanna be next to you

[04:06.33]--- www.LRCgenerator.com ---`;

const dieWithASmileTranslationLrc = `[ti:Die With A Smile]
[ar:Lady Gaga, Bruno Mars]
[la:PT-BR]

[00:00.40]Ooh
[00:08.18]Eu

[00:11.03]Acabei de acordar de um sonho
[00:15.00]Em que voce e eu precisavamos dizer adeus
[00:19.62]E eu nao sei o que tudo isso significa
[00:24.22]Mas, como eu sobrevivi, percebi

[00:28.72]Onde quer que voce va, e para la que eu vou
[00:33.60]Ninguem tem o amanha garantido
[00:37.99]Entao eu vou te amar toda noite como se fosse a ultima
[00:42.96]Como se fosse a ultima noite

[00:44.60]Se o mundo estivesse acabando, eu queria estar ao seu lado
[00:53.18]Se a festa acabasse e o nosso tempo na Terra terminasse
[01:02.71]Eu iria querer te abracar so por um instante
[01:07.59]E morrer com um sorriso
[01:11.71]Se o mundo estivesse acabando, eu queria estar ao seu lado

[01:18.91]Woo-ooh

[01:24.53]Ooh, perdido
[01:27.90]Perdido nas palavras que gritamos
[01:32.40]Eu nem quero mais fazer isso
[01:37.26]Porque voce ja sabe o que significa para mim
[01:40.99]E o nosso amor e a unica guerra pela qual vale a pena lutar

[01:46.15]Onde quer que voce va, e para la que eu vou
[01:51.08]Ninguem tem o amanha garantido
[01:55.40]Entao eu vou te amar toda noite como se fosse a ultima
[01:59.55]Como se fosse a ultima noite

[02:02.04]Se o mundo estivesse acabando, eu queria estar ao seu lado
[02:10.90]Se a festa acabasse e o nosso tempo na Terra terminasse
[02:20.08]Eu iria querer te abracar so por um instante
[02:24.66]E morrer com um sorriso
[02:29.21]Se o mundo estivesse acabando, eu queria estar ao seu lado

[02:37.33]Bem ao seu lado
[02:41.42]Ao seu lado
[02:46.74]Bem ao seu lado
[02:50.74]Oh-oh-oh

[03:09.53]Se o mundo estivesse acabando, eu queria estar ao seu lado
[03:19.36]Se a festa acabasse e o nosso tempo na Terra terminasse
[03:28.33]Eu iria querer te abracar so por um instante
[03:33.21]E morrer com um sorriso
[03:37.75]Se o mundo estivesse acabando, eu queria estar ao seu lado
[03:46.46]Se o mundo estivesse acabando, eu queria estar ao seu lado

[03:54.92]Ooh, ooh
[03:58.79]Eu queria estar ao seu lado`;

const untilIFoundYouLrc = `[ti:Until I Found You (Em Beihold Version) - Stephen Sanchez]

[00:00.00]Georgia
[00:13.06]Wrap me up in all your, I want ya
[00:19.86]In my arms, oh, let me hold ya
[00:27.16]I'll never let you go again like I did
[00:33.12]Oh, I used to say

[00:36.72]I would never fall in love again until I found her
[00:43.74]I said: I would never fall unless it's you I fall into
[00:51.03]I was lost within the darkness, but then I found her
[00:57.71]I found you

[01:05.67]Heaven
[01:09.61]When I held you again
[01:13.37]How could
[01:17.07]We ever just be friends?

[01:20.90]I would
[01:23.04]Rather die than let you go
[01:26.43]Juliet to your Romeo
[01:30.02]How I heard you say

[01:33.82]I would never fall in love again until I found her
[01:40.93]I said: I would never fall unless it's you I fall into
[01:48.09]I was lost within the darkness, but then I found her
[01:54.75]I found you

[02:17.01]I would never fall in love again until I found her
[02:23.41]I said: I would never fall unless it's you I fall into
[02:30.56]I was lost within the darkness, but then I found her
[02:37.19]I found you`;

const untilIFoundYouTranslationLrc = `[ti:Until I Found You]
[ar:Stephen Sanchez]
[la:PT-BR]

[00:00.00]Georgia
[00:13.06]Me envolve em tudo o que e seu, eu te quero
[00:19.86]Nos meus bracos, oh, deixa eu te abracar
[00:27.16]Eu nunca vou te deixar ir de novo como eu fiz
[00:33.12]Oh, eu costumava dizer

[00:36.72]Eu nunca me apaixonaria de novo ate encontrar ela
[00:43.74]Eu disse: eu nunca cairia, a nao ser que fosse em voce
[00:51.03]Eu estava perdido na escuridao, mas entao encontrei ela
[00:57.71]Eu encontrei voce

[01:05.67]Ceu
[01:09.61]Quando eu te abracei de novo
[01:13.37]Como e que
[01:17.07]Nos poderiamos ser apenas amigos?

[01:20.90]Eu
[01:23.04]Prefiro morrer do que te deixar ir
[01:26.43]Julieta para o seu Romeu
[01:30.02]Foi assim que eu ouvi voce dizer

[01:33.82]Eu nunca me apaixonaria de novo ate encontrar ela
[01:40.93]Eu disse: eu nunca cairia, a nao ser que fosse em voce
[01:48.09]Eu estava perdido na escuridao, mas entao encontrei ela
[01:54.75]Eu encontrei voce

[02:17.01]Eu nunca me apaixonaria de novo ate encontrar ela
[02:23.41]Eu disse: eu nunca cairia, a nao ser que fosse em voce
[02:30.56]Eu estava perdido na escuridao, mas entao encontrei ela
[02:37.19]Eu encontrei voce`;

const aThousandYearsTranslationLrc = `[ti:A Thousand Years]
[ar:John Michael Howell]
[la:PT-BR]

[00:00.75]Eu era uma crianca procurando amor, cheio de esperanca por dentro
[00:12.40]Mas o tempo nunca foi gentil comigo, meu coracao ficou frio como gelo
[00:16.69]Sem sorte nenhuma, achei que estava preso, sozinho por toda a minha vida
[00:20.88]Mas eu provei que estava errado no momento em que olhei nos seus olhos

[00:25.03]E verdade, ate eu estar no tumulo
[00:29.08]Meu bem, eu vou te amar

[00:31.44]Por mil anos, querida
[00:35.51]O tempo nao e nada quando estou aqui com voce, oh-oh-ooh
[00:40.93]Todos os meus medos, lagrimas e lembrancas desaparecem com voce, oh-oh-ooh
[00:49.33]Ate eu virar poeira, vou carregar esse amor, minha querida
[00:56.46]Por mil anos

[01:06.28]Vi bem cedo que algo vai florescer, como uma flor de lotus
[01:11.07]A lua mais azul logo vai virar sol e se transformar em hora dourada
[01:15.24]Horas e dias, perdido no seu olhar, perdendo a nocao do tempo
[01:19.21]Aprendendo a desacelerar, a valorizar as nossas vidas

[01:23.39]So saiba, ate eu estar no tumulo
[01:27.90]Meu bem, eu vou te amar

[01:33.00]Por mil anos, querida
[01:34.56]O tempo nao e nada quando estou aqui com voce, oh-oh-ooh
[01:39.53]Todos os meus medos, lagrimas e lembrancas desaparecem com voce, oh-oh-ooh
[01:48.10]Ate eu virar poeira, vou carregar esse amor, minha querida
[01:55.12]Por mil anos

[02:01.02]Oh-ooh, ayy
[02:05.94]Coloque tudo em chamas, deixe arder ainda mais forte
[02:09.67]O amor e uma chama, e esta dancando ao som de Davi tocando uma lira
[02:13.55]Coloque tudo em chamas, deixe a fumaca subir mais alto

[02:18.32]Porque, meu bem, eu vou te amar

[02:20.43]Por mil anos, querida
[02:24.40]O tempo nao e nada quando estou aqui com voce, oh-oh-ooh
[02:29.69]Todos os meus medos, lagrimas e lembrancas desaparecem com voce, oh-oh-ooh
[02:38.41]Ate o ar sair dos meus pulmoes, a cada respiracao vou te manter por perto
[02:46.83]Ate eu virar poeira, vou carregar esse amor, minha querida
[02:53.96]Por mil anos`;

function parseLrc(lrcText) {
  return lrcText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2}\.\d{2})\](.*)$/);
      if (!match) {
        return null;
      }

      const minutes = Number(match[1]);
      const seconds = Number(match[2]);
      const text = match[3].trim();

      if (!text) {
        return null;
      }

      return {
        time: minutes * 60 + seconds,
        text
      };
    })
    .filter(Boolean);
}

const playlist = [
  {
    title: 'Blue',
    artist: 'Young Kai',
    plays: '9.5M plays',
    src: 'blue.mp3',
    cover: 'blue.jpg',
    lyrics: parseLrc(blueLrc),
    translation: parseLrc(blueTranslationLrc)
  },
  {
    title: 'A Thousand Years',
    artist: 'John Michael Howell, JVKE e ZVC',
    plays: '1.2B plays',
    src: 'A Thousand Years.mp3',
    cover: 'A Thousand Years.jpg',
    lyrics: parseLrc(aThousandYearsLrc),
    translation: parseLrc(aThousandYearsTranslationLrc)
  },
  {
    title: 'Her',
    artist: 'JVKE',
    plays: '1.8M plays',
    src: 'Her.mp3',
    cover: 'Her.jpg',
    lyrics: parseLrc(herLrc),
    translation: parseLrc(herTranslationLrc)
  },
  {
    title: 'Ordinary',
    artist: 'Alex Warren',
    plays: '',
    src: 'Alex Warren - Ordinary.mp3',
    cover: 'Alex Warren - Ordinary.jpg',
    lyrics: parseLrc(ordinaryLrc),
    translation: parseLrc(ordinaryTranslationLrc)
  },
  {
    title: 'LET THE WORLD BURN',
    artist: 'Chris Grey',
    plays: '',
    src: 'Chris Grey - LET THE WORLD BURN.mp3',
    cover: 'Chris Grey- Let the World Burn.jpg',
    lyrics: parseLrc(letTheWorldBurnLrc),
    translation: parseLrc(letTheWorldBurnTranslationLrc)
  },
  {
    title: 'Infinity',
    artist: 'Jaymes Young',
    plays: '',
    src: 'jaymes young - infinity.mp3',
    cover: 'Jaymes Young - Infinity.png',
    lyrics: parseLrc(infinityLrc),
    translation: parseLrc(infinityTranslationLrc)
  },
  {
    title: 'Die With A Smile',
    artist: 'Lady Gaga, Bruno Mars',
    plays: '',
    src: 'Lady Gaga, Bruno Mars - Die With A Smile.mp3',
    cover: 'Lady Gaga, Bruno Mars - Die With A Smile.jpg',
    lyrics: parseLrc(dieWithASmileLrc),
    translation: parseLrc(dieWithASmileTranslationLrc)
  },
  {
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    plays: '',
    src: 'Until I Found You (Em Beihold Version) - Stephen Sanchez.mp3',
    cover: 'Until I Found You (Em Beihold Version).jpg',
    lyrics: parseLrc(untilIFoundYouLrc),
    translation: parseLrc(untilIFoundYouTranslationLrc)
  }
];

let currentIndex = 0;
let activeTab = 'queue';
let shuffle = false;
let audioContext;
let analyser;
let sourceNode;
let frequencyData;
let animationFrameId;
let waveformReady = false;
const syncedPanelState = {
  lyrics: -1,
  translation: -1
};
const panelInteractionState = {
  lyrics: {
    autoScrolling: false,
    idleTimer: null,
    userScrolling: false
  },
  translation: {
    autoScrolling: false,
    idleTimer: null,
    userScrolling: false
  }
};

function getPanelContainer(panelName) {
  return panelName === 'translation' ? translationBody : lyricsBody;
}

function schedulePanelResync(panelName) {
  const panelState = panelInteractionState[panelName];
  if (!panelState) {
    return;
  }

  window.clearTimeout(panelState.idleTimer);
  panelState.idleTimer = window.setTimeout(() => {
    panelState.userScrolling = false;

    if (activeTab === panelName) {
      updateSyncedPanel(panelName);
    }
  }, 2000);
}

function registerPanelScroll(panelName) {
  const container = getPanelContainer(panelName);
  if (!container) {
    return;
  }

  container.addEventListener('scroll', () => {
    const panelState = panelInteractionState[panelName];
    if (!panelState || panelState.autoScrolling) {
      return;
    }

    panelState.userScrolling = true;
    schedulePanelResync(panelName);
  });
}

function applyControlIcons() {
  shuffleBtn.innerHTML = controlIcons.shuffle;
  prevBtn.innerHTML = controlIcons.prev;
  nextBtn.innerHTML = controlIcons.next;
  loopBtn.innerHTML = controlIcons.loop;
  playBtn.innerHTML = audio.paused ? controlIcons.play : controlIcons.pause;

  if (volumeIcon) {
    volumeIcon.innerHTML = controlIcons.volume;
  }
}

function renderQueue() {
  if (!queueList) {
    return;
  }

  queueList.innerHTML = '';

  playlist.forEach((track, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'queue-item';
    item.dataset.index = String(index);

    if (index === currentIndex) {
      item.classList.add('active');
    }

    const artistLine = [track.artist, track.plays].filter(Boolean).join(' • ');

    item.innerHTML = `
      <span class="queue-thumb-wrap">
        <img class="queue-thumb" src="${track.cover}" alt="Capa de ${track.title}">
      </span>
      <span class="queue-copy">
        <strong>${track.title}</strong>
        <small>${artistLine}</small>
      </span>
      <span class="queue-more" aria-hidden="true">⋮</span>
    `;

    item.addEventListener('click', async () => {
      if (index === currentIndex) {
        await togglePlay();
        return;
      }

      currentIndex = index;
      loadTrack(currentIndex);

      try {
        setupWaveform();
        await audio.play();
      } catch (error) {
        console.error('Falha ao tocar audio:', error);
      }
    });

    queueList.appendChild(item);
  });
}

function renderTimedPanel(container, lines, emptyMessage) {
  if (!container) {
    return;
  }

  const plainLines = lines.map((line) => (typeof line === 'string' ? line : line.text)).filter(Boolean);
  const timedLines = lines.filter((line) => typeof line === 'object' && line !== null && typeof line.time === 'number');

  if (!plainLines.length) {
    container.innerHTML = emptyMessage;
    return;
  }

  if (timedLines.length) {
    container.innerHTML = `
      <div class="lyrics-track">
        ${timedLines
          .map((line, index) => `<p class="lyric-line is-clickable" data-lyric-index="${index}" data-lyric-time="${line.time}">${line.text}</p>`)
          .join('')}
      </div>
    `;

    Array.from(container.querySelectorAll('.lyric-line')).forEach((lineEl) => {
      lineEl.addEventListener('click', async () => {
        const targetTime = Number(lineEl.dataset.lyricTime);
        if (!Number.isFinite(targetTime)) {
          return;
        }

        audio.currentTime = targetTime;
        updateSyncedLyrics(true);
        updateSyncedTranslation(true);

        if (!audio.paused) {
          return;
        }

        try {
          setupWaveform();
          await audio.play();
        } catch (error) {
          console.error('Falha ao tocar audio:', error);
        }
      });
    });

    return;
  }

  container.innerHTML = `
    <div class="lyrics-track">
      ${plainLines
        .map((line) => `<p class="lyric-line is-static">${line}</p>`)
        .join('')}
    </div>
  `;
}

function renderLyrics() {
  const track = playlist[currentIndex];
  const lines = Array.isArray(track.lyrics) ? track.lyrics.filter(Boolean) : [];

  renderTimedPanel(
    lyricsBody,
    lines,
    `
      <p class="panel-placeholder">Letra ainda nao adicionada para <strong>${track.title}</strong>.</p>
      <p class="panel-note">Voce pode colar os versos direto no objeto da musica em <code>script.js</code>, no campo <code>lyrics</code>.</p>
    `
  );

  syncedPanelState.lyrics = -1;
  updateSyncedPanel('lyrics', true);
}

function renderTranslation() {
  const track = playlist[currentIndex];
  const lines = Array.isArray(track.translation) ? track.translation.filter(Boolean) : [];

  renderTimedPanel(
    translationBody,
    lines,
    `
      <p class="panel-placeholder">Traducao ainda nao adicionada para <strong>${track.title}</strong>.</p>
      <p class="panel-note">Voce pode usar as mesmas linhas do <code>.lrc</code> e trocar o texto, mantendo os timestamps.</p>
    `
  );

  syncedPanelState.translation = -1;
  updateSyncedPanel('translation', true);
}

function updateSyncedPanel(panelName, forceScroll = false) {
  const container = getPanelContainer(panelName);
  if (!container) {
    return;
  }

  const track = playlist[currentIndex];
  const sourceLines = panelName === 'translation' ? track.translation : track.lyrics;
  const lines = Array.isArray(sourceLines) ? sourceLines.filter((line) => typeof line === 'object' && line !== null && typeof line.time === 'number') : [];

  if (!lines.length) {
    return;
  }

  let nextActiveIndex = -1;

  for (let index = 0; index < lines.length; index += 1) {
    if (audio.currentTime >= lines[index].time) {
      nextActiveIndex = index;
    } else {
      break;
    }
  }

  const lyricEls = Array.from(container.querySelectorAll('.lyric-line'));
  const activeChanged = nextActiveIndex !== syncedPanelState[panelName];
  syncedPanelState[panelName] = nextActiveIndex;
  const panelState = panelInteractionState[panelName];

  lyricEls.forEach((lineEl, index) => {
    const distance = syncedPanelState[panelName] === -1 ? Infinity : Math.abs(index - syncedPanelState[panelName]);
    lineEl.classList.toggle('is-active', index === syncedPanelState[panelName]);
    lineEl.classList.toggle('is-near', distance === 1);
    lineEl.classList.toggle('is-far', distance >= 2);
  });

  if (syncedPanelState[panelName] === -1) {
    if (forceScroll) {
      container.scrollTo({ top: 0, behavior: 'auto' });
    }
    return;
  }

  const activeLine = lyricEls[syncedPanelState[panelName]];
  const shouldAutoScroll = forceScroll || (activeChanged && activeTab === panelName && !panelState.userScrolling);

  if (activeLine && shouldAutoScroll) {
    scrollPanelToLine(panelName, container, activeLine, forceScroll);
  }
}

function updateSyncedLyrics(forceScroll = false) {
  updateSyncedPanel('lyrics', forceScroll);
}

function updateSyncedTranslation(forceScroll = false) {
  updateSyncedPanel('translation', forceScroll);
}

function scrollPanelToLine(panelName, container, activeLine, immediate = false) {
  if (!container || !activeLine) {
    return;
  }

  const panelState = panelInteractionState[panelName];
  const track = container.querySelector('.lyrics-track');
  if (!track) {
    return;
  }

  const viewportHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;
  const activeCenter = activeLine.offsetTop + (activeLine.clientHeight / 2);
  const targetScroll = activeCenter - (viewportHeight / 2);
  const maxScroll = Math.max(0, contentHeight - viewportHeight);
  const finalScroll = Math.max(0, Math.min(maxScroll, targetScroll));

  if (panelState) {
    panelState.autoScrolling = true;
  }

  container.scrollTo({
    top: finalScroll,
    behavior: immediate ? 'auto' : 'smooth'
  });

  window.setTimeout(() => {
    if (panelState) {
      panelState.autoScrolling = false;
    }
  }, immediate ? 0 : 320);
}

function setActiveTab(tabName) {
  activeTab = activeTab === tabName ? '' : tabName;

  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === activeTab);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${activeTab}`);
  });

  if (activeTab === 'lyrics') {
    updateSyncedLyrics(true);
  }

  if (activeTab === 'translation') {
    updateSyncedTranslation(true);
  }
}

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  document.getElementById('track-title').textContent = track.title;
  document.getElementById('track-artist').textContent = track.artist;

  if (cover) {
    cover.setAttribute('aria-label', `Capa do album de ${track.title}`);
  }

  resetProgress();
  renderQueue();
  renderLyrics();
  renderTranslation();
}

function resetProgress() {
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
}

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function pad(value, size = 2) {
  return String(value).padStart(size, '0');
}

function getCalendarDiff(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();
  let milliseconds = to.getMilliseconds() - from.getMilliseconds();

  if (milliseconds < 0) {
    milliseconds += 1000;
    seconds -= 1;
  }

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const previousMonthDays = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += previousMonthDays;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds, milliseconds };
}

function updateLoveTimer() {
  const now = new Date();
  const diff = getCalendarDiff(startDate, now);

  yearsEl.textContent = diff.years;
  monthsEl.textContent = diff.months;
  daysEl.textContent = diff.days;
  hoursEl.textContent = pad(diff.hours);
  minutesEl.textContent = pad(diff.minutes);
  secondsEl.textContent = pad(diff.seconds);
  millisecondsEl.textContent = pad(diff.milliseconds, 3);
}

function paintIdleWave() {
  const total = waveBars.length;
  waveBars.forEach((bar, index) => {
    const distanceFromCenter = Math.abs(index - (total - 1) / 2);
    const centerBias = 1 - distanceFromCenter / ((total - 1) / 2);
    const shapedBias = Math.pow(centerBias, 1.7);
    bar.style.height = `${9 + shapedBias * 20}px`;
    bar.style.opacity = `${0.3 + shapedBias * 0.6}`;
  });
}

function setupWaveform() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    audioContext = new AudioContextClass();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.58;
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    waveformReady = true;
  }

  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function drawWaveform() {
  if (!waveformReady || !analyser || audio.paused) {
    paintIdleWave();
    animationFrameId = null;
    return;
  }

  analyser.getByteFrequencyData(frequencyData);
  const totalBars = waveBars.length;

  waveBars.forEach((bar, index) => {
    const mirroredIndex = index < totalBars / 2 ? index : totalBars - 1 - index;
    const sourceIndex = Math.min(mirroredIndex, frequencyData.length - 1);
    const value = frequencyData[sourceIndex] / 255;
    const distanceFromCenter = Math.abs(index - (totalBars - 1) / 2);
    const centerBias = 1 - distanceFromCenter / ((totalBars - 1) / 2);
    const shapedBias = Math.pow(centerBias, 1.85);
    const heightBoost = Math.pow(value, 0.75);
    const pulse = Math.abs(Math.sin(performance.now() * 0.012 + index * 0.45)) * 8;
    const edgeFloor = 8 + centerBias * 4;
    const reactiveHeight = heightBoost * (10 + shapedBias * 42);
    const pulseHeight = pulse * value * (0.35 + shapedBias * 0.9);
    const height = Math.max(10, edgeFloor + reactiveHeight + pulseHeight);
    bar.style.height = `${height}px`;
    bar.style.opacity = `${0.32 + Math.min(0.68, heightBoost * (0.28 + shapedBias * 0.72))}`;
  });

  animationFrameId = window.requestAnimationFrame(drawWaveform);
}

async function togglePlay() {
  if (audio.paused) {
    try {
      setupWaveform();
      await audio.play();
    } catch (error) {
      console.error('Falha ao tocar audio:', error);
    }
  } else {
    audio.pause();
  }
}

function updatePlayUI() {
  const isPlaying = !audio.paused;
  playBtn.innerHTML = isPlaying ? controlIcons.pause : controlIcons.play;
  vinyl.classList.toggle('playing', isPlaying);
  renderQueue();
}

function updateLoopUI() {
  loopBtn.classList.toggle('active', audio.loop);
  loopBtn.title = audio.loop ? 'Repetindo musica atual' : 'Repetir desativado';
  loopBtn.setAttribute('aria-pressed', audio.loop ? 'true' : 'false');
}

function updateProgress() {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  updateSyncedLyrics();
  updateSyncedTranslation();
}

function seek(event) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  audio.currentTime = ratio * audio.duration;
  updateSyncedLyrics(true);
  updateSyncedTranslation(true);
}

async function nextTrack() {
  if (shuffle) {
    currentIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentIndex = (currentIndex + 1) % playlist.length;
  }

  loadTrack(currentIndex);

  try {
    setupWaveform();
    await audio.play();
  } catch (error) {
    console.error('Falha ao tocar audio:', error);
  }
}

async function prevTrack() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);

  try {
    setupWaveform();
    await audio.play();
  } catch (error) {
    console.error('Falha ao tocar audio:', error);
  }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveTab(button.dataset.tab);
  });
});
document.addEventListener('touchstart', setupWaveform, { once: true, passive: true });
document.addEventListener('pointerdown', setupWaveform, { once: true, passive: true });

loopBtn.addEventListener('click', () => {
  audio.loop = !audio.loop;
  updateLoopUI();
});

shuffleBtn.addEventListener('click', () => {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active', shuffle);
});

volume.addEventListener('input', (event) => {
  audio.volume = Number(event.target.value);
});

progressTrack.addEventListener('click', seek);

audio.addEventListener('play', () => {
  updatePlayUI();
  if (!animationFrameId) {
    drawWaveform();
  }
});

audio.addEventListener('pause', () => {
  updatePlayUI();
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  paintIdleWave();
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});
audio.addEventListener('ended', nextTrack);

registerPanelScroll('lyrics');
registerPanelScroll('translation');
applyControlIcons();
updateLoopUI();
loadTrack(currentIndex);
setActiveTab(activeTab);
audio.volume = Number(volume.value);
paintIdleWave();
updateLoveTimer();
setInterval(updateLoveTimer, 50);
