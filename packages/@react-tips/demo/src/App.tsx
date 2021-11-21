import React from 'react';

import {
    Scrollbar,
} from '@react-tips/dynamic-list';

import './index.css';

export const App = () => {
    return (
        <div>
            <Scrollbar
                className="c-virtual_list c-virtual_list--scrollbar p-channel_sidebar__static_list"
                width={260}
                height={422}
                contentHeight={716}
                trackTop={12}
                onScroll={() => {
                    console.log('scrolling...')
                }}
                onContentScroll={() => {
                    console.log('scrolling...')
                }}
                anchor="bottom"
                role="presentation"
                fade={false}
                useFixedTrackHeight={true}
                alwaysVisible={false}
                initialScrollTop={0}
            >
                <div style={{height: 716}}>
                    Hello
                </div>
            </Scrollbar>
        </div>
    );
}

// {
//     "className": "c-virtual_list c-virtual_list--scrollbar p-channel_sidebar__static_list",
//     "width": 260,
//     "height": 422,
//     "contentHeight": 716,
//     "trackTop": 12,
//     "onTrackClick": "ƒ page() {}",
//     "onScroll": "ƒ bound onScroll() {}",
//     "onContentScroll": "ƒ bound onContentScroll() {}",
//     "anchor": "bottom",
//     "role": "presentation",
//     "fade": false,
//     "useFixedTrackHeight": true,
//     "alwaysVisible": false,
//     "initialScrollTop": 0,
//     "children": [
//     "<div />",
//     null
// ]
// }
