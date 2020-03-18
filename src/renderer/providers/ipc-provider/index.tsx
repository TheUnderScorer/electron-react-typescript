import { createContext, FC, useContext, useMemo } from 'react';
import * as React from 'react';
import { createIpcServiceFromWindow, IpcService } from './ipcService';

const IpcContext = createContext<IpcService>(createIpcServiceFromWindow());

export const useIpc = () => useContext(IpcContext);

const IpcProvider: FC = ({ children }) => {
    const service = useMemo(() => createIpcServiceFromWindow(), []);

    return <IpcContext.Provider value={service}>{children}</IpcContext.Provider>;
};

export default IpcProvider;
