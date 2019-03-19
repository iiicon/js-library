function randomString(length) {
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
    ALPHABET += '0123456789-_';

    var str = ''
    for (let i = 0; i < length; i++) {
        var rand = Math.floor(Math.random * ALPHABET.length)
        str += ALPHABET.substring(rand, rand + 1)
    }
    return str
}