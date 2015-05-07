var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// Test of React Router

var App = React.createClass({
	render: function () {
		return (
			<div>
				<header>
					<ul>
						<li><Link to="app">Dashboard</Link></li>
						<li><Link to="inbox">Inbox</Link></li>
						<li><Link to="calendar">Calendar</Link></li>
					</ul>
					Logged in as Dumbledore
				</header>

				<RouteHandler/>
			</div>
		);
	}
});

var Inbox = React.createClass({
	render: function () {
		var messages = [12, 13, 56];
		return (
			<div>
				<h2>Inbox</h2>
				<ul>
				{
					messages.map(function(id) {
						return <li key={id}><Link to="inbox.messages" params={{id: id}}>Message {id}</Link></li>
					})
				}
				</ul>
				<RouteHandler/>
			</div>
		);
	}
});

var Calendar = React.createClass({
	render: function () {
		return (
			<h2>Calendar</h2>
		);
	}
});

var Dashboard = React.createClass({
	render: function () {
		return (
			<h2>Dashboard</h2>
		);
	}
});

var Message = React.createClass({
	getInitialState: function() {
		return {
				message: 'Chargement...'
		};
	},
	componentWillMount: function() {
		this.componentWillReceiveProps(this.props);
	},
	componentWillReceiveProps: function (props) {
		var id = props.params.id;
		this.setState({ message: id });
	},
	render: function () {
		return (
			<div>
				<h4>Message</h4>
				<p>{this.state.message}</p>
			</div>
		);
	}
});

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="inbox" path="inbox" handler={Inbox}>
			<Route name="inbox.messages" path="messages/:id" handler={Message}/>
		</Route>
		<Route name="calendar" handler={Calendar}/>
		<DefaultRoute handler={Dashboard}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('container'));
});