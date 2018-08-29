import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';


class App extends React.Component {
  constructor() {
    super();

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
    const teamTwo = new FootballTeam('Man City', 0, 0, 0, 0, 0);
    const teamThree = new FootballTeam('Liverpool', 0, 0, 0, 0, 0);
    const teamFour = new FootballTeam('Chelsea', 0, 0, 0, 0, 0);
    const teamFive = new FootballTeam('Arsenal', 0, 0, 0, 0, 0);
    const teamSix = new FootballTeam('Tottenham', 0, 0, 0, 0, 0);
    const teamSeven = new FootballTeam('Everton', 0, 0, 0, 0, 0);
    teams.push(team, teamTwo, teamThree, teamFour, teamFive, teamSix, teamSeven);

    let randomisedFixtureList;
    function createFixtures(teams) {
      if (teams.length < 2) { return []; }
      var first = teams[0],
      rest  = teams.slice(1),
      pairs = rest.map(function (x) { return [first, x]; });
      return pairs.concat(createFixtures(rest));
    }

    let fixtureList = createFixtures(teams);
    randomisedFixtureList = fixtureList.sort(function(a, b){return 0.5 - Math.random()});

    this.state = {
      teams: teams,
      randomisedFixtureList: randomisedFixtureList
    }
  }

  render() {
    return (
      <div className="App">
        <ResultsForm teams={this.state.teams} fixtures={this.state.randomisedFixtureList} />
      </div>
    );
  }
}



let homeTeamName, awayTeamName;

class ResultsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {props};
    this.showScore = this.showScore.bind(this);
    this.determineResult = this.determineResult.bind(this);
    this.allocatePoints = this.allocatePoints.bind(this);
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
    this.determineResult(homeTeam, awayTeam, fixture);
  }


  determineResult(homeTeamName, awayTeamName, fixture) {
    let winner;
    let loser;

    if(fixture.homeGoals > fixture.awayGoals){
      winner = homeTeamName;
      loser = awayTeamName;
    } else if (fixture.homeGoals < fixture.awayGoals) {
      winner = awayTeamName;
      loser = homeTeamName
    } else {
      winner = null;
    }
    const result = {
      fixture,
      winner,
      loser,
    }
    this.setState({result : result});
    this.allocatePoints(winner, loser, homeTeamName, awayTeamName);
    return result;
  }

  allocatePoints(winner, loser, homeTeamName, awayTeamName) {
    let homeIndex = this.props.teams.map(function(e) { return e.name; }).indexOf(homeTeamName)
    let awayIndex = this.props.teams.map(function(e) { return e.name; }).indexOf(awayTeamName)
    let indexOfWinner = this.props.teams.map(function(e) { return e.name; }).indexOf(winner)
    let indexOfLoser = this.props.teams.map(function(e) { return e.name; }).indexOf(loser)
    this.props.teams[homeIndex].played += 1;
    this.props.teams[awayIndex].played += 1;

    if(winner === null) {
      this.props.teams[homeIndex].points += 1;
      this.props.teams[homeIndex].draws += 1;
      this.props.teams[awayIndex].points += 1;
      this.props.teams[awayIndex].draws += 1;
    } else {
      this.props.teams[indexOfWinner].points += 3;
      this.props.teams[indexOfWinner].wins += 1;
      this.props.teams[indexOfLoser].losses += 1;
    }
  }

  render() {
    return (
      <div>
        <div>
          <League teams={this.props.teams} />
        </div>
        <div>
          <Winner result = {this.state.result}/>
        </div>
        {this.props.fixtures.map((fixture, i) =>
          <form className={i} key={"fixture" + i} ref="fixture" onSubmit={this.showScore} name={`fixture-${i}`} >
            <label>
              {homeTeamName = this.props.fixtures[i][0].name}:
              <input type="text"
                className="homeGoals"
                ref={homeTeamName}
                value={this.state.scoreOne}
                name={homeTeamName}
              />
            </label>
            <label>
              {awayTeamName = this.props.fixtures[i][1].name}:
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


class Winner extends Component {
  render() {
    if (!this.props.result) {
      console.log('no prop value');
      return null;
    } else {
      const winner = (this.props.result).winner;

      if(winner === null){
        return (
          <div>
            <p>
              The result is a draw
            </p>
          </div>
        )
      }
      return (
        <div>
          <p>
            {"The winner is " + winner}
          </p>
        </div>
      );
    }
  }
}



class League extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: this.props.teams
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.teams !== this.props.teams) {
      this.setState({
        teams: this.props.teams
      });
    }
  }

  render() {
    return (
      <table className="leagueTable" key="leagueTable">
        <thead>
          <tr>
            <th key="nameColumn">Name</th>
            <th key="playedColumn">Played</th>
            <th key="winsColumn">Wins</th>
            <th key="lossesColumn">Losses</th>
            <th key="drawsColumn">Draws</th>
            <th key="pointsColumn">Points</th>
          </tr>
        </thead>
        <tbody>
          {this.props.teams.map((team, i) =>
            <tr className="rows">
              <td className="Team Name" name="name" id={"name" + i} key={team.name + "name"}>
                {this.props.teams[i].name}
              </td>
              <td className="Played" name="played" id={"played" + i} key={team.name + "played"}>
                {this.props.teams[i].played}
              </td>
              <td className="Team Wins" name="wins" id={"wins" + i} key={team.name + "wins"}>
                {this.props.teams[i].wins}
              </td>
              <td className="Team Losses" name="losses" id={"losses" + i} key={team.name + "losses"}>
                {this.props.teams[i].losses}
              </td>
              <td className="Team Draws" name="draws" id={"draws" + i} key={team.name + "draws"}>
                {this.props.teams[i].draws}
              </td>
              <td className="Team Points" name="points" id={"points" + i} key={team.points + "points"}>
                {this.props.teams[i].points}
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


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Welcome name="Premier League" />
//         <League teams={teams} />
//         <ResultsForm fixtures={randomisedFixtureList}/>
//       </div>
//     )
//   }
// }

export default App;
