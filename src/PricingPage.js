import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PricingPage.css';
import Loader from './images/loader.gif';

class PricingPage extends Component {
    state = {
        bundles: [],
        bundlesLoaded: false,
    }

    fetchData() {
        fetch('data/bundles.json')
            .then(response => {
                if (response.ok)
                    return response.json();

                throw Error('Couldn\'t get response! Query status: ' + response.status);
            })
            .then(data => {
                this.setState({
                    bundles: data,
                    bundlesLoaded: true,
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        const loadingTime = Math.floor(Math.random() * 500 + 100);
        this.timeoutID = setTimeout(() => this.fetchData(), loadingTime);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutID);
    }

    ShowLoader() {
        return <div className="loader"><img src={Loader} alt="Loading" /></div>;
    }

    render() {
        this.state.bundles.sort((bundle1, bundle2) => bundle1.price - bundle2.price);

        const bundleListSorted = this.state.bundles.map(bundle => {
            const bundleIcon = require('./images/pricing-icons/' + bundle.fileName);

            return (
                <Link to={`/bundle/${bundle.id}/${bundle.name.toLowerCase()}`} className="bundle" key={bundle.id}>
                    <div className="bundle-icon">
                        <img src={bundleIcon} alt="" />
                    </div>
                    <div className="bundle-name">{bundle.name} Bundle</div>
                    <div className="bundle-description">{bundle.shortDescription}</div>
                    <div className="bundle-price">{bundle.price}$</div>
                    <div className="bundle-check-btn">
                        <p>Check bundle</p>
                    </div>
                </Link>
            );
        });

        return (
            <React.Fragment>
                <h2>Pricing</h2>
                <div className="pricing-page">{this.state.bundlesLoaded ? bundleListSorted : <div className="loader"><img src={Loader} alt="Loading" /></div>}</div>
            </React.Fragment>
        );
    }
}

export default PricingPage;