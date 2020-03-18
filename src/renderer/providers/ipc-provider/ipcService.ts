export interface IpcService {
    sendSync: <Arg extends object, ReturnValue = any>(event: string, arg: Arg) => ReturnValue;
    send: <Arg extends object, ReturnValue = any>(event: string, arg: Arg) => Promise<ReturnValue>;
}

export interface IpcServiceConfig {
    asyncTimeout?: number;
    appWindow?: Window;
}

export const createIpcServiceFromWindow = ({
    asyncTimeout = 5000,
    appWindow = window
}: IpcServiceConfig = {}): IpcService => {
    return {
        sendSync: <Arg extends object, ReturnValue = any>(
            event: string,
            arg?: Arg
        ): ReturnValue => {
            return appWindow.ipcRenderer.sendSync(event, arg);
        },
        send: <Arg extends object, ReturnValue = any>(
            event: string,
            arg?: Arg
        ): Promise<ReturnValue> => {
            const replyEvent = `${event}-reply`;
            const timestamp = Date.now();

            appWindow.ipcRenderer.send(event, {
                ...arg,
                timestamp
            });

            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('IpcService async timeout.'));
                }, asyncTimeout);

                appWindow.ipcRenderer.once(
                    replyEvent,
                    (_event: unknown, result: ReturnValue & { timestamp: number }) => {
                        if (result.timestamp === timestamp) {
                            clearTimeout(timeout);
                            resolve(result);
                        }
                    }
                );
            });
        }
    };
};
