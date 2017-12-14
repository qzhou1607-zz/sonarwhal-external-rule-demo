import { generateHTMLPage } from 'sonarwhal/dist/tests/helpers/misc';
import { getRuleName } from 'sonarwhal/dist/src/lib/utils/rule-helpers';
import { IRuleTest } from 'sonarwhal/dist/tests/helpers/rule-test-type';
import * as ruleRunner from 'sonarwhal/dist/tests/helpers/rule-runner';
const ruleName = getRuleName(__dirname);
const footer = {
    noProblem: `<footer>Best Developer Ever</footer>`,
    noFooter: ``,
    wrongTextInFooter: `<footer>Best Ever</footer>`
};

const defaultTests: Array<IRuleTest> = [
    {
        name: `Footer exists and it contains 'Best Developer Ever'`,
        serverConfig: generateHTMLPage(footer.noProblem)
    },
    {
        name: `Footer doesn't exist`,
        reports: [{ message: `<footer> element doesn't exist in this page.` }],
        serverConfig: generateHTMLPage(footer.noFooter)
    },
    {
        name: `Footer exists, but doesn't contain 'Best Developer Ever'`,
        reports: [{ message: `"Best Developer Ever" is not included in the footer.` }],
        serverConfig: generateHTMLPage(footer.wrongTextInFooter)
    }
];

const configTests: Array<IRuleTest> = [
    {
        name: `Footer exists, but doesn't contain 'Awesome Code'`,
        reports: [{ message: `"Awesome Code" is not included in the footer.` }],
        serverConfig: generateHTMLPage(footer.wrongTextInFooter)
    }
];

ruleRunner.testRule(ruleName, defaultTests);
ruleRunner.testRule(ruleName, configTests, { ruleOptions: { stringToBeIncluded: 'Awesome Code' } })
