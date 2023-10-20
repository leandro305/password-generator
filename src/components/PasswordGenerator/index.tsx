import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import {  useEffect, useState } from 'react'

import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import Checkbox from '../Checkbox'
import './index.css'

const PasswordGenerator = () => {
  const [randomCharacter, setRamdomCharacter] = useState('')
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(false)
  const [numbers, setNumbers] = useState(true)
  const [especialChars, setEspecialChars] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(<b></b>)

  let count = 0
  var conditionSet : boolean[] = []

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
  }
  
  const generateRandomCode = () => {

    // Define a lógica para geração da senha aleatória
    var A_Z = upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : ''
    var a_z = lower ? "abcdefghijklmnopqrstuvwxyz" : ''
    var O_9 = numbers ? "0123456789" : ''
    var simbolos_especiais = especialChars ? "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" : ''

    var stringAleatoria = ''
    var caracteres = `${A_Z}${a_z}${O_9}${simbolos_especiais}`

    var hasUpper = false
    var hasLower = false
    var hasNumber = false
    var hasEspecialChars = false


    for (var i = 0; i < passwordLength; i++) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    // Define a lógica da mensagem força da senha
    for (var a = 0; a < A_Z.length; a++) {
      if (stringAleatoria.indexOf(A_Z[a]) !== -1){
        hasUpper = true
        break
      }
    }
    for (var b = 0; b < a_z.length; b++) {
      if (stringAleatoria.indexOf(a_z[b]) !== -1){
        hasLower = true
        break
      }
    }
    for (var c = 0; c < O_9.length; c++) {
      if (stringAleatoria.indexOf(O_9[c]) !== -1){
        hasNumber = true
        break
      }
    }
    for (var d = 0; d < simbolos_especiais.length; d++) {
      if (stringAleatoria.indexOf(simbolos_especiais[d]) !== -1){
        hasEspecialChars = true
        break
      }
    }

    conditionSet = [hasUpper, hasLower, hasNumber, hasEspecialChars]

    for (var z = 0; z < conditionSet.length; z++) {
      if (conditionSet[z] === true) {
        count++
      }
    }

    setPasswordStrength(setMsgForçaDaSenha())

    count = 0

    return stringAleatoria;
  }

  let setMsgForçaDaSenha = () => {

    if (passwordLength <= 7) {
      return (<div className='texto-perigo'>Muito Curta</div>)
    }else if (count===4) {
      return (<div className='texto-sucesso'>Difícil</div>)
    }else if (count===3) {
      return (<div className='texto-alerta'>Média</div>)
    }else if (count===2 || count===1) {
      return (<div className='texto-perigo'>Fraco</div>)
    }
    return <div className='texto-perigo'>"Erro na mensagem"</div>
  }

  const atLeastOneMarked = () => {
    if (upper === false && lower === false && numbers === false && especialChars === false) {
      setLower(true)
    }
  }

  const [textCopyOrCopied, setTextCopyOrCopied] = useState("Copiar")
  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomCharacter)
    setTextCopyOrCopied("Copiado")
    setTimeout(() => {
      setTextCopyOrCopied("Copiar")
    }, 1500);
  }

  useEffect(() => {
    setRamdomCharacter(generateRandomCode())
    // eslint-disable-next-line
  }, []);

  useEffect( () => {
    atLeastOneMarked()
    // eslint-disable-next-line
  }, [upper, lower, numbers, especialChars])
  

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
        Crie senhas fortes e seguras para manter sua conta online segura.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" onChange={() => {}} value={randomCharacter} />

          <Refresh onClick={() => { setRamdomCharacter(generateRandomCode()) }}/>
        
        </div>
        <button className="copy-btn" onClick={() => {copyToClipboard()}}>
          <Copy /> {textCopyOrCopied}
        </button>
      </div>
      <span className="fw-500">{passwordStrength}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Comprimento da senha: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Maiúsculas" checked={upper} onChange={()=> {setUpper(!upper); atLeastOneMarked()}} name="upper" />
        <Checkbox id="lowercase" label="Minúsculas" checked={lower} onChange={()=>{setLower(!lower); atLeastOneMarked()}} name="lower" />
        <Checkbox id="numbers" label="Números" checked={numbers} onChange={()=>{setNumbers(!numbers); atLeastOneMarked()}} name="numbers" />
        <Checkbox
          id="special chars"
          label="Caracteres especiais"
          checked={especialChars}
          onChange={()=>{setEspecialChars(!especialChars); atLeastOneMarked()}}
          name="specialChars"
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
