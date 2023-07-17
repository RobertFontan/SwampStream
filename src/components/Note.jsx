import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Note() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Note 1">
        Tab content for Note 1
      </Tab>
      <Tab eventKey="profile" title="Note 2">
        Tab content for Note 2
      </Tab>
      <Tab eventKey="contact" title="Note 3">
        Tab content for Note 3
      </Tab>
    </Tabs>

    
  );
}

export default Note