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
function pickThree(array) {
  return [pickRandom(array), pickRandom(array), pickRandom(array)];
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
    this.state = {
      selected: ""
    }
    this.choices = pickThree(sentences).map(d => d.word);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    console.log("Change", e.target.value);
    this.setState({
      selected: e.target.value
    });
  }

  render() {

    return (
      <main>
        <Sentence
          selectedValue={this.state.selected}
          data={sentences[0]}
        />
        <MultipleChoice
          choices={this.choices}
          changeHandler={this.changeHandler}
        />
      </main>
    )
  }
}

function splitSentence(sentence, word) {
  const wordIdx = sentence.indexOf(word);
  const firstHalf = sentence.slice(0,wordIdx);
  const secondHalf = sentence.slice(wordIdx + word.length);

  return [firstHalf, secondHalf];
}

// Defines the Sentence with blank on top of screen

class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.sentence = pickRandom(props.data.sentences);
    this.sentencePieces = splitSentence(this.sentence, props.data.word);
    console.debug("Sentence:", this.sentence);
    console.debug("Sentence Pieces:", this.sentencePieces);
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


const MultipleChoiceItem = ({ choice, changeHandler }) => {
  return (
    <div className="multiple-choice__item">
      <input
        type="radio"
        name="choice"
        value={choice}
        onChange={changeHandler}
      />
      {choice}<br/>
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
