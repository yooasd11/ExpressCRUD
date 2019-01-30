import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

export default function GuardedRoute({ component: Component, ...rest }) {
    const { guard, fallback, render } = rest;

    if (!guard) {
        return <Redirect to={{ pathname: fallback }} />;
    }

    if (render && typeof render === 'function') {
        return <Route {...rest} render={render} />;
    }

    return <Route {...rest} render={(props => (<Component {...props} />))} />
}