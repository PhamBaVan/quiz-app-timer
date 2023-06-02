import questions from "../../data/questions.json";
import styles from "./GamePage.module.css";
import CountDown from "../CountDown/CountDown";

interface GamePage {
  onEndGame: () => void;
  index: number;
  preQuesion: () => void;
  nextQuestion: () => void;
  createAnswer: (ans: string) => void;
  myAnswer: string[];
  onTimer: () => void;
  seconds: number;
}

const GamePage = (props: GamePage) => {
  const { myAnswer } = props;
  const selectAnswer = (ans: string) => {
    props.createAnswer(ans);
  };
  const datas = questions.map((item) => {
    return item;
  });
  return (
    <div className={styles.gamePage_container}>
      <div className={styles.actions}>
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
          <button className={styles.nextBtn} onClick={props.nextQuestion}>
            Next
          </button>
        ) : (
          ""
        )}
        {props.index === questions.length - 1 && (
          <button className={styles.submitBtn} onClick={props.onEndGame}>
            Submit
          </button>
        )}
      </div>
      <div className={styles.content}>
        <CountDown activeTimer={props.onTimer} seconds={90} />
        <div className={styles.containerQuestion}>
          <div className={styles.statusQuestion}>
            Question: {props.index + 1}/{datas.length}
          </div>
          <h3 className={styles.question}>
            {datas[props.index].question_content}
          </h3>
        </div>
      </div>
      <div>
        {datas[props.index].answers.map((item, index) => {
          const isSelected = myAnswer[props.index] === item.answer_content;

          const answerItemClass = `${styles.answer_item} ${
            isSelected ? styles.selected : ""
          }`;
          return (
            <div
              className={answerItemClass}
              onClick={() => selectAnswer(item.answer_content)}
              key={index}
            >
              {index + 1}. {item.answer_content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamePage;
