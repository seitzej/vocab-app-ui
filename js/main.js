var sentences = [
  {
    word:'abeyance',
    sentences: [
      'Once the famine was over, the food rationing dictated by the government was put in abeyance.',
      'Until after the murder trial, the inheritance will be placed in abeyance.'
    ]
  },
  {
    word: 'gouged',
    sentences: [
      'He followed the gouged earth where the vehicle had ripped its path downward.',
      'She gouged an eye out of the potato she was holding.'
    ]
  },
  {
    word: 'eclectic',
    sentences: [
      'The restaurant’s menu was eclectic and included foods from a number of ethnic groups and cultures.',
      'In Gerald’s library, you will find an eclectic mix of books because he will read just about anything.'
    ]
  },
  {
    word: 'ebullient',
    sentences: [
      'The ebullient song was so uplifting that I danced in my chair.',
      'Jack always felt ebullient after drinking his morning coffee.'
    ]
  },
  {
    word: 'grandiloquent',
    sentences: [
      'Even though Rick did not understand the grandiloquent words, he still used them to impress his wealthy friends.',
      'The city girl’s grandiloquent talk was confusing to the people in the country town.'
    ]
  }
];

function pickRandom(array) {
  var idx = Math.floor(Math.random() * array.length);
  return array[idx];
}

function randIdx(array) {
  var idx = Math.floor(Math.random() * array.length);
  return idx;
}

function pickThree(array) {
  var indexes = [];
  while (indexes.length !== 3) {
    var idx = Math.floor(Math.random() * array.length);
    if (!(idx in indexes)) {
      indexes.push(idx);
    }
  }

  return indexes.map(i => array[i]);
}


function pickRandomWordData(array) {
  const withAllSentences = pickRandom(array);
  // this seems too verbose
  const withOneSentence = {
    word: withAllSentences.word,
    sentence: pickRandom(withAllSentences.sentences)
  }

  return withOneSentence;
}

function splitSentence(sentence, word) {
  const wordIdx = sentence.indexOf(word);
  const firstHalf = sentence.slice(0,wordIdx);
  const secondHalf = sentence.slice(wordIdx + word.length);

  return [firstHalf, secondHalf];
}

// App entrypoint

const App = () => {
  return (
    <div>
      <Main />
    </div>
  )
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    const wordData = pickRandomWordData(sentences);

    this.state = {
      selected: "",
      wordData,
      choices: this.choicesCreator(wordData)
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  choicesCreator(wordData) {
    const words = sentences
      .filter(s => s.word !== wordData.word)
      .map(s => s.word);

    return [wordData.word].concat(pickThree(words));

  }

  changeHandler(e) {
    this.setState({
      selected: e.target.value
    });
  }

  submitHandler() {
    if (this.state.selected !== this.state.wordData.word) {
      alert("Incorrect!");
    } else {
      alert("Correct!");
    }
  }

  render() {

    return (
      <main>
        <Sentence
          selectedValue={this.state.selected}
          data={this.state.wordData}
        />
        <MultipleChoice
          choices={this.state.choices}
          changeHandler={this.changeHandler}
        />
        <button onClick={this.submitHandler}>Submit</button>
      </main>
    )
  }
}


// Defines the Sentence with blank on top of screen

class Sentence extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    this.sentencePieces = splitSentence(data.sentence, data.word);
  }

  render() {

    return (
      <p>
        {this.sentencePieces[0]}
        <input type="text" value={this.props.selectedValue}/>
        {this.sentencePieces[1]}
      </p>
    );
  }
}

  // Defines the multiple choice selector on bottom of screen
const MultipleChoice = props => {
  const choices = props.choices.map(choice => (
    <MultipleChoiceItem
      choice={choice}
      changeHandler={props.changeHandler}
    />
  ));
  return (
    <form className="multiple-choice">
      {choices}
    </form>
  );
};

MultipleChoice.propTypes = {
  choices: React.PropTypes.array.isRequired,
  changeHandler: React.PropTypes.func.isRequired
}


const MultipleChoiceItem = props => {
  return (
    <div className="multiple-choice__item">
      <input
        type="radio"
        name="choice"
        value={props.choice}
        onChange={props.changeHandler}
      />
      <label>{props.choice}</label><br/>
    </div>
  )
};

MultipleChoiceItem.propTypes = {
  choice: React.PropTypes.string.isRequired,
  changeHandler: React.PropTypes.func.isRequired
};





ReactDOM.render(
  <App />,
  document.getElementById('app')
);
