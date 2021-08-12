import React, {useEffect,useState} from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptoMoneda from '../hooks/useCriptomoneda'
import axios from 'axios';
import Error from './Error'

const Boton = styled.input`

    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }

`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    const [ listaCripto, guardarCriotomonedas] = useState([]);
    const [error, guardarError] = useState(false)

    const MONEDAS = [
        { codigo : 'USD', nombre: 'Dolar de estados unidos'},
        { codigo : 'MXN', nombre: 'Peso Mexicano'},
        { codigo : 'EUR', nombre: 'Euro'}
    ]

    //Utilizar monedas
    const [ moneda, SelectMoneda ] = useMoneda('Seleccione Moneda','', MONEDAS)

    //utilizar hooks criptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptoMoneda('Elige tu criptomoneda','', listaCripto)
    

    //Llamando al api
     useEffect(()=>{

        const consultarApi = async ()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios(url);
             console.log('Este es el resutlado',resultado.data.Data)
             guardarCriotomonedas(resultado.data.Data)
        }

        consultarApi();

     },[])

     //cUANDO EL USUARIO HACE SUBMIT
     const cotizarMoneda = (e) =>{
         e.preventDefault()

         //ValidaR CAMPOS
        //VALIDAR SI AMBOS CAMPSO ESTAN LLENOS
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            guardarError(true);
            return;
        }

        //
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)

     }

    return ( 

        <form
        onSubmit={cotizarMoneda}
        >
            { error? <Error mensaje = "Los campos deben ser escogidos"/>: null}

            <SelectMoneda />

            <SelectCripto />

            <Boton 
            type="submit"
            value="calcular"
            />
        </form>


     );
}
 
export default Formulario;