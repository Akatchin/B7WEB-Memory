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

  useEffect(() => {
    if(shownCount === 2) {
      const opened = gridItems.filter( item => item.shown === true )
      if(opened.length === 2) {
        //v1 - if both are equal, make every "shown" permanent
        const tempGrid = [...gridItems]
        if(opened[0].item === opened[1].item) {
          for(const i in tempGrid) {
            if(tempGrid[i].shown) {
              tempGrid[i].permanentShown = true
              tempGrid[i].shown = false
            }
          }
        setGridItems(tempGrid)
        setShownCount(0)
        } else {
          //v2 - if they are not equal, close all "shown"
         setTimeout(() => {
          const tempGrid = [...gridItems]
          for(const i in tempGrid) {
            tempGrid[i].shown = false
          }
         }, 1200)
        }
        setGridItems(tempGrid)
        setShownCount(0)

        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems])

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
    if(playing && index !== null && shownCount < 2) {
      const tempGrid = [...gridItems]

      if(tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
        tempGrid[index].shown = true
        setShownCount(shownCount +1)
      }

      setGridItems(tempGrid)
    }
  }

    return (
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt=""/>
          </C.LogoLink>
          <C.InfoArea>
              <InfoItem label="tempo" value={formatTimeElapsed(timeElapsed)}/>
              <InfoItem label="Movimentos" value={moveCount.toString()}/>
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
