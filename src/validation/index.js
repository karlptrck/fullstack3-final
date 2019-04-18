

export default {
    isValidParams : (obj, validParams) => {
        if (Object.keys(obj).length === 0 )
        return false

        for (let key in obj) {
            if(!validParams.includes(key))
            return false
          }
        return true
    },
    hasValidRequiredParams : (obj, requiredParams) => {
      for (var i in requiredParams) {
        if(!obj.hasOwnProperty(requiredParams[i]))
        return false
      }
      return true
    }
}