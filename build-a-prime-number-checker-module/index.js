function isPrime(num){
    if(num < 2){
        return false
    }

    if(num == 2){
        return true
    }

    const squareRootOfNum = Math.floor(Math.sqrt(num));

    for(let i = 2 ; i <= squareRootOfNum ;i++){
        if(num % i == 0){
            return false
        }
    }
    return true
}

module.exports = {
    isPrime
}