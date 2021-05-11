export default class DisjointSet {

  _disjoint_set:Array<Array<string>>

  constructor(states:Array<string>){
    this._disjoint_set = []

    if(states){
      for(let state of new Set(states)){
        this._disjoint_set.push([state])
      }
    }
  }

  protected _get_index(item:string){
    for( let s of this._disjoint_set){
      for( let element of s){
        if (element === item){
          return this._disjoint_set.indexOf(s)
        }
      }
    }
    return null
  }

  union(line:string, column:string){
    let i = this._get_index(line)
    let j = this._get_index(column)

    if (i !== j){
      this._disjoint_set[i] = [
        ...this._disjoint_set[i], ...this._disjoint_set[j]
      ]

      this._disjoint_set = this._disjoint_set.filter((_item, index) => index !== j)
    }
  }

  get(){
    return this._disjoint_set
  }
}
