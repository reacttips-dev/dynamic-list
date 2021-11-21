import * as React from 'react';

interface Props {
    onScroll?: () => void;
    children: any;
    width?: number;
    role?: string;
}

export const Content = (props: Props) => {
    const {
        onScroll = () => {},
        children,
        width,
        role = 'presentation',
    } = props;

    return (
        <div
            onScroll={onScroll}
            role={role}
            className="c-scrollbar__child"
            style={{width}}
        >
            {children}
        </div>
    );
}
