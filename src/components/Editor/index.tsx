import React from 'react'
import { useState } from 'react'
import './style.css'

interface IEditorProps{
  grammarState: [string, Function]
}

export default function Editor(props:IEditorProps) {
  const [grammar, setGrammar] = props.grammarState
  const [word, setWord] = useState('')

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
            className="nes-textarea"
          />
        </div>
      </div>
      <div className="editor__group2 nes-container is-rounded">
        <div className="editor__wordsInputs nes-container is-rounded">
          <label>Input 1</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="nes-input is-warning"
            placeholder="Insira uma palavra"
          />
        </div>

      </div>
    </section>
  )
}
