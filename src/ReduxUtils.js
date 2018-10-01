import capitalize from './capitalize'

class ReduxUtils {
  init(store) {
    this.store = store
  }

  createActions(prefix, actions, actionsCallback) {
    //create actions from normal actions
    const types = {}
    const creators = {}
    const actionEntires = Object.entries(actions)
    for(const entry of actionEntires) {
      const [key, value] = entry
      const prefixCapitalized = capitalize(prefix)
      const keyToType = key.split(/(?=[A-Z])/).join('_').toUpperCase()
      const type = `${prefixCapitalized}/${keyToType}`
      const payload = {}
      types[keyToType] = type
      
      creators[key] = function(...args) {
        value.forEach((current, index)=>
          payload[current] = args[index]
        )
        return { type, payload }
      }
    }
    
    //create actions from callback
    const state = store.getState()
    const actionsCallbackResult = actionsCallback(state)
    const callbackEntries = Object.entries(actionsCallbackResult)
    //dry please...
    for(const entry of callbackEntries) {
      const [key, value] = entry
      const prefixCapitalized = capitalize(prefix)
      const keyToType = key.split(/(?=[A-Z])/).join('_').toUpperCase()
      const type = `${prefixCapitalized}/${keyToType}`
      const payload = {}
      types[keyToType] = type
      
      creators[key] = function(...args) {
        const paramEntries = Object.entries(value(...args))
        paramEntries.forEach(([pName, pValue], index)=>
          payload[pName] = pValue
        )
        return { type, payload }
      }
    }
    return { types, creators }
  }
}

export default new ReduxUtils();