import questions from "../../data/questions.json";
import styles from "./Review.module.css";

interface Review {
  onStartGame: () => void;
  index: number;
  preQuesion: () => void;
  nextQuestion: () => void;
  myAns: string[];
  createAnswer: (ans: string) => void;
}

const Review = (props: Review) => {
  const datas = questions.map((item) => {
    return item;
  });

  const correctAnswer: string[] = questions.map((item) => {
    console.log(
      "mang la === ",
      item.answers.filter((answer) => answer.correct)[0].answer_content
    );
    return item.answers.filter((answer) => answer.correct)[0].answer_content;
  });

  return (
    <div className={styles.reviewQuestion_container}>
      <div className={styles.actionsReview}>
        {props.index !== 0 ? (
          <button className={styles.showPrevBtn} onClick={props.preQuesion}>
            Previous
          </button>
        ) : (
          <button className={styles.hidePrevBtn} onClick={props.preQuesion}>
            Previous
          </button>
        )}
        {props.index < questions.length - 1 ? (
          <button className={styles.nextQuestion} onClick={props.nextQuestion}>
            Next
          </button>
        ) : (
          ""
        )}
        <button className={styles.restartBtn} onClick={props.onStartGame}>
          Restart
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.counterTime}></div>
        <div className={styles.statusQuestion}>
          Question: {props.index + 1}/{datas.length}
        </div>
        <h3 className={styles.question}>
          {datas[props.index].question_content}
        </h3>
        {datas[props.index].answers.map((item, index) => {
          if (
            props.myAns[props.index] === correctAnswer[props.index] &&
            props.myAns[props.index] === item.answer_content
          ) {
            return (
              <div className={styles.rightAnswer} key={index}>
                {index + 1}. {item.answer_content}
              </div>
            );
          } else if (props.myAns[props.index] !== correctAnswer[props.index]) {
            if (props.myAns[props.index] === item.answer_content) {
              return (
                <div className={styles.wrongAnswer} key={index}>
                  {index + 1}. {item.answer_content}
                </div>
              );
            } else if (correctAnswer[props.index] === item.answer_content) {
              return (
                <div className={styles.rightAnswer} key={index}>
                  {index + 1}. {item.answer_content}
                </div>
              );
            }
          }
          return (
            <div className={styles.answer_item} key={index}>
              {index + 1}. {item.answer_content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Review;
