function cypher(password, message, direction) {

    /* Split the input into the component password and message */
    /*             var password = input.split(" ")[0];
                var message = input.split(" ")[1];
                var direction = input.split(" ")[2]; */
    console.log(direction);

    /* make the cypher table */
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var index = alphabet.join("");
    var cypherTable = [alphabet.join("")];
    var increment = alphabet;
    for (i = 0; i < 26; i++) {
        increment.push(alphabet[0]);
        increment.shift();
        next = increment.join("");
        cypherTable.push(next);
    }

    /* Form the "passString" by repeating the password until it is longer than the message, then trim */
    passString = password;
    while (passString.length < message.length) {
        passString = passString + password;
    }
    passString = passString.slice(0, message.length);
    if (direction === 'encode') {

        /* encode the message! :D */
        var encoded = '';
        for (i = 0; i < message.length; i++) {
            encoded = encoded + cypherTable[index.search(message[i])][index.search(passString[i])];
        }
        document.getElementById("answer").innerHTML = encoded;

    } else if (direction === 'decode') {
        var decoded = '';
        for (i = 0; i < message.length; i++) {
            column = index.search(passString[i]);
            console.log(column);
            for (j = 0; j < 25; j++) {


                if (cypherTable[j][column] === message[i]) {
                    decoded = decoded + index.charAt(j);
                    console.log(decoded);
                }
            }
        }
        document.getElementById("answer").innerHTML = decoded;
    }

}


function minsum(product) {
    var t0 = performance.now();
    sum = parseInt(product);
    for (i = 1; i < sum; i++) {
        remainder = product % i;
        if (remainder === 0) {
            sum = product / i + i;
            console.log(i);
            console.log(sum);
        }
    }
    var t1 = performance.now;
    document.getElementById("minsum").innerHTML = sum;
}
