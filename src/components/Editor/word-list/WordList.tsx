import HistoryMessage from '../history-message'
import InputMessage from '../input-message'

const WordList:React.FC<{
  wordList: Array<{
    word: string,
    result: string,
    history: Array<[string, string, string]>
  }>
  closeInput: (index: number) => void
  executeFor: (index: number, value: string) => void
  addInput: () => void
}> = ({
  addInput,
  wordList,
  closeInput,
  executeFor
}) => {
  return (
    <div className="editor__group2 nes-container is-rounded">
    <input
      type="button"
      value="Add input"
      className={`nes-btn is-${window.__AFD__ ? "warning" : "disabled"}`}
      onClick={() => window.__AFD__? addInput() : false}
    />
    {
      wordList.map((item, index)=>(
        <div key={index} className="editor__wordsInputs nes-container is-rounded">
          <div className="editor__inputHeader">
            <InputMessage result={item.result} />
            <button
              className="nes-btn is-error"
              onClick={() => closeInput(index)}
            >X</button>
          </div>
          <input
            type="text"
            value={item.word}
            onChange={(e) => executeFor(index, e.target.value)}
            className={`nes-input is-${item.result}`}
            placeholder={window.__AFD__?"Palavra vazia":"Crie um Automato"}
          />
          <details style={{marginTop:'1rem'}}>
            <summary>Histórico</summary>
            <div
              className="nes-container is-rounded is-dark"
              style={{textAlign:"center"}}>
              {
                item.history.map(([currenteState, simbol, newState], index) => (
                  <p key={index}>
                    <span className="nes-text is-warning">{`${index+1}) `}</span>
                    <strong className="nes-text is-success">{currenteState}</strong>
                    {newState ? (
                      <>
                        |<span className="nes-text is-primary">{`(${simbol})`}</span>
                        |<strong className="nes-text is-success">{newState}</strong>
                      </>
                    ) : (
                      <>
                        |<span className="nes-text is-error">{`(${simbol})`}</span>
                      </>
                    )
                    }
                  </p>
                ))
              }
              {
                item.history.length ? <HistoryMessage lastRound={item.history[item.history.length -1]}/> : ''
              }
              </div>
          </details>
        </div>
        )
      )
    }

  </div>
  )
}

export default WordList
