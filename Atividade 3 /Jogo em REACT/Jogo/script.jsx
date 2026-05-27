const { useState, useEffect } = React;

// Palavras do jogo
const SECRET_WORD = 'REACT';
const VALID_WORDS = [
  'REACT', 'WORLD', 'PLANE', 'HOUSE', 'GAMES',
  'CLOUD', 'LIGHT', 'MUSIC', 'HAPPY', 'SMILE',
  'WATER', 'EARTH', 'PLANT', 'HEART', 'BRAIN',
  'STORM', 'NIGHT', 'DREAM', 'SPACE', 'STONE'
];

// Função que verifica cada letra da tentativa
function checkGuess(guess, secretWord) {
  const result = Array(5).fill('absent');
  const secretLetters = secretWord.split('');
  const guessLetters = guess.split('');
  
  // Primeiro marca letras corretas (posição exata)
  const secretCopy = [...secretLetters];
  guessLetters.forEach((letter, i) => {
    if (letter === secretLetters[i]) {
      result[i] = 'correct';
      secretCopy[i] = null;
    }
  });
  
  // Depois marca letras presentes (posição errada)
  guessLetters.forEach((letter, i) => {
    if (result[i] === 'correct') return;
    
    const indexInSecret = secretCopy.indexOf(letter);
    if (indexInSecret !== -1) {
      result[i] = 'present';
      secretCopy[indexInSecret] = null;
    }
  });
  
  return result;
}

// Verifica se a palavra é válida
function isValidWord(word) {
  return VALID_WORDS.includes(word.toUpperCase());
}

// Componente Tile (cada quadrado individual)
function Tile({ letter, state }) {
  const stateClass = state ? `tile-${state}` : '';
  
  return (
    <div className={`tile ${stateClass}`}>
      {letter || ''}
    </div>
  );
}

// Componente Row (uma linha de 5 tiles)
function Row({ word, evaluation }) {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    tiles.push(
      <Tile 
        key={i}
        letter={word ? word[i] || '' : ''} 
        state={evaluation ? evaluation[i] : ''} 
      />
    );
  }
  
  return <div className="row">{tiles}</div>;
}

// Componente Board (grade 6x5)
function Board({ guesses, currentGuess, evaluations }) {
  const rows = [];
  
  for (let i = 0; i < 6; i++) {
    let word = '';
    let evaluation = null;
    
    if (i < guesses.length) {
      word = guesses[i];
      evaluation = evaluations[i];
    } else if (i === guesses.length) {
      word = currentGuess;
    }
    
    rows.push(
      <Row key={i} word={word} evaluation={evaluation} />
    );
  }
  
  return <div className="board">{rows}</div>;
}

// Componente Keyboard (teclado virtual)
function Keyboard({ onKeyPress }) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];
  
  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map(key => (
            <button
              key={key}
              className={`key ${key === 'ENTER' || key === '⌫' ? 'key-wide' : ''}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

// Componente principal App
function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [evaluations, setEvaluations] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [message, setMessage] = useState('');
  
  // Função chamada quando uma tecla é pressionada
  function handleKeyPress(key) {
    if (gameStatus !== 'playing') return;
    
    if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
      setMessage('');
    } else if (key === 'ENTER') {
      if (currentGuess.length === 5) {
        submitGuess();
      } else {
        setMessage('A palavra deve ter 5 letras!');
      }
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
      setMessage('');
    }
  }
  
  // Função que processa a tentativa
  function submitGuess() {
    const upperGuess = currentGuess.toUpperCase();
    
    if (!isValidWord(upperGuess)) {
      setMessage('Palavra não reconhecida!');
      return;
    }
    
    const evaluation = checkGuess(upperGuess, SECRET_WORD);
    const newGuesses = [...guesses, upperGuess];
    const newEvaluations = [...evaluations, evaluation];
    
    setGuesses(newGuesses);
    setEvaluations(newEvaluations);
    setCurrentGuess('');
    setMessage('');
    
    if (upperGuess === SECRET_WORD) {
      setGameStatus('won');
      setMessage('🎉 Parabéns! Você acertou!');
    } else if (newGuesses.length === 6) {
      setGameStatus('lost');
      setMessage(`😔 Fim de jogo! A palavra era: ${SECRET_WORD}`);
    }
  }
  
  // Função para reiniciar o jogo
  function resetGame() {
    setGuesses([]);
    setCurrentGuess('');
    setEvaluations([]);
    setGameStatus('playing');
    setMessage('');
  }
  
  // Suporte a teclado físico
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('⌫');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, guesses, evaluations]);
  
  return (
    <div className="app">
      <h1>GuessWord</h1>
      <p className="subtitle">Adivinhe a palavra secreta em 6 tentativas</p>
      
      {message && (
        <div className={`message ${gameStatus !== 'playing' ? 'message-final' : ''}`}>
          {message}
        </div>
      )}
      
      <Board 
        guesses={guesses}
        currentGuess={currentGuess}
        evaluations={evaluations}
      />
      
      <Keyboard onKeyPress={handleKeyPress} />
      
      {gameStatus !== 'playing' && (
        <button className="reset-btn" onClick={resetGame}>
          Jogar Novamente
        </button>
      )}
      
      <div className="instructions">
        <p>🟩 Verde = Letra correta na posição certa</p>
        <p>🟨 Amarelo = Letra existe mas em posição errada</p>
        <p>⬛ Cinza = Letra não existe na palavra</p>
      </div>
    </div>
  );
}

// Renderiza o componente App no elemento com id "root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);