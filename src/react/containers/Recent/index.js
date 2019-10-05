import React from 'react';
import { CustomTable } from "../../components/common/CustomTable";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocTypeIcon, DocInfo } from "../../components/common/DocElement";
import './styles.css';
import Button from "@material-ui/core/Button/Button";

function Recent() {
  const files = [
    {
      type: 'image/png',
      name: 'Name of document',
      path: 'HD >> Documents >> Forms >> Drafts',
      lastOpened: '01/01/2019',
      status: 'Sent'
    }, {
      type: 'file/word',
      name: 'Name of document',
      path: 'HD >> Documents >> Forms >> Drafts',
      lastOpened: '01/01/2019',
      status: 'Incomplete'
    }, {
      type: 'file/excel',
      name: 'Name of document',
      path: 'HD >> Documents >> Forms >> Drafts',
      lastOpened: '01/01/2019',
      status: 'Pending send'
    }, {
      type: 'image/png',
      name: 'Name of document',
      path: 'HD >> Documents >> Forms >> Drafts',
      lastOpened: '01/01/2019',
      status: 'Sent'
    }, {
      type: 'image/png',
      name: 'Name of document',
      path: 'HD >> Documents >> Forms >> Drafts',
      lastOpened: '01/01/2019',
      status: 'Sent'
    }
  ];

  return (
    <div className="Recent">
      <div className="container">
        <div className="header">
          <h5>recent forms</h5>
        </div>
        <div className="content-body">
          <CustomTable
            header={[<FontAwesomeIcon icon={faFile} size="2x" />, 'Name', 'Last time opened', 'Status']}
            data={files.map((item) =>
              ({
                a: <DocTypeIcon type={item.type} status={item.status} />,
                b: <DocInfo info={{ name: item.name, path: item.path }} />,
                c: item.lastOpened,
                d: item.status
              })
            )}
          />
          <Button
            variant="contained"
            className="add-button col-1 mt-39"
          >
            Sent
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Recent;
