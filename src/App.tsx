import { useEffect, useState } from 'react'
import * as C from "./AppStyles"
import logoImage from "./assets/devmemory_logo.png"
import RestartIcon from "./svgs/restart.svg"
import { InfoItem } from './components/infoItem'
import { Button } from './components/button'
import { GridItemType } from './types/GridItemType'
import { items } from './data/items'
import { GridItem } from './components/GridItem'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

function App() {

  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect(() => {
    resetAndCreateGrid()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
    if(playing) {setTimeElapsed(timeElapsed + 1)} 
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  const resetAndCreateGrid = () => {
    //Step 1 - Reset game
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)

    //Step 2 = Create empty grid
    const tempGrid: GridItemType[] = []

    for(let i = 0; i < (items.length * 2); i++) 
      tempGrid.push({item: null, shown: false, permanentShown: false
      })

    //Step 3 - Filling in the grid
    for(let w = 0; w < 2; w++){
      for(let i = 0; i < items.length; i++){
        let pos = -1
        while(pos < 0 || tempGrid[pos].item !== null ) {
          pos = Math.floor(Math.random() *(items.length * 2))
        }   
        tempGrid[pos].item = i
      }
    }

    //Step 4 - Push in the state 
    setGridItems(tempGrid)

    //Step 5 - Start game
    setPlaying(true)
  }

  const handleItemClick = (index: number) => {
    console.log("...")
  }

    return (
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt=""/>
          </C.LogoLink>
          <C.InfoArea>
              <InfoItem label="tempo" value={formatTimeElapsed(timeElapsed)}/>
              <InfoItem label="Movimentos" value="0"/>
          </C.InfoArea>
          <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}></Button>
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem 
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
                /> 
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    )
}

export default App
