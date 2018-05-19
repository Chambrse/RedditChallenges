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


function polydivide(poly1, poly2) {

    poly1 = [[4, 3], [2,2], [-6, 1], [3, 0]]; /*"4x^3 + 2x^2 - 6x^1 + 3x^0"*/
    poly2 = [[1, 1], [-3, 0]]; /*"1x^1 - 3x^0"*/


    /* Sort the input into descending order */
    poly1.sort(function (b, a) {
        return a[1] - b[1];
    });

    poly2.sort(function (b, a) {
        return a[1] - b[1];
    });

    console.log(poly1[0][1]);

    /* fill in empty terms */
    var OGlength = poly1.length;
    var OGlength2 = poly2.length;

    for (var i = 0; i < OGlength; i++) {
        if (poly1[i][1] != 0) {
            if (poly1[i][1] != poly1[i + 1][1] + 1) {
                poly1.splice(i + 1, 0, [0, poly1[i][1] - 1]);
            }
        }
        console.log(poly1);
    }

    for (var i = 0; i < OGlength2; i++) {
        if (poly2[i][1] != 0) {
            if (poly2[i][1] != poly2[i + 1][1] + 1) {
                poly2.splice(i + 1, 0, [0, poly2[i][1] - 1]);
            }
        }
        console.log(poly2);
    }

    var quotient = [];
        console.log(poly1[0][0] / poly2[0][0]);
        quotient.push([poly1[0][0] / poly2[0][0], poly1[0][1] - poly2[0][1]]);
        console.log(quotient);
        var newTerm = [quotient[0][0] * poly2[1][0], quotient[0][1] + poly2[0][1]];
        console.log(newTerm);
    



    /*     var poly1Split = poly1.split("x^");
        var poly2Split = poly2.split("x^");
    
        var poly1Coef = [];
        var poly2Coef = [];
    
        var poly1Exp = [];
        var poly2Exp = [];
    
        poly1Coef.push(poly1Split[0]);
        poly2Coef.push(poly2Split[0]);
    
        for (var i = 1; i < poly1Split.length - 1; i++) {
            poly1Coef.push(poly1Split[i].charAt("2") + poly1Split[i].charAt("4"));
            poly1Exp.push(poly1Split[i].charAt("0"));
        }
    
        poly1Exp.push(poly1Split[poly1Split.length - 1]); */

    /*     console.log(poly1Coef);
        console.log(poly1Exp);
        console.log(poly1Split);
        console.log(poly2Split);
     */
}