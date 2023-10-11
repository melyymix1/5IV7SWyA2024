const desplazamiento= document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado= document.getElementById("cifrado");

function Cifrado()
{
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c=>
    {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero= c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122)
        {
          const valorDezplatamiento= parseInt(desplazamiento.value);
          if(valorEntero + valorDezplatamiento > 122)
          {
            valorEntero = 97 + (valorEntero -122 )+ valorDezplatamiento-1;
          }else {
            valorEntero = valorEntero+valorDezplatamiento;
          }
        }
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

texto.addEventListener("keyup", Cifrado);

function Descifrado() {
  const textoCifradoIngresado = textoCifrado.value;
  texto.value = textoCifradoIngresado.split('').map(c => {
      let mayus = (c === c.toUpperCase()) ? true : false;
      let valorEntero = c.toLowerCase().charCodeAt(0);
      if (valorEntero >= 97 && valorEntero <= 122) {
          const valorDesplazamiento = parseInt(desplazamiento.value);
          if (valorEntero - valorDesplazamiento < 97) {
              valorEntero = 122 - (valorDesplazamiento - (valorEntero - 96));
          } else {
              valorEntero = valorEntero - valorDesplazamiento;
          }
      }
      let descifrado = String.fromCharCode(valorEntero);
      return mayus ? descifrado.toUpperCase() : descifrado;
  }).join('');
}

texto.addEventListener("keyup", Descifrado);