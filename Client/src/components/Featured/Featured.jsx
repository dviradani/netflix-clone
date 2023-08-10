import "./Featured.scss"
import React from 'react'

const Featured = ({content}) => {
  
  return (
    <div className="my-featured-container" 
        style={{
            backgroundImage: `url(${content.img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}
    >
        <div className="my-feature-dits-container">
            <div className="my-featured-title-img-container">
                <img src={content.imgTitle}></img>
            </div>
            <div className="my-featured-desc-container">
                <p>{content.description}</p>
            </div>
            <div className="my-featured-btn-container">
                <div className="my-featured-btn-left-container">
                    <button>Play</button>
                    <button className="my-button-secondry">Info</button>
                </div>
                <div className="my-featured-btn-right-container">
                    <button>
                        <span class="material-symbols-outlined">refresh</span>
                    </button>
                    <div className="my-age-box"><p>+{content.limit}</p></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured