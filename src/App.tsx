import { useState } from 'react'
import * as C from "./AppStyles"
import logoImage from "./assets/devmemory_logo.png"
import RestartIcon from "./svgs/restart.svg"
import { InfoItem } from './components/infoItem'
import { Button } from './components/button'

function App() {

  const resetAndCreateGrid = () => {
    console.log("start")
  }

    return (
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt=""/>
          </C.LogoLink>
          <C.InfoArea>
              <InfoItem label="tempo" value="00:00"/>
              <InfoItem label="Movimentos" value="0"/>
          </C.InfoArea>
          <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}></Button>
        </C.Info>
        <C.GridArea>

        </C.GridArea>
      </C.Container>
    )
}

export default App
