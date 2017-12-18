# validate-footer (`validate-footer`)

A new rule to validate footer

## Why is this important?

To make sure that the correct copy right text is used at the footer of
the pages.

## What does the rule check?

* A footer should be present in the website.
* The footer should contain my copy right text `The Volcano Coffee Company 2017`.

### Examples that **trigger** the rule

```html
<footer>
    <div>
        Whatever
    </div>
</footer>

```

### Examples that **pass** the rule

```html
<footer>
    <div>
        The Volcano Coffee Company 2017
    </div>
</footer>

```

## Can the rule be configured?

Yes. The target string to be checked can be configured using
`stringToBeIncluded` property.
