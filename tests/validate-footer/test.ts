import { generateHTMLPage } from 'sonarwhal/dist/tests/helpers/misc';
import { getRuleName } from 'sonarwhal/dist/src/lib/utils/rule-helpers';
import { IRuleTest } from 'sonarwhal/dist/tests/helpers/rule-test-type';
import * as ruleRunner from 'sonarwhal/dist/tests/helpers/rule-runner';
const ruleName = getRuleName(__dirname);
const footer = {
    configedTextInFooter: `<footer>The Volcano Coffee Company 2018</footer>`,
    noFooter: ``,
    noProblem: `<footer>The Volcano Coffee Company 2017</footer>`,
    wrongTextInFooter: `<footer>The Volcano Cofee Company 2017</footer>`
};

const defaultTests: Array<IRuleTest> = [
    {
        name: `Footer exists and it contains 'The Volcano Coffee Company 2017'`,
        serverConfig: generateHTMLPage('', footer.noProblem)
    },
    {
        name: `Footer doesn't exist`,
        reports: [{ message: `<footer> element doesn't exist in this page.` }],
        serverConfig: generateHTMLPage('', footer.noFooter)
    },
    {
        name: `Footer exists, but doesn't contain 'The Volcano Coffee Company 2017'`,
        reports: [{ message: `"The Volcano Coffee Company 2017" is not included in the footer.` }],
        serverConfig: generateHTMLPage('', footer.wrongTextInFooter)
    }
];

const configTests: Array<IRuleTest> = [
    {
        name: `Footer exists, but doesn't contain 'The Volcano Coffee Company 2018'`,
        reports: [{ message: `"The Volcano Coffee Company 2018" is not included in the footer.` }],
        serverConfig: generateHTMLPage('', footer.noProblem)
    }
];

ruleRunner.testRule(ruleName, defaultTests);
ruleRunner.testRule(ruleName, configTests, { ruleOptions: { stringToBeIncluded: `The Volcano Coffee Company 2018` } });
