import React from 'react';
import { InsertDriveFile } from '@material-ui/icons';

import './styles.css';

function New() {
    return (
        <div className="New">
            <div className="header">
                <InsertDriveFile/>
                <h2>CREATE A NEW FORM</h2>
            </div>

            <p>The Security Council has primary responsibility for the maintenance of international peace and security. It has 15 members,
             and each Member has one vote. Under the Charter of the United Nations, all Member States are obligated to comply with Council decisions.</p>

            <p>The Security Council takes the lead in determining the existence of a threat to the peace or act of aggression. It calls upon the
            parties to a dispute to settle it by peaceful means and recommends methods of adjustment or terms of settlement. In some cases, the Security
            Council can resort to imposing sanctions or even authorize the use of force to maintain or restore international peace and security.</p>
        </div>
    );
}

export default New;
