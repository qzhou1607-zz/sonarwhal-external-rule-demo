/**
 * @fileoverview A new rule to validate footer
 */

import { Category } from 'sonarwhal/dist/src/lib/enums/category';
import { RuleContext } from 'sonarwhal/dist/src/lib/rule-context';
// The list of types depends on the events you want to capture.
import { IRule, IRuleBuilder, IElementFound, ITraverseEnd } from 'sonarwhal/dist/src/lib/types';
import { debug as d } from 'sonarwhal/dist/src/lib/utils/debug';

const debug: debug.IDebugger = d(__filename);

/*
 * ------------------------------------------------------------------------------
 * Public
 * ------------------------------------------------------------------------------
 */

const rule: IRuleBuilder = {
    create(context: RuleContext): IRule {
        let footerExists = false;
        let stringToBeIncluded;

        const loadRuleConfigs = () => {
            stringToBeIncluded = (context.ruleOptions && context.ruleOptions.stringToBeIncluded) || `(c) sonarwhal`;
        };

        const footerMissing = async (traverseEnd: ITraverseEnd) => {
            const { resource } = traverseEnd;

            if (!footerExists) {
                await context.report(resource, null, `<footer> element doesn't exist in this page.`);
            }
        };

        const validateFooter = async (elementFound: IElementFound) => {
            const { element, resource } = elementFound;
            const footerHTML = await element.outerHTML();

            footerExists = true;
            debug(`Validating rule validate-footer`);

            if (!footerHTML.includes(stringToBeIncluded)) {
                await context.report(resource, element, `"${stringToBeIncluded}" is not included in the footer.`);
            }
        };

        loadRuleConfigs();

        return {
            'element::footer': validateFooter,
            'traverse::end': footerMissing
        };
    },
    meta: {
        docs: {
            category: Category.other,
            description: `A new rule to validate footer`
        },
        recommended: false,
        schema: [{
            additionalProperties: false,
            properties: { stringToBeIncluded: { type: 'string' } }
        }],
        worksWithLocalFiles: true
    }
};

module.exports = rule;
