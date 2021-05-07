import React from 'react'
import { useState } from 'react'
import './style.css'

import Afd from '../../core/Afd'

declare global {
  var __AFD__: Afd;
}

interface IEditorProps{
  grammarState: [string, Function]
}

interface IInputMessage{
  result: string
}

export default function Editor(props:IEditorProps) {
  const [grammar, setGrammar] = props.grammarState
  const [wordList, setWordList] = useState([
    {
      word: '',
      result: 'disabled',
      history: []
    }
  ])

  function handleNewFile(event:React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend= () => {
        setGrammar(reader.result as string)
      }

      reader.readAsText(file);
    }
  }

  function handleGrammarChange (event:React.ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault()

    setGrammar(event.target.value)
  }

  function executeFor(key:number, newWord:string):void{
    setWordList(wordList.map((item, index)=>{
      if(window.__AFD__){
        if(index === key){
          if(newWord){
            window.__AFD__.history = []
            if(window.__AFD__.run(newWord)){
              return {
                word: newWord,
                result: 'success',
                history: window.__AFD__.history
              }
            }else{
              return {
                word: newWord,
                result: 'error',
                history: window.__AFD__.history
              }
            }
          }else{
            return {
              word: newWord,
              result: 'warning',
              history: []
            }
          }
        }else{
          return item
        }
      }else{
        return {
          word: '',
          result: 'disabled',
          history: []
        }
      }
    }))
  }

  function createAfd(grammar:string){
    window.__AFD__ = new Afd(grammar)
    setWordList(wordList.map(() => ({
      word: '',
      result: 'warning',
      history: []
    })))
  }

  function addInput(){
    setWordList([
      ...wordList,
      {
        word: '',
        result: 'warning',
        history: []
      }
    ])
  }

  function closeInput(key:number){
    setWordList(wordList.filter((word, index) => key !== index))
  }

  const InputMessage = (props:IInputMessage) => {
    switch(props.result){
      case("warning"):
        return (<label className="nes-text is-warning">Nenhuma palavra</label>)
      case("error"):
        return (<label className="nes-text is-error">Palavra rejeitada</label>)
      case("success"):
        return (<label className="nes-text is-success">Palavra aceita</label>)
      case("disabled"):
        return (<label className="nes-text is-disabled">Crie um AFD</label>)
    }
  }

  return (
    <section id="editor">
      <div className="editor__group1 nes-container is-rounded">
        <nav className="editor__controlsBar">
          <div className="editor__editorControl">
            <label className="nes-btn is-primary">
              <span>
                Selecione um arquivo
              </span>
              <input
                type="file"
                className="editor__fileInput is-primary"
                onChange={handleNewFile}
              />
            </label>
          </div>
          <div className="editor__editorControl">
            <input
              type="button"
              value="Executar"
              className="nes-btn is-success"
              onClick={() => createAfd(grammar)}
            />
          </div>
        </nav>
        <div className="editor__textEditor nes-field">
          <textarea
            name="editor"
            cols={90}
            rows={30}
            value={grammar}
            onChange={handleGrammarChange}
            spellCheck="false"
            className="nes-textarea"
            wrap="soft"
          />
        </div>
      </div>
      <div className="editor__group2 nes-container is-rounded">
        <input
          type="button"
          value="Add input"
          className={`nes-btn is-${window.__AFD__ ? "warning" : "disabled"}`}
          onClick={() => addInput()}
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
                placeholder={window.__AFD__?"Insira uma palavra":"Crie um Automato"}
              />
              <details>
                <summary>Histórico</summary>
                <div className="nes-container is-rounded is-dark">
                  {
                    item.history.map(([currenteState, simbol, newState]) => (
                      <p>
                        <strong className="nes-text is-success">{currenteState} </strong>
                        {newState ? (
                          <>
                            <span className="nes-text is-primary">{` (${simbol}) `}</span>
                            <strong className="nes-text is-success"> {newState}</strong>
                          </>
                        ) : (
                          <>
                            <span className="nes-text is-error">{` (${simbol}) `}</span>
                          </>
                        )
                        }
                      </p>
                    ))
                  }
                </div>
              </details>
            </div>
            )
          )
        }

      </div>
    </section>
  )
}
