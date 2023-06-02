import { useEffect, useState } from 'react'
import * as C from "./AppStyles"
import logoImage from "./assets/devmemory_logo.png"
import RestartIcon from "./svgs/restart.svg"
import { InfoItem } from './components/infoItem'
import { Button } from './components/button'
import { GridItemType } from './types/GridItemType'

function App() {

  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapser] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => {
    resetAndCreateGrid()
  }, [])

  const resetAndCreateGrid = () => {
    
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
          <C.Grid>

          </C.Grid>
        </C.GridArea>
      </C.Container>
    )
}

export default App
