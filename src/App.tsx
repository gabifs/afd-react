import React from 'react';
import {useState} from 'react';
import Editor from './components/Editor'
import './App.css';

function App() {
  const grammarState = useState(``)

  return (
    <main className="App">
      <Editor
        grammarState={grammarState}
      />
    </main>
  );
}

export default App;
