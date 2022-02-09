import React from 'react';
import './footer.css';
import playStore from '../../../images/playStore.png';
import appStore from '../../../images/appStore.png';

const Footer = () => {
  return (
      <>
        <footer id = "footer">
            <div className='leftFooter'>
                <h2>Download App for Android and IOS mobile phone</h2>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className='midFooter'>
              <h1>BUY & JOY</h1>
              <h3>Get Happiness Delivered At Home</h3>
              <h4>CopyRights 2022 &copy; Brilhante Solutions</h4>
            </div>

            <div className='rightFooter'>
              <h3>Follow Us</h3>
              <a href='/'> Instagram</a>
              <a href='/'> FaceBook</a>
              <a href='/'> Twitter</a>
              <a href='/'> Skype</a>
            </div>
        </footer>
      </>
  );
};

export default Footer;
