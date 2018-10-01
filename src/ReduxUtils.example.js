import ReduxUtils from './ReduxUtils'

const selectA = state => state.c

const { types, creators } = ReduxUtils.createActions('Monitor', {
	doA: ['input'],
  doB: ['input2']
}, state => ({
	doC: (a, b, c) => ({ a, b, c, d: selectA(state) }) 
}))