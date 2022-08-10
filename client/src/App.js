import { useEffect, useState } from 'react';
import './App.css';
import MainHeader from './Components/MainHeader/MainHeader';
import Card from './Components/UI/Card.jsx';
import PickList from './Components/PickList/PickList';
import ResultList from './Components/ResultList/ResultList';
import NewTimeForm from './Components/NewTimeForm/NewTimeForm';

function App() {
  const [showForm, setShowForm] = useState(false)
  const [gameData, setGameData] = useState({type: null, data:[]});
  const [curGame, setCurGame] = useState();
  const [curTrack, setCurTrack] = useState();
  
  // Stuff to do on initial page load...
  useEffect(() => {
    // Initial fetch to get list of games
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        // console.log(data) // Log initial fetch request
        setGameData({
          type: 'game',
          data
        })
      })
      .catch(error => console.log(error));
  }, []);

  const setGameList = async () => {
    // Initial fetch to get list of games
    await fetch('/api')
      .then(response => response.json())
      .then(data => {
        // console.log(data) // Log initial fetch request
        setGameData({
          type: 'game',
          data
        })
        setCurGame(undefined)
        setCurTrack(undefined)
      })
      .catch(error => console.log(error));
  }

  // const setTrackList = async (game) => {
  //   await fetch(`/api/${game}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setGameData({
  //         type: 'track',
  //         data
  //       })
  //       setCurGame(game)
  //       setCurTrack(undefined);
  //     })
  // }

  // Fetch Data and update state to reflect fetched data and what kind of data is being stored
  const fetchData = async (itemName, itemType) => {
    // Build a fetch url string based on the selected
    let url = `/api`
    if(itemType === 'game'){
      url += `/${itemName}`
    } else if(itemType === 'track'){
      url += `/${curGame}`
      url += `/${itemName}`
    }

    // console.log(url);
    let fetchedData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data)

    // Update state
    const newGameDataType = itemType === 'game' ? 'track' : 'result';
    const newGameData = fetchedData;
    
    // gameData needs to hold fetched tracks or time data (whatever was fetched)
    // gameData needs to be updated to what type of data it is holding
    setGameData({ type: newGameDataType, data: newGameData })
    
    // if a game was selected curGame needs updated
    if(itemType === 'game'){
      setCurGame(itemName);
    } else if(itemType === 'track'){ 
      // if a track was selected then curTrack needs updated
      setCurTrack(itemName)
    }
  }

  const fetchPrevious = async () => {
    // If on games listing, do nothing there is no previous page
    // TODO: introduce state and method to hide the button completely when on games listing so this shouldn't be triggered
    if(gameData.type === 'game' && curGame === undefined && curTrack === undefined){
      console.log('On games listing...')
      return
    } else if(gameData.type === 'track' && curGame !== undefined && curTrack === undefined){
      // If on track listing, re-fetch games data (root fetch route), then update state with results
      console.log(`On tracks listing for ${curGame}...`)
      // Initial fetch to get list of games
      await setGameList()
    } else if(gameData.type === 'result' && curGame !== undefined && curTrack !== undefined){
      // If on a results listing, refetch track data (note curGame and build route with it), update state with results
      console.log(`On results listing for ${curGame}/${curTrack}`)
      return
    }

    
  }

  const updateLeaderboard = (newLeaderboard) => {
    // set gameData to new leaderboard data
    setGameData({type: 'result', data: {game: newLeaderboard.game, track: newLeaderboard.track, leaderboard: newLeaderboard.leaderboard}})
    setCurGame(newLeaderboard.game)
    setCurTrack(newLeaderboard.track)
  }

  const onHideForm = () => { 
    setShowForm(false);
  }

  const onShowForm = () => {
    setShowForm(true);
  }
  // Determine content to show
  const content = gameData.type === 'game' || gameData.type === 'track' ?
    <PickList
      list={gameData}
      fetchListItem={(itemName, itemType) => fetchData(itemName, itemType)}
    /> :
    <ResultList list={gameData} showForm={onShowForm}/>

  // console.log(gameData)
  return (
    <div className="App">
      {showForm && <NewTimeForm onHideForm={onHideForm} curGame={curGame} curTrack={curTrack} updateLeaderboard={updateLeaderboard}/>}
      <MainHeader titleClick={setGameList} showForm={onShowForm} fetchPrevious={fetchPrevious}/>
      <Card showform={onShowForm}>
        {
          gameData.data.length === 0 ? 
            <p><span>Loading...</span></p> : 
            content
        }
      </Card>
      
    </div>
  );
}

export default App;
