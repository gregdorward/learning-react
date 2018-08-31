import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';


class App extends React.Component {
  constructor() {
    super();

    function FootballTeam(name, played, wins, draws, losses, goalsFor, goalsAgainst, goalDifference) {
      let points = 0;
      this.name = name;
      this.played = played;
      this.wins = wins;
      this.losses = losses;
      this.draws = draws
      this.points = points;
      this.goalsFor = goalsFor;
      this.goalsAgainst = goalsAgainst;
      this.goalDifference= goalDifference;
    }

    let teams = [];

    const team = new FootballTeam('Man United', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamTwo = new FootballTeam('Man City', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamThree = new FootballTeam('Liverpool', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamFour = new FootballTeam('Chelsea', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamFive = new FootballTeam('Arsenal', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamSix = new FootballTeam('Tottenham', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamSeven = new FootballTeam('Burnley', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamEight = new FootballTeam('Southampton', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamNine = new FootballTeam('Cardiff', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamTen = new FootballTeam('Huddersfield', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamEleven = new FootballTeam('Wolves', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamTwelve = new FootballTeam('Fulham', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamThirteen = new FootballTeam('Watford', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamFourteen = new FootballTeam('Bournemouth', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamFifteen = new FootballTeam('Leicester', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamSixteen = new FootballTeam('Everton', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamSeventeen = new FootballTeam('Crystal Palace', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamEighteen = new FootballTeam('Brighton', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamNineteen = new FootballTeam('Newcastle', 0, 0, 0, 0, 0, 0, 0, 0);
    const teamTwenty = new FootballTeam('West Ham', 0, 0, 0, 0, 0, 0, 0);

    teams.push(team, teamTwo, teamThree, teamFour, teamFive, teamSix, teamSeven, teamEight, teamNine, teamTen, teamEleven, teamTwelve, teamThirteen, teamFourteen, teamFifteen, teamSixteen, teamSeventeen, teamEighteen, teamNineteen, teamTwenty);


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
    let homeGoals = fixture.homeGoals;
    let awayGoals = fixture.awayGoals;


    if(homeGoals > awayGoals){
      winner = homeTeamName;
      loser = awayTeamName;
    } else if (homeGoals < awayGoals) {
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
    this.allocatePoints(winner, loser, homeTeamName, awayTeamName, homeGoals, awayGoals);
    return result;
  }

  allocatePoints(winner, loser, homeTeamName, awayTeamName, homeGoals, awayGoals) {
    let homeIndex = this.props.teams.map(function(e) { return e.name; }).indexOf(homeTeamName)
    let awayIndex = this.props.teams.map(function(e) { return e.name; }).indexOf(awayTeamName)
    let indexOfWinner = this.props.teams.map(function(e) { return e.name; }).indexOf(winner)
    let indexOfLoser = this.props.teams.map(function(e) { return e.name; }).indexOf(loser)
    this.homeGoals = homeGoals.value;
    this.awayGoals = awayGoals.value;
    console.log(homeGoals);
    console.log(awayGoals);


    this.props.teams[homeIndex].played += 1;
    this.props.teams[awayIndex].played += 1;
    this.props.teams[homeIndex].goalsFor += parseInt(homeGoals);
    this.props.teams[homeIndex].goalsAgainst += parseInt(awayGoals);
    this.props.teams[awayIndex].goalsFor += parseInt(awayGoals);
    this.props.teams[awayIndex].goalsAgainst += parseInt(homeGoals);
    this.props.teams[homeIndex].goalDifference += (parseInt(homeGoals) - parseInt(awayGoals));
    this.props.teams[awayIndex].goalDifference += (parseInt(awayGoals) - parseInt(homeGoals));



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
        <div className="winnerContainer">
          <Winner result = {this.state.result} />
        </div>
        <div className="fixtureList">
        {this.props.fixtures.map((fixture, i) =>
          <form className="fixture" key={"fixture" + i} ref="fixture" onSubmit={this.showScore} name={`fixture-${i}`} >
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
            <input ref={btn => { this.btn = btn }} type="submit" value="Submit"/>
          </form>
        )}
        </div>
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
          <p className="winner">
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
      let teamsArray = this.props.teams.sort
      (
        function (a, b) { return b.points - a.points || b.goalDifference - a.goalDifference}
      );

    return (
      <div className="container">
      <table key="leagueTable" className="item">
        <thead>
          <tr>
            <th key="positionColumn">Position</th>
            <th key="nameColumn">Name</th>
            <th key="playedColumn">Played</th>
            <th key="winsColumn">Wins</th>
            <th key="lossesColumn">Losses</th>
            <th key="drawsColumn">Draws</th>
            <th key="goalsForColumn">GF</th>
            <th key="goalsAgainstColumn">GA</th>
            <th key="goalDifferenceColumn">GD</th>
            <th key="pointsColumn">Points</th>
          </tr>
        </thead>
        <tbody>
          {teamsArray.map((team, i) =>
            <tr className={"row" + i}>
              <td className="Position" name="position" id={"position" + i} key={team.name + "position"}>
                {i + 1}
              </td>
              <td className="TeamName" name="name" id={"name" + i} key={team.name + "name"}>
                {teamsArray[i].name}
              </td>
              <td className="Played" name="played" id={"played" + i} key={team.name + "played"}>
                {teamsArray[i].played}
              </td>
              <td className="TeamWins" name="wins" id={"wins" + i} key={team.name + "wins"}>
                {teamsArray[i].wins}
              </td>
              <td className="TeamLosses" name="losses" id={"losses" + i} key={team.name + "losses"}>
                {teamsArray[i].losses}
              </td>
              <td className="TeamDraws" name="draws" id={"draws" + i} key={team.name + "draws"}>
                {teamsArray[i].draws}
              </td>
              <td className="GoalsFor" name="for" id={"for" + i} key={team.name + "goalsFor"}>
                {teamsArray[i].goalsFor}
              </td>
              <td className="GoalsAgainst" name="against" id={"against" + i} key={team.name + "goalsAgainst"}>
                {teamsArray[i].goalsAgainst}
              </td>
              <td className="GoalDifference" name="difference" id={"difference" + i} key={team.name + "difference"}>
                {teamsArray[i].goalDifference}
              </td>
              <td className="TeamPoints" name="points" id={"points" + i} key={team.points + "points"}>
                {teamsArray[i].points}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div>
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
