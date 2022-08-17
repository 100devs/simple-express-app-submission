import React from "react";
import oftv_icon from "../images/oftvIcon.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex-col">
      <section className="flex-row major-v-padding footer-top-row">
        <section className="flex-col">
          <a href="https://of.tv/">
            <img className="icon" src={oftv_icon} alt="OF.TV Icon" />
          </a>
          <a href="https://allmylinks.com/oftv">
            <span>Follow us!</span>
          </a>
        </section>
        <section className="flex-col center">
          <h5>OFTV is available on multiple devices</h5>
          <ul className="flex-row minor-v-padding">
            <li className="minor-h-padding">
              <a className="footer-nav" href="https://of.tv/download/">
                Get the app
              </a>
            </li>
            <li className="minor-h-padding">
              <a
                className="footer-nav"
                href="https://play.google.com/store/apps/details?id=com.zype.oftvandroid"
              >
                Android
              </a>
            </li>
            <li className="minor-h-padding">
              <a
                className="footer-nav"
                href="https://channelstore.roku.com/details/10e9775413e7da2fec7597f61c388ab0/oftv"
              >
                IOS
              </a>
            </li>
            <li className="minor-h-padding">
              <a
                className="footer-nav"
                href="https://www.amazon.com/OF-Media-OFTV/dp/B08G3JWZDQ"
              >
                Roku
              </a>
            </li>
            <li className="minor-h-padding">
              <a
                className="footer-nav"
                href="https://apps.apple.com/app/oftv/id1521600438"
              >
                FireTV
              </a>
            </li>
            <li className="minor-h-padding">
              <a
                className="footer-nav"
                href="https://play.google.com/store/apps/details?id=com.oftv.androidtv"
              >
                AppleTV
              </a>
            </li>
            <li className="minor-h-padding">
              <a
                className="footer-nav"
                href="https://www.samsung.com/us/support/answer/ANS00062169/"
              >
                SamsungTV
              </a>
            </li>
          </ul>
        </section>
        <section className="flex-col">
          <span className="minor-v-padding">Are you an OF creator?</span>
          <Link to="/addVideo">Submit Video</Link>
        </section>
      </section>
      <small>
        ©2022 OFTV | <a href="https://of.tv/privacy-policy/">Privacy Policy</a>
      </small>
    </footer>
  );
}
