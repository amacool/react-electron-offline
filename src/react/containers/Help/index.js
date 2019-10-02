import React from 'react';
import './styles.css';

function Recent() {

  return (
    <div className="Help">
      <div className="container">
        <div className="header">
          <span>The following are some frequently asked questions on United Nations and the Security Council.
            If your question is not listed here, please fell free to contact the Security Council Practices
            and Charter Research Branch.</span>
        </div>
        <div className="content-body">
          <ul>
            <li>
              <div>Membership and Election</div>
              <div>How are the non-permanent members selected?</div>
            </li>
            <li>
              <div>Conduct of Business</div>
              <div>How is the work of the Security Council organized?</div>
              <div>What is the difference between open and closed meetings and consultations?</div>
              <div>What are subsidiary organs?</div>
              <div>What is the difference between peacekeeping operations, political missions and peacebuilding offices?</div>
            </li>
            <li>
              <div>Action with Respect to Threats to the Peace, Breach of the Peace, or Act of Aggression</div>
              <div>How does the Security Council determine the existence of any threat to the peace, breach of the peace,
                or act of aggression?</div>
              <div>What are sanctions?</div>
              <div>What kind of measures involving the use of armed force has the Security Council imposed in the past?</div>
              <div>What are the rules for the use of force by States?</div>
            </li>
            <li>
              <div>Admission of New Members to the United Nations</div>
              <div>What is the Security Council's role in the admission of new members to the UN?</div>
            </li>
            <li>
              <div>Security Council Reform</div>
              <div>What is the process for Security Council reform?</div>
            </li>
            <li>
              <div>About the Repertoire</div>
              <div>Where does the material in the Repertoire come from</div>
              <div>What is a case study?</div>
              <div>What are implicit and explicit references?</div>
              <div>What does the double asterisk (**) that is next to some headings mean?</div>
              <div>Where is the veto featured in the Repertoire?</div>
              <div>Where can I find information regarding the Security Council's activities in connection to the situation
              in a specific country or on a specific topic?</div>
            </li>
            <li className="non-list-style">
              <div>Other Questions</div>
              <div>How is the Secretary-General elected?</div>
            </li>
            <li className="non-list-style">
              <div>Other Resources</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Recent;
