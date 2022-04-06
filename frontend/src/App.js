import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./routes/Home";
import Statistics from "./routes/Statistics";
import Column from "./routes/Column";
import News from "./routes/News";
import Signup from "./routes/Signup";
import League from "./routes/League";
import LeaguePlayerStatistics from "./routes/LeaguePlayerStatistics";
import LeagueTeamStatistics from "./routes/LeagueTeamStatisitc";
import TeamInfo from "./routes/TeamInfo";
import PlayerInfo from "./routes/PlayerInfo";

export const baseUrlNoApi = "http://localhost:8080";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/column" element={<Column />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/:leagueName" element={<League />}></Route>
        <Route
          path="/:leagueName/players"
          element={<LeaguePlayerStatistics />}
        ></Route>
        <Route
          path="/:leagueName/teams"
          element={<LeagueTeamStatistics />}
        ></Route>
        <Route path="/teams/:teamName" element={<TeamInfo />}></Route>
        <Route
          path="/player/:playerId/:playerName"
          element={<PlayerInfo />}
        ></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </Router>
  );
}

export default App;
