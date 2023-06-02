import { useState } from "react";
import "./App.css";
import StartScreen from "./components/start-screen/StartScreen";
import GamePage from "./components/game/GamePage";
import EndScreen from "./components/end-screen/EndScreen";
import Review from "./components/review/Review";
import questions from "./data/questions.json";

function App() {
  const [gameState, setStateGame] = useState<
    "start" | "running" | "end" | "review"
  >("start");
  const onChangeMode = (mode: "start" | "running" | "end" | "review") => {
    setStateGame(mode);
  };
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [myAnswer, setMyAnswer] = useState<string[]>([]);
  const preQuesion = () => {
    if (indexQuestion > 0) {
      setIndexQuestion(indexQuestion - 1);
    }
  };

  const nextQuestion = () => {
    if (indexQuestion < questions.length - 1) {
      setIndexQuestion(indexQuestion + 1);
    }
  };

  const resetState = () => {
    setIndexQuestion(0);
    setMyAnswer([]);
    onChangeMode("start");
  };
  const resetIndexReview = () => {
    setIndexQuestion(0);
    onChangeMode("review");
  };

  const makeAnswer = (ans: string) => {
    console.log(ans);

    const newAnswer = [...myAnswer];
    newAnswer[indexQuestion] = ans;
    setMyAnswer(newAnswer);
    console.log("mang cac dap an da chon === ", myAnswer);
  };

  const renderScreen = () => {
    switch (gameState) {
      case "start":
        return (
          <StartScreen
            index={0}
            listAnswer={myAnswer}
            className="textCenter"
            onStartGame={() => onChangeMode("running")}
          />
        );
      case "running":
        return (
          <>
            <GamePage
              onEndGame={() => onChangeMode("end")}
              index={indexQuestion}
              preQuesion={() => preQuesion()}
              nextQuestion={() => nextQuestion()}
              createAnswer={makeAnswer}
              myAnswer={myAnswer}
              onTimer={() => onChangeMode("end")}
              seconds={20}
            />
          </>
        );
      case "end":
        return (
          <EndScreen
            className="text-center"
            index={indexQuestion}
            onReview={() => resetIndexReview()}
            onStartAgain={() => resetState()}
            myAns={myAnswer}
          />
        );
      case "review":
        return (
          <Review
            onStartGame={() => resetState()}
            index={indexQuestion}
            preQuesion={() => preQuesion()}
            nextQuestion={() => nextQuestion()}
            myAns={myAnswer}
            createAnswer={makeAnswer}
          />
        );
      default:
        return null;
    }
  };
  return <>{renderScreen()}</>;
}

export default App;
