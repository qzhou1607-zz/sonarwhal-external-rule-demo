import { generateHTMLPage } from 'sonarwhal/dist/tests/helpers/misc';
import { getRuleName } from 'sonarwhal/dist/src/lib/utils/rule-helpers';
import { IRuleTest } from 'sonarwhal/dist/tests/helpers/rule-test-type';
import * as ruleRunner from 'sonarwhal/dist/tests/helpers/rule-runner';
const ruleName = getRuleName(__dirname);
const footer = {
    configedTextInFooter: `<footer>(c) Qing Zhou</footer>`,
    noFooter: ``,
    noProblem: `<footer>(c) sonarwhal</footer>`,
    wrongTextInFooter: `<footer>(c) Sonarwhal</footer>`
};

const defaultTests: Array<IRuleTest> = [
    {
        name: `Footer exists and it contains '(c) sonarwhal'`,
        serverConfig: generateHTMLPage('', footer.noProblem)
    },
    {
        name: `Footer doesn't exist`,
        reports: [{ message: `<footer> element doesn't exist in this page.` }],
        serverConfig: generateHTMLPage('', footer.noFooter)
    },
    {
        name: `Footer exists, but doesn't contain '(c) sonarwhal'`,
        reports: [{ message: `"(c) sonarwhal" is not included in the footer.` }],
        serverConfig: generateHTMLPage('', footer.wrongTextInFooter)
    }
];

const configTests: Array<IRuleTest> = [
    {
        name: `Footer exists, but doesn't contain '(c) Qing Zhou'`,
        reports: [{ message: `"(c) Qing Zhou" is not included in the footer.` }],
        serverConfig: generateHTMLPage('', footer.noProblem)
    },
    {
        name: `Footer exists, and it contains the configed string '(c) Qing Zhou'`,
        serverConfig: generateHTMLPage('', footer.configedTextInFooter)
    }
];

// Tests that use the default target string.
ruleRunner.testRule(ruleName, defaultTests);

// Tests that use the configed target string.
ruleRunner.testRule(ruleName, configTests, { ruleOptions: { stringToBeIncluded: `(c) Qing Zhou` } });
