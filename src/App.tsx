/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TooltipController as Tooltip } from 'components/TooltipController'
import { TooltipProvider, TooltipWrapper } from 'components/TooltipProvider'
import { IPosition } from 'components/Tooltip/TooltipTypes.d'
import { useState } from 'react'
import styles from './styles.module.css'

function WithProviderMinimal() {
  return (
    <section style={{ marginTop: '50px' }}>
      <p>
        <TooltipWrapper place="bottom" content="Shared Global Tooltip">
          <button>Minimal 1</button>
        </TooltipWrapper>
        <TooltipWrapper place="right" content="Shared Global Tooltip">
          <button>Minimal 2</button>
        </TooltipWrapper>
      </p>
      <Tooltip />
    </section>
  )
}

function WithProviderMultiple() {
  return (
    <section style={{ marginTop: '50px' }}>
      <p>
        <TooltipWrapper tooltipId="tooltip-1" place="bottom">
          <button>Multiple 1</button>
        </TooltipWrapper>
        <TooltipWrapper tooltipId="tooltip-2" place="right">
          <button>Multiple 2</button>
        </TooltipWrapper>
      </p>
      <Tooltip id="tooltip-1" content="Tooltip 1" />
      <Tooltip id="tooltip-2" content="Tooltip 2" />
    </section>
  )
}

function App() {
  const [anchorId, setAnchorId] = useState('button')
  const [isDarkOpen, setIsDarkOpen] = useState(false)
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 })
  const [toggle, setToggle] = useState(false)

  const handlePositionClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const x = event.clientX
    const y = event.clientY
    setPosition({ x, y })
  }

  return (
    <main className={styles['main']}>
      <button
        id="button"
        aria-describedby="tooltip"
        data-tooltip-content="My big tooltip content 1"
        onClick={() => {
          setAnchorId('button')
        }}
      >
        My button
      </button>
      <Tooltip
        place="bottom"
        anchorId={anchorId}
        // only shown if `data-tooltip-content` is unset
        content={`Showing tooltip on ${anchorId}`}
        isOpen={isDarkOpen}
        setIsOpen={setIsDarkOpen}
      />
      <Tooltip
        place="top"
        variant="success"
        anchorId="button2"
        isOpen={isDarkOpen}
        setIsOpen={setIsDarkOpen}
      />
      <Tooltip
        place="top"
        variant="info"
        anchorId="button3"
        isOpen={isDarkOpen}
        setIsOpen={setIsDarkOpen}
      />
      <Tooltip
        place="right"
        variant="info"
        anchorId="button3"
        content="My big tooltip content"
        isOpen={isDarkOpen}
        setIsOpen={setIsDarkOpen}
        style={{ backgroundColor: '#ff00ff' }}
      />

      <section style={{ marginTop: '100px' }}>
        <p>
          <button
            id="button2"
            data-tooltip-content="Hello World from a Tooltip 2"
            onClick={() => {
              setAnchorId('button2')
            }}
          >
            Hover or focus me
          </button>
          <button
            id="button3"
            data-tooltip-content="Hello World from a Tooltip 3"
            onClick={() => {
              setAnchorId('button3')
            }}
          >
            Hover or focus me 2
          </button>
        </p>
      </section>
      <TooltipProvider>
        <WithProviderMinimal />
      </TooltipProvider>
      <TooltipProvider>
        <WithProviderMultiple />
      </TooltipProvider>
      <div style={{ display: 'flex', gap: '12px', flexDirection: 'row' }}>
        <div>
          <div
            id="floatAnchor"
            className={styles['big-anchor']}
            onClick={() => {
              setToggle((t) => !t)
            }}
          >
            Hover me!
          </div>
          <Tooltip
            anchorId="floatAnchor"
            content={
              toggle
                ? 'This is a float tooltip with a very very large content string'
                : 'This is a float tooltip'
            }
            float
          />
        </div>
        <div>
          <div
            id="onClickAnchor"
            className={styles['big-anchor']}
            onClick={(event) => {
              handlePositionClick(event)
            }}
          >
            Click me!
          </div>
          <Tooltip
            anchorId="onClickAnchor"
            content={`This is an on click tooltip (x:${position.x},y:${position.y})`}
            events={['click']}
            position={position}
          />
        </div>
      </div>
    </main>
  )
}

export default App
