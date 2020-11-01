import TopLevelComponent from './components/TopLevel.component.js'
import MyTeamComponent from './components/pages/MyTeam.component.js'
import LinkComponent from './components/Link.component.js'
import AddPlayersComponent from './components/pages/AddPlayers.component.js'
import ScoresComponent from './components/pages/Scores.component.js'
import LeagueComponent from './components/pages/League.component.js'
import DraftBoardComponent from './components/pages/DraftBoard.component.js'
import GridComponent from './components/Grid.component.js'
import GridActionButtonComponent from './components/GridActionButton.component.js'

/*
 * This is where various components we define should be registered.
 * Once they are listed here, they will be automatically loaded by Vue.js.
 */
export default {
    LinkComponent,
    TopLevelComponent,
    MyTeamComponent,
    AddPlayersComponent,
    ScoresComponent,
    LeagueComponent,
    DraftBoardComponent,
    GridComponent,
    GridActionButtonComponent,
}
