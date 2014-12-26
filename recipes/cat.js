var Animal = require('./animal')

function Cat() {
    var cat = {}
    var walked = false

    cat.__proto__ = Animal()

    cat.pat = function pat() {
        console.log('being patted')
    }

    cat.lasagna = function lasagna() {
        console.log('Lasagna!')
        walked = true
    }

    return cat
}

module.exports = Cat