import DisjointSet from '../classes/DisjointSet'

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

    // !AFD MINIMIZADO

    this.name = name
    this.states = states
    this.alphbet = ['',...alphbet]

    this.productions = this._validatesProductions(productions)
    this.initialState = this._validatesInitialState(initialState)
    this.terminals = this._validatesTerminals(terminals)
    this.history = []

    this._minimization()
    this.currentState = initialState
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

  protected _remove_unreachable_states(){
    const graph = new Map()
    for(const key of Object.keys(this.productions)){
        graph.set(key, [])
        for(const value of Object.values(this.productions[key])){
          graph.get(key).push(value)
        }
    }
    let stack = [this.initialState]

    const reachable_states = new Set()
    while(stack.length) {
      let state = stack.pop()

      if (!reachable_states.has(state) && graph.get(state)){
        stack = [...stack, ...graph.get(state)]
      }

      reachable_states.add(state)
    }
    this.states = this.states.filter(state => reachable_states.has(state))
    this.terminals = this.terminals.filter(state => reachable_states.has(state))
    this.productions = Object.fromEntries(
      Object.entries(this.productions)
        .filter(entrie => reachable_states.has(entrie[0]))
    )

  }

  print(){
    console.log(
      {
        name: this.name,
        states: this.states,
        alphbet: this.alphbet,
        productions: this.productions,
        initialState: this.initialState,
        terminals: this.terminals,
      }
    )
  }

  protected _minimization(){
    this.alphbet = this.alphbet.slice(1)


    this._remove_unreachable_states()

    this._addReject()

    const table = new Map()

    const sortedStates = [...this.states].sort()

    sortedStates.forEach((stateLine, index)=>{
      const sortedTail = sortedStates.slice(index+1)
      sortedTail.forEach(stateColumn => {
        table.set([stateLine, stateColumn].toString(), (
          this.terminals.includes(stateLine) !==
          this.terminals.includes(stateColumn)
        ))
      })
    })

    console.log(table)

    let flag = true

    // método de preenchimento da tabela
    while(flag){
      flag = false

      for(let [index, stateLine] of Object.entries(sortedStates)){

        for(let stateColumn of sortedStates.slice(parseInt(index)+1)){
          if (table.get([stateLine,stateColumn].toString())){
            continue
          }

          // checa se os estados são distinguiveis
          for(let symbol of this.alphbet){
            const t1 = this.productions[stateLine][symbol]
            const t2 = this.productions[stateColumn][symbol]

            if (t1 !== t2){
              let key = [t1,t2].sort()
              let marked = table.get(key.toString())
              if (marked === undefined){
                console.log([stateLine,stateColumn], symbol, [t1,t2])
              }
              flag = flag || marked
              table.set([stateLine, stateColumn].toString(), marked)

              if(marked) break
            }
          }
        }
      }

    }

    console.log("2:",table)


    const dset = new DisjointSet(this.states)

    for (let [line_column, mark] of table.entries()){
      let [line, column] = line_column.split(',')
      if(!mark){
        dset.union(line ,column)
      }
    }

    this.states = dset.get().map(states => (
      states.reduce((name, state)=> name ? name+"^"+state : state, '')
    ))

    this.initialState = this.states.filter(state => state.split("^").includes(this.initialState))[0]

    this.terminals = this.states.filter(state => {
      let finded = false
      for(let old_terminal of this.terminals){
        finded = finded || state.split("^").includes(old_terminal)
      }
      return finded
    })

    this._updateProductions()

    this.alphbet = ["", ...this.alphbet]
    this.print()
  }

  protected _updateProductions(){
    let newProductions:any = {}

    for(let [old_state, production] of Object.entries(this.productions)){
      if (!newProductions[this._findUnion(old_state)]){
        newProductions[this._findUnion(old_state)] = production
      }else{
        newProductions[this._findUnion(old_state)] = {
          ...newProductions[this._findUnion(old_state)],
          ...this.productions[this._findUnion(old_state)]
        }
      }
    }

    for(let state of this.states){
      if(newProductions[state])
      for(let s of Object.keys(newProductions[state])){
        newProductions[state][s] = this._findUnion(newProductions[state][s])
      }
    }

    this.productions = newProductions
  }

  protected _findUnion(old_state:string){
    return this.states.filter(state => state.split("^").includes(old_state))[0]
  }

  protected _addReject(){
    this.states = [...this.states, "REJECT"]

    for(let start of this.states){
      if(!this.productions[start]){
        this.productions[start] = {}
      }

      for( let symbol of this.alphbet){
        if(!this.productions[start][symbol]){
          this.productions[start] = {
            ...this.productions[start],
            [symbol]: "REJECT"
          }
        }
      }

    }
  }
}
