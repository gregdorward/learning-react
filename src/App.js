import React, { Component } from 'react';
import './App.css';


function Welcome(props) {
  return <h1 className="title">{props.name}</h1>;
}

function FootballTeam(name, wins, draws, losses) {
  let points = (wins * 3) + draws;
  this.name = name;
  this.wins = wins;
  this.losses = losses;
  this.points = points;
}

let teams =[];

const team = new FootballTeam('Man U', 30, 6, 2);
teams.push(team);
const teamTwo = new FootballTeam('Man City', 30, 2, 6);
teams.push(teamTwo);
const teamThree = new FootballTeam('Liverpool', 26, 8, 4);
teams.push(teamThree);
const teamFour = new FootballTeam('Chelsea', 22, 10, 8);
teams.push(teamFour);
const teamFive = new FootballTeam('Arsenal', 22, 9, 9);
teams.push(teamFive);
const teamSix = new FootballTeam('Tottenham', 20, 12, 6);
teams.push(teamSix);
const teamSeven = new FootballTeam('Everton', 18, 12, 8);
teams.push(teamSeven);

function createFixtures(teamvalues) {
  if (teamvalues.length < 2) { return []; }
  var first = teamvalues[0],
  rest  = teamvalues.slice(1),
  pairs = rest.map(function (x) { return [first, x]; });
  return pairs.concat(createFixtures(rest));
}

let fixtureList = createFixtures(teams);
let randomisedFixtureList = fixtureList.sort(function(a, b){return 0.5 - Math.random()});


function determineResult(homeTeamName, homeGoals, awayTeamName, awayGoals) {
  let homeIndex = teams.map(function(e) { return e.name; }).indexOf(homeTeamName)
  let awayIndex = teams.map(function(e) { return e.name; }).indexOf(awayTeamName)

  console.log('this is the home team name: ' + homeTeamName);
  console.log("Index of home team: " + homeIndex);
  console.log("Index of away team: " + awayIndex);
  console.log("score one value in determineResult function: " + homeGoals);
  console.log("score two value in determineResult function: " + awayGoals);

  if(homeGoals > awayGoals){
    homeTeamName.wins += 1;
    homeTeamName.points += 3;
    awayTeamName.losses += 1;
    console.log(`${teams[0].name} are now on ${teams[0].points} points`)
  } else if (homeGoals < awayGoals) {
    teams[1].wins += 1;
    teams[1].points += 3;
    teams[0].losses += 1;
    //  console.log(`${teams[1].name} are now on ${teams[1].points} points`)
  } else {
    teams[homeIndex].draws += 1;
    teams[awayIndex].draws += 1;
    teams[homeIndex].points += 1;
    teams[awayIndex].points += 1;
    console.log(`${homeTeamName} are now on ${teams[homeIndex].points} points,
      ${awayTeamName} are now on ${teams[awayIndex].points} points`)
    }
  }

  let index, homeGoals, awayGoals, scoreOne, scoreTwo, fixture, homeTeamName, awayTeamName;

  class ResultsForm extends React.Component {
    constructor() {
      super();
      this.state = {};
      this.showScore = this.showScore.bind(this);
    }
    showScore(e){
      e.preventDefault();

      const match = e.target.name;
      const homeGoals = e.target.elements[0].value;
      const awayGoals = e.target.elements[1].value;

      const fixture = {
        homeGoals,
        awayGoals,
      }
      this.setState({[match]: fixture});
    }

    render() {
      return (
        <div>
          {randomisedFixtureList.map((fixture, i) =>
            <form className={i} key={"fixture" + i} ref="fixture" onSubmit={this.showScore} name={`fixture-${i}`}>

              <label>
                {homeTeamName = randomisedFixtureList[i][0].name}:

                <input type="text"
                  className="homeGoals"
                  ref={homeTeamName}
                  value={this.state.scoreOne}
                  name={homeTeamName}
                />
              </label>
              <label>
                {awayTeamName = randomisedFixtureList[i][1].name}:
                <input type="text"
                  className="awayGoals"
                  ref="awayGoals"
                  value={this.state.scoreTwo}
                  name={awayTeamName}
                />
              </label>
              <input type="submit" value="Submit"/>
            </form>
          )}
        </div>
      );
    }
  }


  class App extends Component {
    render() {
      return (
        <div className="App">
          <Welcome name="Premier League" />
          <table className="leagueTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, i) =>
                <tr key={teams[i].name}>
                  <td className="Team Name" id={"name" + i}>
                    {teams[i].name}
                  </td>
                  <td className="Team Wins" id={"wins" + i}>
                    {teams[i].wins}
                  </td>
                  <td className="Team Losses" id={"losses" + i}>
                    {teams[i].losses}
                  </td>
                  <td className="Team Points" id={"points" + i}>
                    {teams[i].points}
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
            </tfoot>
          </table>
          <ResultsForm />
          {/* <form className="ResultsForm">
          <label>
          Team 1 goals:
          <input type="text" name="teamOneGoals" />
        </label>
        <label>
        Team 2 goals:
        <input type="text" name="teamTwoGoals" />
      </label>
      <input type="submit" value="Submit" />
    </form> */}
  </div>
)
}
}

export default App;
