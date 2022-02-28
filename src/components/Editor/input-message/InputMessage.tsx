import React from "react"

const InputMessage: React.FC<{ result: string }> = ({result}) => {
  switch(result){
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

export default InputMessage
