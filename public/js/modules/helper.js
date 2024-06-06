const randStr = function(length){
    let randStr = ''
    const possibleLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for(let i = 0; i < length - 1; i++){
        const randInd = Math.floor(Math.random()*possibleLetters.length)
        randStr += possibleLetters[randInd]
    }
    return randStr
}

module.exports = {randStr}