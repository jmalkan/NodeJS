function Animal() {

    var walked = false

    function walk() {
        console.log('walking...')
        walked = true
    }

    function hasBeenWalked() {
        return walked
    }

    return {
        walk: walk
        , hasBeenWalked: hasBeenWalked
    }
}

module.exports = Animal