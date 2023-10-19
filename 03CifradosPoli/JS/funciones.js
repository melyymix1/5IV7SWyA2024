document.addEventListener("DOMContentLoaded", function () {
    const texto = document.getElementById("texto");
    const metodo = document.getElementById("metodo");
    const claveGroup = document.getElementById("clave-group");
    const clave = document.getElementById("clave");
    const desplazamientoGroup = document.getElementById("desplazamiento-group");
    const desplazamiento = document.getElementById("desplazamiento");
    const resultadoGroup = document.getElementById("resultado-group");
    const resultado = document.getElementById("resultado");
    const cifrarButton = document.getElementById("cifrar");
    const descifrarButton = document.getElementById("descifrar");
    const copiarButton = document.getElementById("copiar");
    const reiniciarButton = document.getElementById("reiniciar");

    claveGroup.style.display = "none";
    desplazamientoGroup.style.display = "none";
    resultadoGroup.style.display = "none";
    cifrarButton.style.display = "none";
    descifrarButton.style.display = "none";
    copiarButton.style.display = "none";
    reiniciarButton.style.display = "none";

    cifrarButton.addEventListener("click", function () {
        const selectedMethod = metodo.value;
        const inputText = texto.value;
        
        if (selectedMethod === "cesar") {
            const inputShift = parseInt(desplazamiento.value);
            const encryptedText = cifradoCesar(inputText, inputShift);
            resultado.value = encryptedText;
        } else if (selectedMethod === "vigenere") {
            const inputKey = clave.value;
            const encryptedText = cifradoVigenere(inputText, inputKey);
            resultado.value = encryptedText;
        }
    });

    descifrarButton.addEventListener("click", function () {
        const selectedMethod = metodo.value;
        const inputText = texto.value;

        if (selectedMethod === "cesar") {
            const inputShift = parseInt(desplazamiento.value);
            const decryptedText = descifradoCesar(inputText, inputShift);
            resultado.value = decryptedText;
        } else if (selectedMethod === "vigenere") {
            const inputKey = clave.value;
            const decryptedText = descifradoVigenere(inputText, inputKey);
            resultado.value = decryptedText;
        }
    });

    copiarButton.addEventListener("click", function () {
        var copiar = resultado.value;
        texto.value = copiar;
    });
    

    reiniciarButton.addEventListener("click", function () {
        texto.value = "";
        metodo.selectedIndex = 0;
        clave.value = "";
        desplazamiento.value = "";
        resultado.value = "";
        claveGroup.style.display = "none";
        desplazamientoGroup.style.display = "none";
        resultadoGroup.style.display = "none";
        cifrarButton.style.display = "none";
        descifrarButton.style.display = "none";
        copiarButton.style.display = "none";
        reiniciarButton.style.display = "none";
    });

    metodo.addEventListener("change", function () {
        const selectedMethod = metodo.value;

        if (selectedMethod === "cesar") {
            claveGroup.style.display = "none";
            desplazamientoGroup.style.display = "block";
        } else if (selectedMethod === "vigenere") {
            claveGroup.style.display = "block";
            desplazamientoGroup.style.display = "none";
        } else if (selectedMethod === "seleccionar") {
            claveGroup.style.display = "none";
            desplazamientoGroup.style.display = "none";
        }

        if (selectedMethod !== "seleccionar") {
            resultadoGroup.style.display = "block";
            cifrarButton.style.display = "block";
            descifrarButton.style.display = "block";
            copiarButton.style.display = "block";
            reiniciarButton.style.display = "block";
        } else {
            resultadoGroup.style.display = "none";
            cifrarButton.style.display = "none";
            descifrarButton.style.display = "none";
            copiarButton.style.display = "none";
            reiniciarButton.style,display = "none";
        }
    });

    const alfabeto = "abcdefghijklmnopqrstuvwxyz";

    function cifradoCesar(texto, clave) {
        let desplazamiento;

        if (typeof clave === "string" && clave.length === 1) {
            const claveMinuscula = clave.toLowerCase();
            if (alfabeto.includes(claveMinuscula)) {
                desplazamiento = alfabeto.indexOf(claveMinuscula);
            } else {
                desplazamiento = 0;
            }
        } else if (typeof clave === "number") {
            desplazamiento = ((clave % 26) + 26) % 26;
        } else {
            desplazamiento = 0;
        }

        let result = "";

        for (let i = 0; i < texto.length; i++) {
            let letra = texto[i];

            if (alfabeto.includes(letra.toLowerCase())) {
                let indice = (alfabeto.indexOf(letra.toLowerCase()) + desplazamiento) % 26;
                if (letra === letra.toLowerCase()) {
                    result += alfabeto[indice];
                } else {
                    result += alfabeto[indice].toUpperCase();
                }
            } else {
                result += letra;
            }
        }

        return result;
    }

    function descifradoCesar(texto, desplazamiento) {
        return cifradoCesar(texto, 26 - desplazamiento);
    }

    function cifradoVigenere(texto, clave) {
        var viggenere = (function () {
            var doStaff = function (txt, desp, action) {
                var replace = (function () {
                    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                    var l = abc.length;
                    return function (c) {
                        var i = abc.indexOf(c.toLowerCase());
                        if (i != -1) {
                            var pos = i;
                            if (action) {
                                pos += desp;
                                pos = (pos >= l) ? pos - l : pos;
                            } else {
                                pos -= desp;
                                pos = (pos < 0) ? l + pos : pos;
                            }
                            return abc[pos];
                        }
                        return c;
                    }
                })();
                var re = (/([a-z])/ig);
                return String(txt).replace(re, function (match) {
                    return replace(match);
                });
            };
            return {
                encode: function (txt, desp) {
                    return doStaff(txt, desp, true);
                },
                decode: function (txt, desp) {
                    return doStaff(txt, desp, false);
                }
            };
        })();

        let result = "";
        var indiceClave = 0;
        var charATexto = texto.split('');

        for (var i = 0; i < charATexto.length; i++) {
            var des = obIndeceClave(clave.charAt(indiceClave));
            var charTexto = charATexto[i];

            result += viggenere.encode(charTexto, (des >= 26) ? des % 26 : des);
            indiceClave++;
            if (indiceClave >= clave.length) {
                indiceClave = 0;
            }
        }
        return result;
    }

    function descifradoVigenere(texto, clave) {
        var viggenere = (function () {
            var doStaff = function (txt, desp, action) {
                var replace = (function () {
                    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                    var l = abc.length;
                    return function (c) {
                        var i = abc.indexOf(c.toLowerCase());
                        if (i != -1) {
                            var pos = i;
                            if (action) {
                                pos += desp;
                                pos = (pos >= l) ? pos - l : pos;
                            } else {
                                pos -= desp;
                                pos = (pos < 0) ? l + pos : pos;
                            }
                            return abc[pos];
                        }
                        return c;
                    };
                })();
                var re = (/([a-z])/ig);
                return String(txt).replace(re, function (match) {
                    return replace(match);
                });
            };
            return {
                encode: function (txt, desp) {
                    return doStaff(txt, desp, true);
                },
                decode: function (txt, desp) {
                    return doStaff(txt, desp, false);
                }
            };
        })();
    
        let result = "";
        var indiceClave = 0;
        var charATexto = texto.split('');
    
        for (var i = 0; i < charATexto.length; i++) {
            var des = obIndeceClave(clave.charAt(indiceClave));
            var charTexto = charATexto[i];
    
            result += viggenere.decode(charTexto, (des >= 26) ? des % 26 : des);
            indiceClave++;
            if (indiceClave >= clave.length) {
                indiceClave = 0;
            }
        }
        return result;
    }
    
    function obIndeceClave(reco) {
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        return abc.indexOf(reco.toLowerCase());
    }

});
