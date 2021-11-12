import * as React from 'react';

import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
import { getComponent } from '@stackbit/components/dist/components-registry';

import { mapStylesToClassNames as mapStyles } from '@stackbit/components/dist/utils/map-styles-to-class-names';

export default function Item(props) {
    const sectionStyles = props.styles?.self || {};

    const sectionBorderWidth = sectionStyles.borderWidth ? sectionStyles.borderWidth : 0;
    return (
        <div
            className={classNames(
                'sb-component',
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                sectionStyles.height ? mapMinHeightStyles(sectionStyles.height) : null,
                sectionStyles.margin,
                sectionStyles.padding,
                sectionStyles.borderColor,
                sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : null
            )}
            style={{
                borderWidth: `${sectionBorderWidth}px`
            }}
            data-sb-field-path={props.annotationPrefix}
        >
            <div
                className={classNames(
                    'flex',
                    'relative',
                    'w-full',
                    sectionStyles.justifyContent ? mapStyles({ justifyContent: sectionStyles.justifyContent }) : null
                )}
            >
                <div className={classNames('w-full', sectionStyles.width ? mapMaxWidthStyles(sectionStyles.width) : null)}>
                    <article className="sb-card">
                        <div className="px-4 py-6 sm:px-6 sm:pb-10">
                            {props.title && (
                                <h2
                                    className={classNames('text-4xl', 'sm:text-5xl', props?.styles?.title ? mapStyles(props?.styles?.title) : null)}
                                    data-sb-field-path=".title"
                                >
                                    {props.title}
                                </h2>
                            )}
                            {props.subtitle && (
                                <p
                                    className={classNames('text-xl', 'sm:text-2xl', props?.styles?.subtitle ? mapStyles(props?.styles?.subtitle) : null)}
                                    data-sb-field-path=".subtitle"
                                >
                                    {props.subtitle}
                                </p>
                            )}

                            {props.content && (
                                <Markdown
                                    options={{ forceBlock: true, forceWrapper: true }}
                                    className={classNames('sb-markdown', 'md:text-lg', props?.styles?.content ? mapStyles(props?.styles?.content) : null)}
                                    data-sb-field-path=".content"
                                >
                                    {props.content}
                                </Markdown>
                            )}
                            {props.author && <div>{props.author}</div>}
                            {props.rating && <div>{props.rating}</div>}
                            <div className="my-3 flex-1 px-4 w-full">{itemActions(props)}</div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

function itemActions(props) {
    const actions = props.actions || [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles || {};
    const Action = getComponent('Action');
    return (
        <div
            className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
            data-sb-field-path=".actions"
        >
            {actions.map((action, index) => (
                <Action key={index} {...action} className="mb-3 mx-2 lg:whitespace-nowrap" annotationPrefix={`.${index}`} />
            ))}
        </div>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
