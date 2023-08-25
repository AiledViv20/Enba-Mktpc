import React from 'react';
import Markdown from 'markdown-to-jsx';

export const MarkDownSection = (props) => {

    return (
        <div>
            <Markdown>{props.children}</Markdown>
        </div>
    );
};