import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {boardSchemat} from "./SetShips/boardSchemat";
import {getLocalStorage, setLocalStorage} from "../../utils/localStorage"
import {
	Board,
	Fleet,
	Results,
	Parameters,
	Player,
	StateOfPlayers, SettingShips
} from "../../types/types";
import {RootState} from "../../config/store"

interface ShipGameState {
	state: "home" | "playGame";
	parameters: Parameters;
	activePlayer: Player;
	firstPlayer: StateOfPlayers;
	secondPlayer: StateOfPlayers;
	settingShips: SettingShips;
	winner: Player;
}

const stateOfPlayers: StateOfPlayers = {
	board: boardSchemat(),
	boardToShots: boardSchemat(),
	fleet: {},
	numberOfShips: 0,
	numberOfShots: 0,
	target: null,
	shotInCell: null,
};

const parameters: Parameters = {
	gameMode: "compVsPlayer",
	difficultyLevel: "easy",
	numberOfShips: 5,
	numberOfShots: 1,
	shotsEqualShips: false,
	mayTouch: false,
	bonus: false,
	sound: true,
	notStandardShips: false,
};

const getInitialParameters = (): Parameters => {
	const storedParams = getLocalStorage("parameters");
	return storedParams && typeof storedParams === "object"
		? {...parameters, ...storedParams}
		: {...parameters};
};

const getInitialState = (): ShipGameState => ({
	state: "home",
	parameters: getInitialParameters(),
	activePlayer: null,
	firstPlayer: {...stateOfPlayers},
	secondPlayer: {...stateOfPlayers},
	settingShips: {
		selectedShip: {number: null, ship: []},
		changeShipPlace: null,
		lockedMoves: {},
		wrongSettingOfShips: false,
		approvedSetting: true,
	},
	winner: null,
});

export const shipGameSlice = createSlice({
	name: "shipGame",
	initialState: getInitialState(),
	reducers:
		{
			setState: (state, action: PayloadAction<ShipGameState["state"]>) => {
				state.state = action.payload;
			},
			setParameters: (state, action: PayloadAction<Partial<Parameters>>) => {
				state.parameters = {
					...state.parameters,
					...action.payload,
				};
				setLocalStorage("parameters", state.parameters);
			},
			setShips: (state) => {
				const numberOfShips = state.parameters.numberOfShips;
				state.firstPlayer = {
					...state.firstPlayer, numberOfShips
				};
				state.secondPlayer = {
					...state.secondPlayer, numberOfShips
				};
				state.settingShips.approvedSetting = true;
			},
			setActivePlayer: (state, action: PayloadAction<Player>) => {
				state.activePlayer = action.payload;
				state.firstPlayer.target = null;
				state.firstPlayer.shotInCell = null;
				state.secondPlayer.target = null;
				state.secondPlayer.shotInCell = null;
			},
			setBoardForFirstPlayer: (state, action: PayloadAction<Board>) => {
				state.firstPlayer.board = action.payload;
			},
			setBoardForSecondPlayer: (state, action: PayloadAction<Board>) => {
				state.secondPlayer.board = action.payload;
			},
			setBoardForPlayerShots: (state, action: PayloadAction<Board>) => {
				if (state.activePlayer === null) return;
				state[state.activePlayer].boardToShots = action.payload;
			},
			setFleetForFirstPlayer: (state, action: PayloadAction<Fleet>) => {
				state.firstPlayer.fleet = action.payload;
			},
			setFleetForSecondPlayer: (state, action: PayloadAction<Fleet>) => {
				state.secondPlayer.fleet = action.payload;
			},
			setNumberOfShips: (state, action: PayloadAction<number>) => {
				if (state.activePlayer === "firstPlayer") state["secondPlayer"].numberOfShips = action.payload;
				if (state.activePlayer === "secondPlayer") state["firstPlayer"].numberOfShips = action.payload;
			},
			setTarget: (state, action: PayloadAction<{ target: StateOfPlayers["target"], player: Player }>) => {
				if (action.payload.player !== state.activePlayer || state.activePlayer === null ||
					action.payload.player === null) return;
				state[state.activePlayer].target = action.payload.target;
			},
			setShot: (state, action: PayloadAction<{ shotInCell: StateOfPlayers["target"], player: Player }>) => {
				if (action.payload.player !== state.activePlayer || state.activePlayer === null) return;
				state[state.activePlayer].shotInCell = action.payload.shotInCell;
			},
			subtractShot: (state) => {
				if (state.activePlayer === null) return;
				const player = state[state.activePlayer];
				if (player.numberOfShots === null) return;
				if (player.numberOfShots > 0) player.numberOfShots--;
			},
			setNumberOfShots: (state) => {
				if (state.activePlayer === null) return;
				if (state.parameters.shotsEqualShips) {
					state[state.activePlayer].numberOfShots = state[state.activePlayer].numberOfShips;
				} else {
					state[state.activePlayer].numberOfShots = state.parameters.numberOfShots;
				}
			},
			setShipSelectedNumber:
				(state, action: PayloadAction<{
					number: SettingShips["selectedShip"]["number"]
					approvedSetting: SettingShips["approvedSetting"]
				}>) => {
					state.settingShips.selectedShip.number = action.payload.approvedSetting ? null : action.payload.number;
					state.settingShips.approvedSetting = action.payload.approvedSetting;
				},
			setSelectedShip: (state, action: PayloadAction<SettingShips["selectedShip"]["ship"]>) => {
				state.settingShips.selectedShip.ship = action.payload;
			},
			setChangeShipPlace: (state, action: PayloadAction<SettingShips["changeShipPlace"]>) => {
				state.settingShips.approvedSetting = false;
				state.settingShips.changeShipPlace = action.payload
			},
			setLockedMoves: (state, action: PayloadAction<SettingShips["lockedMoves"]>) => {
				state.settingShips.lockedMoves = {...state.settingShips.lockedMoves, ...action.payload};
			},
			setWrongSettingOfShips: (state, action: PayloadAction<SettingShips["wrongSettingOfShips"]>) => {
				state.settingShips.wrongSettingOfShips = action.payload
			},
			setClearBoard: () => getInitialState(),
			clearAfterShot: (state) => {
				state.firstPlayer.target = null;
				state.firstPlayer.shotInCell = null;
				state.secondPlayer.target = null;
				state.secondPlayer.shotInCell = null;
			},
			setWinner: (state, action: PayloadAction<ShipGameState["winner"]>) => {
				state.winner = action.payload;
				if (
					state.parameters.gameMode === "compVsComp" || !action.payload) return;
				const results: Results | null = getLocalStorage("results");
				if (action.payload === "firstPlayer") setLocalStorage("results",
					{...results, wygrana: results?.wygrana ? ++results.wygrana : 1}
				);
				if (action.payload === "secondPlayer") setLocalStorage("results",
					{...results, przegrana: results?.przegrana ? ++results.przegrana : 1}
				);
			},
		}
});

export const {
	setState,
	setParameters,
	setActivePlayer,
	setBoardForFirstPlayer,
	setBoardForSecondPlayer,
	setBoardForPlayerShots,
	setFleetForFirstPlayer,
	setFleetForSecondPlayer,
	setNumberOfShips,
	setShips,
	setTarget,
	setShot,
	subtractShot,
	setNumberOfShots,
	setShipSelectedNumber,
	setSelectedShip,
	setChangeShipPlace,
	setLockedMoves,
	setWrongSettingOfShips,
	setClearBoard,
	clearAfterShot,
	setWinner,
}
	= shipGameSlice.actions;

export const selectPlayState = (state: RootState): ShipGameState => state.shipGame as ShipGameState;

export const selectState = (state: RootState) => selectPlayState(state).state;

export const selectParameters = (state: RootState) => selectPlayState(state).parameters;
export const selectGameMode = (state: RootState) => selectParameters(state).gameMode;
export const selectDifficultyLevel = (state: RootState) => selectParameters(state).difficultyLevel;
export const selectNumberOfShips = (state: RootState) => selectParameters(state).numberOfShips;
export const selectNumberOfShots = (state: RootState) => selectParameters(state).numberOfShots;
export const selectMayTouch = (state: RootState) => selectParameters(state).mayTouch;
export const selectBonus = (state: RootState) => selectParameters(state).bonus;
export const selectShotsEqualShips = (state: RootState) => selectParameters(state).shotsEqualShips;
export const selectSound = (state: RootState) => selectParameters(state).sound;
export const selectNotStandardShips = (state: RootState) => selectParameters(state).notStandardShips;

export const selectActivePlayer = (state: RootState) => selectPlayState(state).activePlayer;

export const selectFirstPlayer = (state: RootState) => selectPlayState(state).firstPlayer;
export const selectFirstPlayerBoard = (state: RootState) => selectFirstPlayer(state).board;
export const selectFirstPlayerBoardToShots = (state: RootState) => selectFirstPlayer(state).boardToShots;
export const selectFirstPlayerTarget = (state: RootState) => selectFirstPlayer(state).target;
export const selectFirstPlayerShotInCell = (state: RootState) => selectFirstPlayer(state).shotInCell;
export const selectFirstPlayerFleet = (state: RootState) => selectFirstPlayer(state).fleet;
export const selectFirstPlayerNumberOfShots = (state: RootState) => selectFirstPlayer(state).numberOfShots;

export const selectSecondPlayer = (state: RootState) => selectPlayState(state).secondPlayer;
export const selectSecondPlayerBoard = (state: RootState) => selectSecondPlayer(state).board;
export const selectSecondPlayerBoardToShots = (state: RootState) => selectSecondPlayer(state).boardToShots;
export const selectSecondPlayerTarget = (state: RootState) => selectSecondPlayer(state).target;
export const selectSecondPlayerShotInCell = (state: RootState) => selectSecondPlayer(state).shotInCell;
export const selectSecondPlayerFleet = (state: RootState) => selectSecondPlayer(state).fleet;
export const selectSecondPlayerNumberOfShots = (state: RootState) => selectSecondPlayer(state).numberOfShots;

export const selectSettingShips = (state: RootState) => selectPlayState(state).settingShips;
export const selectSelected = (state: RootState) => selectSettingShips(state).selectedShip;
export const selectSelectedShip = (state: RootState) => selectSelected(state).ship;
export const selectChangeShipPlace = (state: RootState) => selectSettingShips(state).changeShipPlace;
export const selectLockedMoves = (state: RootState) => selectSettingShips(state).lockedMoves;
export const selectWrongSettingOfShips = (state: RootState) => selectSettingShips(state).wrongSettingOfShips;
export const selectApprovedSetting = (state: RootState) => selectSettingShips(state).approvedSetting;

export const selectWinner = (state: RootState) => selectPlayState(state).winner;

export default shipGameSlice.reducer;