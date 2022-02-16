import React from 'react';

export const Slider = ( { currentUrl, handleAction }) =>
{
    return (
        <div className='slider-container'>
        <div className='left-action' onClick={() => handleAction('left')}>
          <img className='arrow' src='https://www.pinclipart.com/picdir/big/4-49575_left-arrow-png-svg-clip-art-for-web.png' />
        </div>
        <div className='right-action' onClick={() => handleAction('right')}>
          <img className='arrow' src='https://www.pinclipart.com/picdir/big/490-4904928_free-png-left-arrow-right-arrow-png-image.png' />
        </div>
        <div className='slider-body'>
          <img src={ currentUrl } />
        </div>
      </div>
    )
}