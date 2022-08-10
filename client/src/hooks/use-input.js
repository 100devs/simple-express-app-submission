import { useReducer } from 'react'

// Example Usage:
// 1. import in component needed: 
//        `import useInputAlt from "../hooks/use-input.js";`
// 2. Initialize each input by calling hook, 
//    passing in a function that checks the input and returns a bool,
//    and capturing each return in an object 
//      ```
//      const { // input management and validation
//        value: inputValue, // 
//        isValid: inputIsValid,
//        hasError: inputHasError,
//        updateValue: inputChangeHandler,
//        updateTouched: inputTouchHandler,
//        reset: resetInput
//      } = useInputAlt(value => value.length > 0);
//      ```
// 3. Include a form validation in your component to check each input that was created
//      ```
//      let formIsValid = false;
//      if (inputIsValid) {
//        formIsValid = true;
//      }
//      ```
// 4. Use form handler to check form validity and handle data
//    Reset 
//      ```
//      const formSubmissionHandler = (event) => { 
//        event.preventDefault();
//
///        //If form is not valid, exit handler; do not submit
//        if (!formIsValid) {
//          return;
//        }
//
//        // output current result if form is valid
//        console.log(`Input: ${inputValue}`);
//
//        // reset input fields
//        resetInput();
//      }
//      ```
// 5. Apply error classes classes based on error state
//      ```
//      let inputClassList = !inputHasError ?
//        'form-control' :
//        'form-control invalid';
//      ```
// 6. Create form with input, include check for error that displays error text
//      ```
//        <form>
//          <div className={inputClassList}>
//            <label htmlfor='input'>Input:</label>
//            <input id='input' type='text' onChange={inputChangeHandler} onBlur={inputTouchHandler} value={inputValue}></input>
//          </div>
//          { inputHasError && <p className='error-text'>INSERT INPUT ERROR TEXT HERE</p>}
//        </form>
//      ```
const initialInputState = {
  value: '',
  isTouched: false
};

const inputStateReducer = (state, action) => {
  if (action.type === 'UPDATE_VALUE') {
    // update value with value from input field
    return { value: action.value, isTouched: state.isTouched }
  }

  if (action.type === 'UPDATE_TOUCHED') {
    // Mark isTouched as true (user has selected input and left)
    return { isTouched: true, value: state.value }
  }

  if (action.type === 'RESET') {
    // reset state values
    return initialInputState
  }

  return initialInputState;
};

const useInput = (validateValue) => {

  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  // Is the input valid
  const isValid = validateValue(inputState.value);
  // Is the input invalid AND the user has touched the input box
  const hasError = !isValid && inputState.isTouched;

  // Update value state (onChange)
  const updateValue = (event) => {
    dispatch({ type: 'UPDATE_VALUE', value: event.target.value });
  }

  // Mark touched after input is selected (onBlur)
  const updateTouched = () => {
    dispatch({ type: 'UPDATE_TOUCHED', value: true });
  }

  const reset = () => {
    dispatch({ type: 'RESET' });
  }

  return {
    value: inputState.value,
    isValid,
    hasError,
    updateValue,
    updateTouched,
    reset,
  }


}

export default useInput