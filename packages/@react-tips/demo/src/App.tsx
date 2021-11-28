import React from 'react';

import {
    Scrollbar,
    ListItem,
} from '@react-tips/dynamic-list';

import './index.css';

export const App = () => {
    const [enabled, setEnabled] = React.useState<boolean>(false);

    const handleClick = React.useCallback(() => {
        setEnabled(!enabled);
    }, [enabled, setEnabled]);

    const handleHeightChange = (itemKey: string, newHeight: number) => {
        console.log(`The height of item ${itemKey} has changed to: ${newHeight}`);
    }

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
                    <ListItem
                        height={enabled ? 90 : 40}
                        id="1"
                        itemKey="item1"
                        top={0}
                        onHeightChange={handleHeightChange}
                    >
                        <div style={{background: 'red'}}>
                            <div>
                                <button
                                    onClick={handleClick}
                                >
                                    Change height
                                </button>
                            </div>
                            {
                                enabled && (
                                    <div style={{height: 50}}>
                                        Extended
                                    </div>
                                )
                            }
                            <div>
                                This is list item 1
                            </div>
                        </div>
                    </ListItem>
                    <ListItem
                        height={40}
                        id="1"
                        itemKey="item1"
                        top={enabled ? 130 : 40}
                    >
                        <div style={{height: 40, background: 'blue'}}>
                            This is list item 2
                        </div>
                    </ListItem>
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
