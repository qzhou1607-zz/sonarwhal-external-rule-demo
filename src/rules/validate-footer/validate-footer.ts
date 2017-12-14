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
        const stringToBeIncluded = `Best Developer Ever`;

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
