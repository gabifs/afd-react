import React from "react";

const HistoryMessage:React.FC<{
  lastRound: [string, string, string|undefined]
}> = (props) => {
  const symbol = props.lastRound[1]
  const lastState = props.lastRound[2]

  if(window.__AFD__.alphbet.includes(symbol)){
    if(lastState){
      if(window.__AFD__.terminals.includes(lastState)){
        return (<p className="nes-text is-success">Palavra aceita</p>)
      }else{
        return (<p className="nes-text is-error">Estado final não é terminal</p>)
      }
    }else{
      return (<p className="nes-text is-error">Produção indefinida</p>)
    }
  }else{
    return (<p className="nes-text is-error">Simbolo não pertence ao alfabeto</p>)
  }
}

export default HistoryMessage
