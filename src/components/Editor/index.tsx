import React from 'react'
import './style.css'

interface IEditorProps{
  grammarState: [string, Function]
}

export default function Editor(props:IEditorProps) {
  const [grammar, setGrammar] = props.grammarState

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
    <form>
      <nav className="editor__controlsBar">
        <div className="editor__editorControl">
          <label>
            Selecione um arquivo
          </label>
          <input
            type="file"
            className="editor__fileInput"
            onChange={handleNewFile}
          />
        </div>
        <div className="editor__editorControl">
          <label>Criar Automato</label>
          <input type="button" value="Executar"/>
        </div>
      </nav>
      <div className="editor__textEditor">
        <textarea
          name="editor"
          cols={90}
          rows={30}
          value={grammar}
          onChange={handleGrammarChange}
        />
      </div>
    </form>
    </section>
  )
}
