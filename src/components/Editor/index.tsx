import './style.css'

import React from 'react'
import { useState } from 'react'
import swal from 'sweetalert'

import Afd from '../../core/Afd'
import { parseJSON, parseWordTupleList } from '../../core/utils'

declare global {
  var __AFD__: Afd;
}

interface IEditorProps{
  grammarState: [string, Function]
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
  const [listFilter, setListFilter] = useState([['','']])

  function handleNewFile(event:React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const file = event.target.files[0];

    if (file) {
      try {
        const reader = new FileReader();

        reader.onloadend= () => {
          setGrammar(reader.result as string)
        }

        reader.readAsText(file);
      } catch (err) {
        swal('Erro', err.message, "error")
      }

    }else {
      swal("Nenhum arquivo")
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
    try{
      window.__AFD__ = new Afd(parseJSON(grammar))
      setWordList(wordList.map(() => ({
        word: '',
        result: window.__AFD__.run('') ? 'success' : 'error',
        history: window.__AFD__.history
      })))
    }catch(err){
      swal("Erro na cria????o", err.message, "error")
    }
  }

  function addInput(){
    setWordList([
      ...wordList,
      {
        word: '',
        result: window.__AFD__.run('') ? 'success' : 'error',
        history: window.__AFD__.history
      }
    ])
  }

  function closeInput(key:number){
    setWordList(wordList.filter((_word, index) => key !== index))
  }

  interface IInputMessageProps{
    result: string
  }

  const InputMessage = (props:IInputMessageProps) => {
    switch(props.result){
      case("error"):
        return (
          <span  className="nes-badge">
            <span className="is-error">REJEITA</span>
          </span>
        )
      case("success"):
        return (
          <span className="nes-badge">
            <span className="is-success">ACEITA</span>
          </span>
        )
      case("disabled"):
        return (
          <span className="nes-badge">
            <span className="is-dark">_</span>
          </span>
        )
    }
  }

  interface IHistoryMessageProps {
    lastRound: [string, string, string|undefined]
  }

  const HistoryMessage = (props:IHistoryMessageProps) => {
    const symbol = props.lastRound[1]
    const lastState = props.lastRound[2]

    if(window.__AFD__.alphbet.includes(symbol)){
      if(lastState){
        if(window.__AFD__.terminals.includes(lastState)){
          return (<p className="nes-text is-success">Palavra aceita</p>)
        }else{
          return (<p className="nes-text is-error">Estado final n??o ?? terminal</p>)
        }
      }else{
        return (<p className="nes-text is-error">Produ????o indefinida</p>)
      }
    }else{
      return (<p className="nes-text is-error">Simbolo n??o pertence ao alfabeto</p>)
    }

  }

  function handleWordTupleList(event:React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const file = event.target.files[0];

    if (file) {
      try {
        const reader = new FileReader();

        reader.onloadend= () => {
          setListFilter(parseWordTupleList(reader.result as string) || [['','']])
        }

        reader.readAsText(file);
      } catch (err) {
        swal('Erro', err.message, "error")
      }

    }else {
      swal("Nenhum arquivo")
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
              value="Criar automato"
              className="nes-btn is-success"
              onClick={() => createAfd(grammar)}
            />
          </div>
        </nav>
        <div className="editor__textEditor nes-field">
          <textarea
            name="editor"
            cols={90}
            rows={20}
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
                <summary>Hist??rico</summary>
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
      <div className="editor__group3 nes-container is-rounded">
        <div className="editor__editorControl">
          <label className={`nes-btn is-${window.__AFD__ ? "primary" : "disabled"}`}>
            <span>
              Lista de duplas de palavras
            </span>
            <input
              type="file"
              className={`editor__fileInput`}
              onChange={ window.__AFD__ ? handleWordTupleList : ()=>false }
            />
          </label>
        </div>
        <div className="editor__wordTupleView">
          <div className="editor__listView lists nes-container is-rounded is-dark">
            <h3>Input</h3>
            <ul className="is-circle">
              {
                listFilter.map((wordTuple, index) => {
                  if (window.__AFD__){
                    if(window.__AFD__.run(wordTuple[0]) && window.__AFD__.run(wordTuple[1])) {
                      return (
                        <li className="nes-text is-primary"
                          key={index}
                        >{`(${wordTuple[0]}, ${wordTuple[1]})`}</li>
                      )
                    }else{
                      return (
                        <li className="nes-text is-error"
                          key={index}
                        >{`(${wordTuple[0]}, ${wordTuple[1]})`}</li>
                      )
                    }
                  }else{
                    return false
                  }


                })
              }
            </ul>
          </div>

          <div className="editor__listView lists nes-container is-rounded is-dark">
          <h3>Output</h3>
            <ul className="is-circle">
              {
                listFilter
                  .filter(wordTuple => (
                    window.__AFD__ ?
                    window.__AFD__.run(wordTuple[0]) &&
                    window.__AFD__.run(wordTuple[1]) :
                    false
                  ))
                  .map((wordTuple, index) => {
                    return (
                      <li className="nes-text is-success"
                        key={index}
                      >{`(${wordTuple[0]}, ${wordTuple[1]})`}</li>
                    )
                  })
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
