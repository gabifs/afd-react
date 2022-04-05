import React from 'react'

const GrammarEditor: React.FC<{
  grammar: string
  handleNewFile: React.ChangeEventHandler<HTMLInputElement>
  handleGrammarChange: React.ChangeEventHandler<HTMLTextAreaElement>
  createAfd: (text: string) => void
}> = ({
  grammar,
  handleNewFile,
  handleGrammarChange,
  createAfd
}) => {
  return (
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
  )
}

export default GrammarEditor
