import * as React from 'react';
import { AppContainer } from 'react-hot-loader';
import * as renderer from 'react-test-renderer';
import IpcProvider from '../providers/ipc-provider';
import Application from './Application';

// Render components
const wrapComponent = (Component: () => JSX.Element) => {
    return renderer.create(
        <IpcProvider>
            <AppContainer>
                <Component />
            </AppContainer>
        </IpcProvider>
    );
};

test('renders without crashing', () => {
    expect(wrapComponent(Application)).toBeDefined();
});
