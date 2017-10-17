import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './components/AddOption';
import Option from './components/Option';

	class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		    this.handlePick = this.handlePick.bind(this);
		    this.handleAddOption = this.handleAddOption.bind(this);
		    this.handleDeleteOption = this.handleDeleteOption.bind(this);
			this.state = {
              options : []
			};
	}
	componentDidMount() {
        try {
        const json = localStorage.getItem('options');
		const options = JSON.parse(json);

		if (options) {
		this.setState(() => ({ options }));
	  }
    } catch (e) {
     //do nothing
  }
}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
		}
	}

	componentWillUnmount() {
        console.log('componentWillUnmount!');
	}

	handleDeleteOptions() {
			this.setState(() => ({ options: [] }));
	}
	

    handleDeleteOption(optionToRemove) {
    	this.setState((prevState) => ({
           options: prevState.options.filter((option) => {
             return optionToRemove !== option;
           })
    	}));
    }
	handlePick() {
            const randomNum = Math.floor(Math.random() * this.state.options.length);
            const option = this.state.options[randomNum];
            alert(option);
		}
	handleAddOption(option) {
        if (!option) {
        	return 'Enter valid item to add item';
        } else if (this.state.options.indexOf(option) > -1) {
        	return 'This option already exists';
        } 

		this.setState((prevState) => ({
             options: prevState.options.concat([option])
		}));
	}

	render() {
		const title = 'Indecision';
		const subtitle = 'Put Your Life in the Hands of a Computer';

		return (
			<div>
			  <Header subtitle={subtitle} />
			  <Action   
			    hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
			  />
			  <Options 
			     options={this.state.options}
                 handleDeleteOptions={this.handleDeleteOptions}
                 handleDeleteOption={this.handleDeleteOption}
			      />
			  <AddOption 
                handleAddOption={this.handleAddOption}
			  />
			</div>
		);
	}
}



const Header = (props) => {
	return (
		<div> test text
		  <h1>{props.title}</h1>
		  {props.subtitle && <h1>{props.subtitle}</h1>}
		</div>
		);
};

Header.defaultProps = {
	title: 'some default!'
};





const Action = (props) => {
	return (
	      <div>
		      <button 
		        onClick={props.handlePick}
		        disabled={!props.hasOptions}
		        >
		          What Should I do?
		        </button>
		   </div>
		); 
};



const Options = (props) => {
	return (
		 <div>
         <button onClick={props.handleDeleteOptions}>Remove options</button>
         {props.options.length === 0 && <p>Please add an option to get started</p> }
         
          {props.options.map((option) => (
          	<Option 
          	key={option} 
          	optionText={option} 
          	handleDeleteOption={props.handleDeleteOption}/>
          	))
          }       
         </div>

		);
};














ReactDOM.render(<IndecisionApp />, document.getElementById('app'));