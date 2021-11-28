import React from 'react';

import {
    unknown,
} from './utils';

interface Props {

}

interface State {

}

export class List extends React.Component<Props, State> {
    private layout: any;
    private node: any;
    private contentNode: any;
    private isSelecting: boolean;
    private selectionStart: any;
    private selectionEnd: any;
    private scrollStartTimeout: any;
    private autoTraceState: any;
    private scrollTop: any;
    private layout: any;

    constructor(props) {
        super(props);

        this.onScrollEnd = unknown(this.onScrollEnd.bind(this), 50);
    }
}
