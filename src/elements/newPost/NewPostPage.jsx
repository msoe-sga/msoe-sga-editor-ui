import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import Button from 'react-bootstrap/Button';
import "react-mde/lib/styles/css/react-mde-all.css";
import { useHistory } from "react-router-dom";





export default function App() {


  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");

 const goToPosts = () =>{ 
    let path = `newPath`; 
    history.push('/posts/');
  }

 const history = useHistory();

const converter = new Showdown.Converter({

 
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

  return (
    <div>
	    	<div>
			<label>Post Title: </label>
			</div>
			<div>
			<input className="" type="text"/>
			</div>

	    	<div>
			<label>Post Author: </label>
			</div>
			<div>
			<input className="" type="text"/>
			</div>
	    <div className="pt-2 pb-2">
	    <ReactMde
	    	className="column"
	        value={value}
	        onChange={setValue}
	        selectedTab={selectedTab}
	        onTabChange={setSelectedTab}
	        generateMarkdownPreview={markdown =>
	          Promise.resolve(converter.makeHtml(markdown))
	        }
	      />
      </div>
      <div className="pr-2">
      <Button variant="primary" onClick={goToPosts}>Submit</Button>

      <Button variant="tertiary" onClick={goToPosts}>Cancel</Button>
      </div>
    </div>
  );

}