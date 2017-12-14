/**
 * @fileoverview A new rule to validate footer
 */

import { Category } from 'sonarwhal/dist/src/lib/enums/category';
import { RuleContext } from 'sonarwhal/dist/src/lib/rule-context';
// The list of types depends on the events you want to capture.
import { IRule, IRuleBuilder, IElementFound } from 'sonarwhal/dist/src/lib/types';
import { debug as d } from 'sonarwhal/dist/src/lib/utils/debug';

const debug: debug.IDebugger = d(__filename);

/*
 * ------------------------------------------------------------------------------
 * Public
 * ------------------------------------------------------------------------------
 */

const rule: IRuleBuilder = {
    create(context: RuleContext): IRule {
        // Your code here.
        const validateElement = async (elementFound: IElementFound) => {
            // Code to validate the rule on the event when an element is visited.

            const { resource } = elementFound;

            debug(`Validating rule validate-footer`);

            /*
             * This is where all the magic happens. Any errors found should be
             * reported using the `context` object. E.g.:
             * await context.report(resource, null, 'Your error message was here');
             *
             * More information on how to develop a rule is available in:
             * https://sonarwhal.com/docs/contributor-guide/rules/
             */

            if (Math.ceil(Math.random()) === 0) {
                await context.report(resource, null, 'Your error message here');
            }
        };

        return {
            'element::footer': validateElement
            // As many events as you need
        };
    },
    meta: {
        docs: {
            category: Category.other,
            description: `A new rule to validate footer`
        },
        recommended: false,
        schema: [
            /*
             * If you want to allow the user to configure your rule
             * you should use a valid JSON schema. More info in:
             * https://sonarwhal.com/docs/contributor-guide/rules/#themetaproperty
             */
        ],
        worksWithLocalFiles: true
    }
};

module.exports = rule;
