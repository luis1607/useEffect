
import React , {Fragment,useState} from 'react';
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue',cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size:  2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
width: 100%;
display: block;
padding: 1rem;
-webkit-appearance:none;
border-radius: 10px;
border:none;
font-size: 1.2rem;
`


const useCriptoMoneda = (label,stateInicial,criptomonedas)=>{
    
    //state de nuestro custom hook 

    const [state,actualizarState ] = useState(stateInicial)

    const selectCripto = () =>(
        <Fragment>
        <Label>{label}</Label>
        <Select
            onChange={ e => actualizarState(e.target.value)}
            value={state}
        >
            <option value="">--Sleccione--</option>
            {criptomonedas.map((cripto)=>(
                <option key={cripto.CoinInfo.Id} value={cripto.CoinInfo.Name}>{cripto.CoinInfo.FullName}</option>
            ))}
        </Select>
        </Fragment>
    )

    //Retornar state, interfa y fn que modifica el state
    return [state, selectCripto,actualizarState]
}

export default useCriptoMoneda;