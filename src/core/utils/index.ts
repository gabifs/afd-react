export function parseJSON(grammar:string){
  interface IObj{
    name:string,
    states:Array<string>,
    alphbet:Array<string>,
    productions:any,
    initialState:string,
    terminals:Array<string>
  }

  const obj:IObj = {
    name:'',
    states:[],
    alphbet:[],
    productions:{},
    initialState:'',
    terminals:[]
  }
  try{
    const lines = grammar.split("\n")
    let [afd_name, definition] = lines[0].split("=({")
    obj.name = afd_name.trim()

    let [states, rest1] = definition.split('},{')
    obj.states = states.split(",").map(item => item.trim())

    let [alphbet, rest2] = rest1.split('},')
    obj.alphbet = alphbet.split(',').map(item => item.trim())

    let [prog_name, initial, rest3] = rest2.split(',')
    obj.initialState = initial.trim()

    let terminals = rest3.slice(1, rest3.length-2).split(',')
    obj.terminals = terminals.map(item => item.trim())

    if(prog_name === lines[1]){
      for(let line of lines.slice(2)){
        if(!line.length){
          continue
        }
        line = line.trim()
        let [state_symbol, production] = line.slice(1).split(")=").map(item => item.trim())
        let [state, symbol] = state_symbol.split(',').map(item => item.trim())

        if (obj.productions[state]){
          obj.productions[state][symbol] = production
        }else{
          obj.productions[state] = {[symbol]: production}
        }
      }
    }else{
      throw new Error("Nome das produções errado")
    }

    return JSON.stringify(obj)
  }catch(err){
    throw new Error(`Formato de entrada errado`)
  }
}
