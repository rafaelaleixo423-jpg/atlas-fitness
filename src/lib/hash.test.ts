// Teste de regressão: âncoras malformadas não podem lançar erro (antes, `/#%` deixava a página em branco).
// Executar com `npm test` (usa o executor nativo do Node, sem dependências extras).
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { hashTargetId } from './hash.ts'

test('âncoras válidas retornam o id da seção', () => {
  assert.equal(hashTargetId('#planos'), 'planos')
  assert.equal(hashTargetId('#aula-experimental'), 'aula-experimental')
  assert.equal(hashTargetId('planos'), 'planos')
})

test('âncoras codificadas são decodificadas', () => {
  assert.equal(hashTargetId('#d%C3%BAvidas'), 'dúvidas')
})

test('âncora vazia retorna null', () => {
  assert.equal(hashTargetId(''), null)
  assert.equal(hashTargetId('#'), null)
})

test('âncoras malformadas retornam null em vez de lançar URIError', () => {
  for (const hash of ['#%', '#%FF', '#%E0%A4%A', '#abc%', '#%%']) {
    assert.doesNotThrow(() => hashTargetId(hash), `não deve lançar para ${hash}`)
    assert.equal(hashTargetId(hash), null, `deve ignorar ${hash}`)
  }
})
