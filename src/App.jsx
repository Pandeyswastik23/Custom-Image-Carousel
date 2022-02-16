import React, { useState } from 'react';
import { Slider } from './components/slider';
import './App.css';

let currentIndex = 0;
var interval;
function App ()
{
  const [ dataEnv, setDataEnv ] = useState( [ 'https://techcrunch.com/wp-content/uploads/2020/11/M1-Mac-Mini-7.jpg' ] );

  const sliderAPI = () =>
  {


    fetch( 'https://demo5110359.mockable.io/images' )
      .then( response => response.json() )
      .then( data => 
      {
        console.log( data )
        setDataEnv( data.images )
      } );
  }

  React.useEffect( () =>
  {
    sliderAPI();
  }, [] )

  const [ currentUrl, setCurrentUrl ] = React.useState( dataEnv[ 0 ] );
  const [ config, setConfig ] = React.useState( { dir: 'forward', duration: 3000 } );
  const [ durationVal, setDuration ] = React.useState( 3000 );
  const [ direction, setDirection ] = React.useState( 'forward' );



  const handleAction = ( dir ) =>
  {
    if ( dir === 'left' )
    {
      if ( currentIndex === 0 )
      {
        currentIndex = dataEnv.length - 1;
        setCurrentUrl( dataEnv[ dataEnv.length - 1 ] );
      } else
      {
        currentIndex = currentIndex - 1;
        setCurrentUrl( dataEnv[ currentIndex ] );
      }

    } else
    {
      if ( currentIndex === dataEnv.length - 1 )
      {
        currentIndex = 0;
        setCurrentUrl( dataEnv[ 0 ] );
      } else
      {
        currentIndex = currentIndex + 1;
        setCurrentUrl( dataEnv[ currentIndex ] );
      }
    }
  }

  React.useEffect( () =>
  {

    const { dir, duration } = config;
    interval = setInterval( () =>
    {
      if ( dir === 'forward' )
      {
        handleAction( 'right' );
      } else
      {
        handleAction( 'left' );
      }
    }, duration );
  }, [ config, dataEnv ] );


  const saveConfig = () =>
  {
    clearInterval( interval );
    setConfig( {
      ...{
        dir: direction,
        duration: Number( durationVal )
      }
    } )
  }

  const onValueChange = ( val ) =>
  {

    setDirection( val.target.value );
  }


  return (
    <div className="App">
      <div className='inputContainer' >
        <div className='container-row'>
          <label> Duration :</label> <input type='text' value={durationVal} onChange={( e ) => setDuration( e.target.value )} />
        </div>
        <div className='container-row'>
          <label> Direction :</label>
          <input type="radio" id="forward" value="forward"
            checked={direction === "forward"}
            onChange={onValueChange} />
          <label for="control_forward">Forward</label><br />
          <input type="radio" id="reverse" value="reverse"
            checked={direction === "reverse"}
            onChange={onValueChange} />
          <label for="control_reverse">reverse</label><br></br>
        </div>
        <div className='container-row'>
          <button type="button" onClick={saveConfig} >Submit</button>
        </div>
      </div>

      <Slider currentUrl={currentUrl} handleAction={handleAction} />
    </div>
  );
}

export default App;
