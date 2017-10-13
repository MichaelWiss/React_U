//stateless functional component

class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		    this.handlePick = this.handlePick.bind(this);
		    this.handleAddOption = this.handleAddOption.bind(this);
		    this.handleDeleteOption = this.handleDeleteOption.bind(this);
			this.state = {
              options : props.options
			};
	}
	componentDidMount() {
		console.log('fetching data');
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
            console.log('saving data');
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

IndecisionApp.defaultProps = {
	options: []
}

const Header = (props) => {
	return (
		<div>
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
          <Option /> 
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



const Option = (props) => {
	return (
        <div>
            {props.optionText}
            <button 
            onClick={(e) => {
             props.handleDeleteOption(props.optionText);
            }}
            >
            remove
            </button>
         </div>  
		);
};





class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
          error: undefined
		};
	}
	handleAddOption(e){
		e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));
     }
	render() {
		return (

			<div>
			  {this.state.error && <p>{this.state.error}</p>}
			  <form onSubmit={this.handleAddOption}>
                <input type="text" name="option"/>
                 <button>Add Option</button>
	          </form>
			</div>
		);
	}
} 





ReactDOM.render(<IndecisionApp />, document.getElementById('app'));


