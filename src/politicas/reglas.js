const CARACTERES_OBLIGATORIOS = ['!', '#', '$', '%', '&', '=']
const DIGITOS_OBLIGATORIOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const reglas = [
    {
        nombre: 'La longitud minima debe ser de mayor a 8 caracteres',
        fn: (pwd) => pwd.length >= 8
    },
    {
        nombre: "No debe contener espacios en blanco",
        fn: (pwd) => !pwd.includes(' ')
    },
    {
        nombre: 'Debe contener al menos uno de los siguientes caracteres especiales : !#$%&=',
        fn: (pwd) => CARACTERES_OBLIGATORIOS.some(c => pwd.includes(c))
    },
    {
        nombre: 'Debe contener al menos un digito númerico obligatorio : 123456789',
        fn: (pwd) => DIGITOS_OBLIGATORIOS.some(d => pwd.includes(d))
    },
    {
        nombre: 'El ultimo caracter no debe ser un caracter no puede ser un caracter obligatorio',
        fn: (pwd) => {
            const ultimoCaracter = pwd[pwd.length - 1]
            return !CARACTERES_OBLIGATORIOS.some(caracter => caracter == ultimoCaracter)
        }
    }
]

const reglasAValidar = ({ password }) => reglas.every(r => r.fn(password))


module.exports = { reglasAValidar }