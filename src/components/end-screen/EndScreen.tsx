import questions from "../../data/questions.json"
import styles from "./EndScreen.module.css"

interface EndScreen{
  className: string
  myAns: string []
  onReview: () => void
  onStartAgain: () => void
  index: number
}

const EndScreen = (props: EndScreen) => {
  let count = 0;
    const correctAnswer: string[] = questions.map((item) =>{
    console.log('mang la === ', item.answers.filter(answer => answer.correct)[0].answer_content);
     return item.answers.filter(answer => answer.correct)[0].answer_content
    })
    console.log(correctAnswer);
    correctAnswer.forEach((item, index) => {
      if(item === props.myAns[index]){
        count++;
      }
    })
    console.log(correctAnswer, props.myAns);
  return (
    <div>
      <h2>End Screen</h2>
      <h3>Your score is : {count} / {questions.length}</h3>
      <div className={styles.containerBtnEndScreen}>
        <button className={styles.tryAgainBtn} onClick={props.onStartAgain}>Try Again</button>
        <button className={styles.reviewBtn} onClick={props.onReview}>Review</button>
      </div>
    </div>
  )
}

export default EndScreen