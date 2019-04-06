import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import TopbarImage from './TopbarImage';
import './App.css';

// cms pages
import ContactPage from './ContactPage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import PricingPage from './PricingPage';
import BundlePage from './BundlePage';

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Error404 = () => <ErrorMessage closeButton={false}>Error 404: Invalid URL addres or site doesn't exist anymore.</ErrorMessage>;

class App extends Component {
  componentDidMount() {
    const menuToggler = document.querySelector('.hamburger-icon');
    const nav = document.querySelector('nav');
    const menuLinks = document.querySelectorAll('nav ul li a');

    menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', () => {
        nav.classList.remove('shown');
      });
    });

    menuToggler.addEventListener('click', () => {
      nav.classList.toggle('shown');
    });
  }

  render() {
    const currentYear = new Date().getFullYear();

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <header>
            <div className="header-wrapper">
              <h1><Link to="/"><i className="fas fa-bolt logo-icon" />Reactive Router</Link></h1>
              <i className="fas fa-bars hamburger-icon" />
              <nav>
                <ul>
                  <li><NavLink to="/" exact>Home</NavLink></li>
                  <li><NavLink to="/about">About</NavLink></li>
                  <li><NavLink to="/pricing">Pricing</NavLink></li>
                  <li><NavLink to="/contact">Contact</NavLink></li>
                  <li><Link to="/non-existent-page">?</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            <TopbarImage />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/pricing" component={PricingPage} />
              <Route path="/bundle/:bundleId/:bundleName" component={BundlePage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/login" component={LoginPage} />
              <Route component={Error404} />
            </Switch>
          </main>
          <footer>
            <p>
              &copy; {currentYear} All rights reserved by
                            <span className="author"> Reacted Luke </span>
              <Link to="/admin">&raquo;<span>Admin panel</span></Link>
            </p>
          </footer>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;