# Sky Player

Projeto front-end pronto para abrir no VS Code.

## Estrutura
- `index.html`
- `style.css`
- `script.js`
- `assets/cover.png`
- `assets/sample-track.wav`

## Como usar
1. Abra a pasta no VS Code.
2. Rode com Live Server ou abra o `index.html` no navegador.
3. Clique em play.

## Como trocar a música
Substitua o arquivo:
- `assets/sample-track.wav`

Depois ajuste o array `playlist` no `script.js`:

```js
const playlist = [
  {
    title: 'Nome da música',
    artist: 'Nome do artista',
    src: 'assets/seu-arquivo.wav',
    cover: 'assets/cover.png'
  }
];
```

## Observação
O player é real e funcional no navegador:
- play/pause
- barra de progresso clicável
- volume
- loop
- shuffle
