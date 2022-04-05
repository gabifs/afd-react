import './style.css'

import React from 'react'
import { useState } from 'react'
import swal from 'sweetalert'

import Afd from '../../core/Afd'
import { parseJSON } from '../../core/utils'
import GrammarEditor from './grammar-editor'
import WordList from './word-list'

declare global {
  var __AFD__: Afd;
}

export default function Editor() {
  const [grammar, setGrammar] = useState(``)
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
      try {
        const reader = new FileReader();

        reader.onloadend= () => {
          setGrammar(reader.result as string)
        }

        reader.readAsText(file);
      } catch (err:any) {
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
    }catch(err:any){
      swal("Erro na criação", err.message, "error")
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

  return (
    <section id="editor">
      <GrammarEditor
        grammar={grammar}
        createAfd={createAfd}
        handleNewFile={handleNewFile}
        handleGrammarChange={handleGrammarChange}
      />
      <WordList
        wordList={wordList}
        addInput={addInput}
        closeInput={closeInput}
        executeFor={executeFor}
      />
    </section>
  )
}
