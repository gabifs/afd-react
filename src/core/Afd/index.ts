export default class Afd {

  grammar: string
  grammarType: string
  name: string
  states: Array<string>
  alphbet: Array<string>
  productions: any
  initialState: string
  currentState: string
  terminals: Array<string>
  history: Array<[string, string, string]>

  constructor(grammar:string, grammarType:string = "json") {
    this.grammar = grammar
    this.grammarType = grammarType

    const {
      name,
      states,
      alphbet,
      productions,
      initialState,
      terminals
    } = JSON.parse(grammar)
    // !VALIDAR FORMATO DE ENTRADA
    // !AFD MINIMIZADO

    this.name = name
    this.states = states
    this.alphbet = ['',...alphbet]

    this.productions = this._validatesProductions(productions)
    this.initialState = this._validatesInitialState(initialState)
    this.terminals = this._validatesTerminals(terminals)
    this.currentState = initialState
    this.history = []

    // this._minimization()
  }

  run(word: string|Array<string> ):boolean{
    // Verifica palavra vazia
    if(!word){
      this.history=[[this.initialState, '', this.initialState]]
      return this.terminals.includes(this.initialState)
    }

    const [head, ...tail] = word;

    const newState = this.productions[this.currentState]? this.productions[this.currentState][head] : undefined

    this.history.push([this.currentState, head, newState])

    if(newState){
      /* novo estado existe */

      if(tail.length !== 0){
        /* continua a leitura da palavra */

        this._moveTo( newState )
        return this.run(tail)
      }else {
        /* palavra acabou, finaliza execução */

        if(this.terminals.includes(newState)){
          /* palavra pertence ao alfabeto */

          this._moveTo( this.initialState )
          return true
        } else {
          /* palavra não pertence ao alfabeto */

          this._moveTo( this.initialState )
          return false
        }
      }
    }else {
      /* novo estado não existe:
         - simbolo lido não pertence ao alfabeto
         - simbolo lido não está ligado ao estado atual
         - estado atual não pertence ao conjunto de estados */
      this._moveTo( this.initialState )
      return false
    }
  }

  protected _moveTo(state:string){
    /* move execução para um novo estado */

    this.currentState = state
    return this.currentState
  }

  protected _validatesProductions(productions:object):object {

    if(Object.keys(productions).find(prodState => !this.states.includes(prodState))) {
      throw new Error("Estado da produção indefinido")
    }

    const prodStates:Set<string> = new Set(Object
                                            .values(productions)
                                            .reduce((combined, prog) => [...combined, ...Object.values(prog)] ,[]))

    if([...prodStates].find(prodState => !this.states.includes(prodState))){
      throw new Error("Estado da produção indefinido")
    }

    const prodSymbols:Set<string> = new Set(Object
                                            .values(productions)
                                            .reduce((combined, prog) => [...combined, ...Object.keys(prog)] ,[]))

    if([...prodSymbols].find(prodSymbol => !this.alphbet.includes(prodSymbol))){
      throw new Error("Simbolo da produção indefinido");
    }

    return productions
  }

  protected _validatesInitialState(initialState:string){
    if(this.states.includes(initialState)){
      return initialState
    }else{
      throw new Error("Estado inicial não pertence ao conjunto de estados!")
    }
  }

  protected _validatesTerminals(terminals:Array<string>){
    return terminals.map(state => {
      if(this.states.includes(state)){
        return state
      }else {
        throw new Error("Estado indefinido entre os estados terminais")
      }
    })
  }

}
