import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';


function Welcome(props) {
  return <h1 className="title">{props.name}</h1>;
}

function FootballTeam(name, played, wins, draws, losses) {
  let points = (wins * 3) + draws;
  this.name = name;
  this.played = played;
  this.wins = wins;
  this.losses = losses;
  this.draws = draws
  this.points = points;
}

let teams = [];

const team = new FootballTeam('Man U', 0, 0, 0, 0, 0);
teams.push(team);
const teamTwo = new FootballTeam('Man City', 0, 0, 0, 0, 0);
teams.push(teamTwo);
const teamThree = new FootballTeam('Liverpool', 0, 0, 0, 0, 0);
teams.push(teamThree);
const teamFour = new FootballTeam('Chelsea', 0, 0, 0, 0, 0);
teams.push(teamFour);
const teamFive = new FootballTeam('Arsenal', 0, 0, 0, 0, 0);
teams.push(teamFive);
const teamSix = new FootballTeam('Tottenham', 0, 0, 0, 0, 0);
teams.push(teamSix);
const teamSeven = new FootballTeam('Everton', 0, 0, 0, 0, 0);
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

  if(homeGoals > awayGoals){
    teams[homeIndex].wins += 1;
    teams[homeIndex].points += 3;
    teams[awayIndex].losses += 1;
    teams[homeIndex].played += 1;
    teams[awayIndex].played += 1;
  } else if (homeGoals < awayGoals) {
    teams[awayIndex].wins += 1;
    teams[awayIndex].points += 3;
    teams[homeIndex].losses += 1;
    teams[homeIndex].played += 1;
    teams[awayIndex].played += 1;
  } else {
    teams[homeIndex].draws += 1;
    teams[awayIndex].draws += 1;
    teams[homeIndex].points += 1;
    teams[awayIndex].points += 1;
    teams[homeIndex].played += 1;
    teams[awayIndex].played += 1;
  }
}

let homeTeamName, awayTeamName;

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
    const homeTeam = e.target.elements[0].name;
    const awayTeam = e.target.elements[1].name;

    const fixture = {
      homeGoals,
      awayGoals,
    }
    this.setState({[match]: fixture});
    determineResult(homeTeam, homeGoals, awayTeam, awayGoals);
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
                ref={awayTeamName}
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


class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: teams
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.update(),
      10000
    );
  }

  update() {
    this.setState({
      teams: teams
    });
  }

  render() {
    return (
      <table className="leagueTable">
        <thead>
          <tr>
            <th key="nameColumn">Name</th>
            <th key="playedColumn">Played</th>
            <th key="winsColumn">Wins</th>
            <th key="lossesColumn">Losses</th>
            <th key="drawsColumn">Draws</th>
            <th key="pointsColumn"
              onClick =
              {() => {this.setState({teams: teams});
            }}
            >Points</th>
          </tr>
        </thead>
        <tbody>
          {this.props.teams.map((team, i) =>
            <tr>
              <td className="Team Name" name="name" id={"name" + i} key={"team" + i}>
                {this.state.teams[i].name}
              </td>
              <td className="Played" name="played" id={"played" + i} key={"played" + i}>
                {this.state.teams[i].played}
              </td>
              <td className="Team Wins" name="wins" id={"wins" + i} key={"wins" + i}>
                {this.state.teams[i].wins}
              </td>
              <td className="Team Losses" name="losses" id={"losses" + i} key={"losses" + i}>
                {this.state.teams[i].losses}
              </td>
              <td className="Team Draws" name="draws" id={"draws" + i} key={"draws" + i}>
                {this.state.teams[i].draws}
              </td>
              <td className="Team Points" name="points" id={"points" + i} key={"points" + i}>
                {this.state.teams[i].points}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    );
  }
}





class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome name="Premier League" />
        <League teams={teams} />
        <ResultsForm />
      </div>
    )
  }
}

export default App;
