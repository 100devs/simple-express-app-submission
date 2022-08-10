import classes from './NewTimeForm.module.css'
import Modal from '../UI/Modal';
import useInput from '../../hooks/use-input'

const NewTimeForm = (props) => {
  //TODO: 
  // - Create method to check if App state has values for curGame, and curTrack
  //    If so then run a method that will run 'gameInputChangeHandler' and 'trackInputChangeHandler'
  //    These two methods should accept the values for curGame and curTrack respectively
  //    This should load the form with the current game and track already filled
  // - Receive curGame via props
  // - Receive curTrack via props

  const { // game input management and validation
    value: gameInputValue, // 
    isValid: gameInputIsValid,
    hasError: gameInputHasError,
    updateValue: gameInputChangeHandler,
    updateTouched: gameInputTouchHandler,
    reset: resetGameInput
  } = useInput(value => {
    // Game input validitation method
    //   - cannot have spaces (use '_' instead)
    //   - must be lowercase
    let doesNotHaveSpaces = false;
    let isLowerCase = false;

    if(value.indexOf(' ') < 0){
      doesNotHaveSpaces = true;
    }

    if(value === value.toLowerCase()){
      isLowerCase = true;
    }
    return doesNotHaveSpaces && isLowerCase;
  });

  const { // track input management and validation
    value: trackInputValue, // 
    isValid: trackInputIsValid,
    hasError: trackInputHasError,
    updateValue: trackInputChangeHandler,
    updateTouched: trackInputTouchHandler,
    reset: resetTrackInput
  } = useInput(value => {
    // Track input validation method
    //   - cannot have spaces (use '_' instead)
    //   - must be lowercase
    let doesNotHaveSpaces = false;
    let isLowerCase = false;

    if (value.indexOf(' ') < 0) {
      doesNotHaveSpaces = true;
    }

    if (value === value.toLowerCase()) {
      isLowerCase = true;
    }
    return doesNotHaveSpaces && isLowerCase;
  });

  const { // driver input management and validation
    value: driverInputValue, // 
    isValid: driverInputIsValid,
    hasError: driverInputHasError,
    updateValue:driverInputChangeHandler,
    updateTouched: driverInputTouchHandler,
    reset: resetDriverInput
  } = useInput(value => {
    // Driver input validation method
    //   - should have length of 3
    //   - Only contains letters in english alphabet
    //   - must be capital
    
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    // Chars are valid checks that letters are in english alphabet AND are capital because of key
    const charsAreValid = value.split('').reduce((acc, letter) => validChars.includes(letter) && acc === true ? acc : false, true)
    const lengthIsValid = value.length === 3

    return charsAreValid && lengthIsValid
  });

  const { // time input management and validation
    value: timeInputValue, // 
    isValid: timeInputIsValid,
    hasError: timeInputHasError,
    updateValue: timeInputChangeHandler,
    updateTouched: timeInputTouchHandler,
    reset: resetTimeInput
  } = useInput(value => {
    // Time input validation method
    //  - Check if given in seconds or as string
    //  - String checks:
    //    - Minutes must be positive
    //    - Seconds must be positive and greater than 0
    //      - seconds should be fixed to three decimals
    //  
    let minutesAreValid = true;
    let secondsAreValid = true;

    // If ':' is in string then validate string form
    if(value.indexOf(':') > -1){
      // Valid string '1:23.456'
      let splitVal = value.split(':')
      if(splitVal.length !== 2){
        minutesAreValid = false;
        secondsAreValid = false;
      }

      let [minutes, seconds] = splitVal
      minutes = Number(minutes)
      seconds = Number(seconds)
      if (minutes < 0) {
        minutesAreValid = false
      }
      if(seconds < 0 || seconds > 60){
        secondsAreValid = false
      }
    } else{
      minutesAreValid = true
      // Find out if value can convert to a number, if not then secondsAreValid = false
      if(isNaN(value)){
        secondsAreValid = false
      }
    }

    return minutesAreValid && secondsAreValid
  });

  const { // car input management and validation
    value: carInputValue, // 
    isValid: carInputIsValid,
    hasError: carInputHasError,
    updateValue: carInputChangeHandler,
    updateTouched: carInputTouchHandler,
    reset: resetCarInput
  } = useInput(value => {
    
    return typeof value === 'string' || value === ''
  });


  // Initially form is invalid since no input
  let formIsValid = false;
  // After each state change these values will be re-evaluated and confirm the form validity
  if(gameInputIsValid && trackInputIsValid && driverInputIsValid && timeInputIsValid && carInputIsValid){
    formIsValid = true
  }

  // Check form validity and submit to api
  const submitTimeHandler = async (e) => {
    e.preventDefault()
    
    if(!formIsValid){
      // Form is not valid, do not continue with submission
      return;
    }

    // Log form input to console
    console.log(`Game: ${gameInputValue}`)
    console.log(`Track: ${trackInputValue}`)
    console.log(`Driver: ${driverInputValue}`)
    console.log(`Time: ${timeInputValue}`)
    console.log(`Car: ${carInputValue}`)

    // Bundle form data and make a post request
    // Create url with the input game and track
    const url = `/api/${gameInputValue}/${trackInputValue}`
    const leaderboardData = {
      driverInitial: driverInputValue,
      time: timeInputValue,
      car: carInputValue
    }

    // Post results
    await fetch(url, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leaderboardData)
    })
      .then(response => response)
      .catch(error => {console.log(error)})

    // Refetch leaderbaord
    const newLeaderboard = await fetch(url)
      .then(response => response.json())
      .then(data => data)
    
    // Submit new leaderboard data to <App> to update the current state
    props.updateLeaderboard(newLeaderboard)

    // Reset form inputs
    resetGameInput()
    resetTrackInput()
    resetDriverInput()
    resetTimeInput()
    resetCarInput()

    // Hide form
    props.onHideForm()
  }

  // Apply error classes based on form state
  let gameInputClassList = !gameInputHasError ?
    `${classes['form-control']}` :
    `${classes['form-control']} ${classes.invalid}`
  
  let trackInputClassList = !trackInputHasError ?
    `${classes['form-control']}` :
    `${classes['form-control']} ${classes.invalid}`

  let driverInputClassList = !driverInputHasError ?
    `${classes['form-control']}` :
    `${classes['form-control']} ${classes.invalid}`

  let timeInputClassList = !timeInputHasError ?
    `${classes['form-control']}` :
    `${classes['form-control']} ${classes.invalid}`

  let carInputClassList = !carInputHasError ?
    `${classes['form-control']}` :
    `${classes['form-control']} ${classes.invalid}`

  

  // Within form define modal content
  //  This is the form itself with the labels and inputs
  //    - Game: Check if curGame exists and if not then leave input empty (may need a function to fetch that value from app)
  //            For a quick solution this can be left empty and require user input
  //    - Track: Check if curTrack exists and if not then laeve input empty (may need a function to fetch that value from app)
  //            For a quick solutoin this can be left empty and require user input
  //    - DriverName: 3 Letter uppercase initial from driver (validate this before sending)
  //    - Time: should be able to submit in either format '1:23.456' (str) || 83.456 (num)

  const modalContent = (
    <form onSubmit={submitTimeHandler} autoComplete='off'>
      <div className={classes['control-group']}>
        {/* Game input */}
        <div className={gameInputClassList}>
          <label htmlFor='gameInput'>Game:</label>
          <input 
            type='text' 
            id='gameInput' 
            onChange={gameInputChangeHandler}
            onBlur={gameInputTouchHandler}
            value={gameInputValue}
          />
        </div>
        {/* Display error message for game */}
        {gameInputHasError && <p className={classes['error-text']}>Game cannot have spaces (use '_' instead) and must be lowercase</p>}
        {/* Track input */}
        <div className={trackInputClassList}>
          <label htmlFor='trackInput'>Track:</label>
          <input
            type='text'
            id='trackInput'
            onChange={trackInputChangeHandler}
            onBlur={trackInputTouchHandler}
            value={trackInputValue}
          />
        </div>
        {/* Display error message for track */}
        {trackInputHasError && <p className={classes['error-text']}>Track cannot have spaces (use '_' instead) and must be lowercase</p>}
        {/* Driver input */}
        <div className={driverInputClassList}>
          <label htmlFor='driverInput'>Driver Initials:</label>
          <input
            type='text'
            id='driverInput'
            onChange={driverInputChangeHandler}
            onBlur={driverInputTouchHandler}
            value={driverInputValue}
          />
        </div>
        {/* Display error message for driver */}
        {driverInputHasError && <p className={classes['error-text']}>Driver initials should be three capital letters</p>}
        {/* Time input */}
        <div className={timeInputClassList}>
          <label htmlFor='timeInput'>Time:</label>
          <input
            type='text'
            id='timeInput'
            onChange={timeInputChangeHandler}
            onBlur={timeInputTouchHandler}
            value={timeInputValue}
          />
        </div>
        {/* Display error message for time */}
        {timeInputHasError && <p className={classes['error-text']}>Time should be in one of the following formats:
          <br/>- Minutes: '1:23.456'
          <br />- Seconds: '83.456'</p>}
        {/* Car input */}
        <div className={carInputClassList}>
          <label htmlFor='carInput'>Car:</label>
          <input
            type='text'
            id='carInput'
            onChange={carInputChangeHandler}
            onBlur={carInputTouchHandler}
            value={carInputValue}
          />
        </div>
        {/* Display error message for game */}
        {carInputHasError && <p className={classes['error-text']}>This should just be a string</p>}
      </div>
      <div className={classes['form-actions']}>
        <button disabled={!formIsValid}>Submit</button>
        <button onClick={props.onHideForm}>Close</button>
      </div>
    </form>
  
  )
  //  Within form return the modal with any props needed such as 'hideFormHandler
  return (
    <Modal onHideForm={props.onHideForm}>
      {modalContent}
    </Modal>
  )
}

export default NewTimeForm