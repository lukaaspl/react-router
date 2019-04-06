import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import './BundlePage.css';
import Loader from './images/loader.gif';
import BundleLayer from './BundleLayer';

class BundlePage extends React.Component {
    state = {
        bundle: {},
        bundleLoaded: false,
        bundleBought: false,
        redirect: false,
    }

    fetchBundle() {
        fetch('/data/bundles.json')
            .then(response => {
                if (response.ok)
                    return response.json();

                throw Error('Couldn\'t get response! Query status: ' + response.status);
            })
            .then(response => response.filter(bundle => {
                if (bundle.id.toString() === this.props.match.params.bundleId)
                    return bundle;

                return false;
            }))
            .then(bundle => this.setState({
                bundle,
                bundleLoaded: true
            }))
            .then(() => (
                document.querySelector('.get-bundle-btn').addEventListener('click', () => this.setState({ bundleBought: true }))
            ))
            .catch(error => console.warn(error));
    }

    componentDidMount() {
        const loadingTime = Math.floor(Math.random() * 500 + 100);
        this.timeoutID = setTimeout(() => {
            this.fetchBundle();


        }, loadingTime);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutID);
    }

    handleRedirect = () => {
        this.timeoutID = setTimeout(() => {
            this.setState({ redirect: true });
        }, 5000);
    }

    render() {
        if (this.state.redirect)
            return <Redirect to="/pricing" />;

        if (!this.state.bundleLoaded)
            return (
                <React.Fragment>
                    <h2>Loading bundle</h2>
                    <div className="pricing-page">
                        <div className="loader"><img src={Loader} alt="Loading" /></div>
                    </div>
                </React.Fragment>
            );

        if (this.state.bundleLoaded && Object.keys(this.state.bundle).length === 0)
            return (
                <ErrorMessage closeButton={false}>
                    That bundle doesn't exist yet.
                </ErrorMessage>
            );

        const { name, fileName, shout, description, price } = this.state.bundle[0];
        const bundleIcon = require('./images/pricing-icons/' + fileName);
        const discount = 0.2;
        const priceAfterDiscount = parseInt(price) - (parseInt(price) * discount);

        return (
            <React.Fragment>
                <BundleLayer active={this.state.bundleBought} icon={bundleIcon} redirect={this.handleRedirect} />

                <h2>{name} Bundle</h2>
                <div className="bundlepage-banner">
                    <img src={bundleIcon} alt="" />
                    <p>says: <span>{shout}</span></p>
                </div>
                <div className="bundlepage-description">
                    <div dangerouslySetInnerHTML={{ __html: description }} />

                    <div className="bundlepage-price">
                        <div>Regular price of {name} Bundle is: <span className="regular-price">{price}$</span></div>
                        <div>
                            But now you're able to have the bundle with <strong>{discount * 100}% discount</strong>:
                            <span className="discount-price">{priceAfterDiscount}$</span>
                        </div>
                        <div>
                            <button className="primary-btn get-bundle-btn">{this.state.bundleBought ? 'Processing...' : 'Buy now!'}</button>
                        </div>
                    </div>
                </div>
                <p className="return-link"><Link to="/pricing">Return to pricing page</Link></p>
            </React.Fragment>
        );
    }
}

export default BundlePage;