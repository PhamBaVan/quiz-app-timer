import styles from "./StartScreen.module.css"

interface StartScreen {
  className : string
  onStartGame: () => void
  listAnswer: string[]
  index: number
}

const StartScreen = (props: StartScreen) => {
  return (
    <div className={styles.startScreen}>
      <h1>Welcome to React Quiz Game!</h1>
      <button className={styles.startBtn} onClick={ props.onStartGame}>Start</button>
    </div>
  )
}

export default StartScreen