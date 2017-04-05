'use strict'

var my_recipes = [
	{
		title: "Salad with mushrooms",
		text: "In large skillet, heat oil over medium hat. Add mushrooms, cook 5 minutes or until softened. Add raspberry dressing and vinegar,boil 1 minute.Season with salt and pepper. Place spinach,raspberries an pecans in salad bowl or arrange on idividual salad plates. Toss with warm dressing or spoon over salad. Sprinkle blue cheese on top.",
		img: "public/img/1.jpg"
	},
	{
		title: "Reeses Squares - 5 Ingredients & No Bake (Reese's)",
		text: "Combine graham crumbs, sugar and peanut butter and mix well. Blend in melted butter until well combined. Press mixture evenly into a 9 x 13 inch pan. Melt chocolate chips in microwave or in double boiler. Spread over peanut butter mixture. Chill until just set and cut into bars (these are very hard to cut if the chocolate gets 'rock hard'.",
		img: "public/img/2.jpg"
	},
	{
		title: "Hawaiian Margarita",
		text: "1 ounce gold tequila, 1⁄2 cup Orange sherbet, 2 ounces guava juice, 2 ounces pineapple juice, 1 cup ice. Add all ingredients to a blender. Blend until slushy and strain into a Margarita glass.",
		img: "public/img/3.jpg"
	}
];

window.ee = new EventEmitter();

var Article = React.createClass({
	render: function(){
		var title = this.props.data.title,
			text = this.props.data.text,
			img = this.props.data.img;

		return(
			<div className="recipePost container">
						<h3 className="recipeTitle">{title}</h3>
						<img src={img} className="img-thumbnail" />
						
						<p className="recipeDescriptions">{text}</p>
			</div>
		)
	}
	
});

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	render: function(){
	var data = this.props.data;

	var recipeTemplate = data.map(function(item, index){
		return(
				<div key={index}>
					<Article data={item}/>
				</div>
				)
		})
		return(
			<div className="news">
				{recipeTemplate}
			</div>
		);

	
		
	}
});


var Add = React.createClass ({
	componentDidMount: function(){
		ReactDOM.findDOMNode(this.refs.title).focus();
	},
	

	onBtnClickHandler:function(e){
		e.preventDefault();
		var title=ReactDOM.findDOMNode(this.refs.title);
		var text=ReactDOM.findDOMNode(this.refs.text);
		var img = ReactDOM.findDOMNode(this.refs.img);

		var item = [{
			title: title.value,
			text: text.value,
			img: img.value
		}];
		window.ee.emit('Recipe.add', item);
		title.value = '';
		text.value = '';
		img.value = '';
	},

	render: function(){
		return(
			<form className="form-horizontal">
				<input 
					type="text"
					className="titleInput form-control"
					defaultValue=''
					ref='title'
					placeholder="Add title"
				/>
				<input 
					type="text"
					className="imgInput form-control"
					defaultValue=''
					ref='img'
					placeholder="Choose image"
				/>
				<textarea
					className="desctiption form-control"
					defaultValue=''
					placeholder="Description your recipe"
					ref="text"
				></textarea>
				
				<button 
					className="btn btn-success" 
					onClick={this.onBtnClickHandler}
					ref="button"
					>Alert</button>
			</form>
		)
	}
});



var App = React.createClass({
	getInitialState: function(){
		return {
			recipes: my_recipes
		};
	},
	componentDidMount: function(){
		var self = this;
		window.ee.addListener("Recipe.add", function(item){
			var nextRecipe = item.concat(self.state.recipes);
			self.setState({recipes: nextRecipe});
		});
	},
	componentWillUnmount: function(){
		window.ee.removeListener('Recipe.add');
	},
	render: function(){
		return(
		<div className="container">
			<h1> Share your favorite recipes! </h1>
			<Add />
			
			<News data={this.state.recipes}/>
		
		</div>
		);
	}
});
ReactDOM.render(
	<App />,
	document.getElementById('app')
);