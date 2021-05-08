import Afd from './index'
import grammars from './grammar-mock.json'

describe('Afd creates deterministic finite automaton', () => {
  it('should generate a new afd from a json grammar', ()=>{
      expect(new Afd(JSON.stringify(grammars.accept)))
        .toBeInstanceOf(Afd)
  })
  describe('Afd should reject build a new afd:', ()=>{
    it('if a symbol does not bellong to the alphbet', ()=>{
      expect(() => new Afd(JSON.stringify(grammars['reject-alphbet'])))
        .toThrowError(/Simbolo da produção indefinido/)
    })
    it('if a state does not bellong to the state set', ()=>{
      expect(() => new Afd(JSON.stringify(grammars['reject-state'])))
        .toThrowError(/Estado da produção indefinido/)
    })
  })

  it('should accept all words made of character a', ()=>{
    const automata = new Afd(JSON.stringify(grammars.accept))
    expect(automata.run('a')).toBeTruthy()
    expect(automata.run('aa')).toBeTruthy()
    expect(automata.run('aaaaaaaa')).toBeTruthy()

  })
})
