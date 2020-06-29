# Project 8: Around The U.S.
## William Schutte, 2020
Practicum by Yandex
-----
### Overview
This project represents work from the 4th through 7th projects for the web-dev course. This chapter is the first to include
JavaScript, user interactivity, and communication between HTML, CSS, and JS. The project brief was provided on Figma, 
an online collaborative interface prototyping tool. 

This adaptive page includes form validation, interactive popups, fade-in and fade-out animations, functional like and delete buttons,
modular JavaScript, and Object Oriented JS design.

    Project 8: OOP Refactoring, more classes, and Webpack Bundling
    Project 7: OOP and Modular JS, Card and FormValidator classes/objects
    Project 6: Real time, client-side form validation
    Project 5: JS functions to add, load, like, delete, and open full image on all cards
    Project 4: Layout, Design, and JS Popup Functionality

### Techniques
This page features a responsive design, editable content, multiple popup elements, editable form fields, and transition
animations.
Development followed best practices for Git commits, branching, and merging.
Internally, the site is designed under BEM methodology, including nested file structure and modular JS.

### Technologies
Visual Studio Code
Git
GitHub
HTML, CSS, JS
Figma

### GitHub Pages Link

This page is also available from my GitHub at the following link:

***https://william-schutte.github.io/web_project_4/***

-----
#### Update Notes 6/27/2020 - Project 7, 2nd Review

##### Fixes:
    JS:
    popupWithForm.js - Used name attribute to pull field values instead of indices
    index.js - Removed deprecated variable cardList

#### Update Notes 6/27/2020 - Project 7, 2nd Review

##### Fixes:
    Webpack:
    Uninstalled jquery, not used

    JS:
    Card.js - Removed redundant variable declarations
    Card.js - Kept evt argument for listeners as _element is an unrendered doc fragment
    FormValidator.js - Passed form selector to constructor instead of actual element for consistency accross objects
    Removed index copy.html backup
    Index.js - Removed private method references in PopupWithForm constructors, turned val argument into object
    Index.js - Created global vars for queried elements in editBtn listener so they were not queried each click
    Popup.js - Finally refactored open/close CSS animation (had 0s time for visibility transition)
    PopupWithForm.js - used parent setEventListeners() method to simplify code
    PopupWithImage.js - Removed unneccessary constructor code; added alt tag to image
    UserInfo.js - fixed comma syntax in constructor (forgot ;)
    UserInfo.js - renamed private element names to reduce confusion

    CSS:
    Removed fade-in/out blocks
    Made popup-opened block, works for all popups

#### Update Notes 6/9/2020 - Project 7, 2nd Review

##### Fixes:
    JS:
    Removed old animationDelay variable (unused)
    Refactored functions to use CSS for popups
        Only added or removed CSS classes to HTML elements
    Made two distinct functions for form saving instead of one
    Used form.reset() to clear fields 
    Created new listeners for form submit and form exit buttons
    Created new listeners for clicking outside a form
    Created utils.js file for img popup handling via Card class
    Moved listeners/functions for card img popups into Card class

    CSS:
    Removed units for zero value lengths

    HTML:
    Added Meta Description tag
    Changed name element to <h1>
    Added aria labels to buttons without text
    Removed old template for pic popup


#### Update Notes 6/5/2020 - Project 7, 1st Review

##### Fixes:
    JS:
    Changed callback to arrow functions in event listeners
    Moved module imports to top of index.js
    Removed unused evt variable pass from closeImgPopup function
    Moved functions before calls to avoid hoisting
    Used template literals for strings containing variables
    Refactored popup close functions to not need timeout functions
        Used event listeners for evt "animationend"

    CSS:
    Put all @import url() urls in single quotes
    Removed leading zeros from decimal values

#### Update Notes 5/18/2020 - Project 6, 1st Review

##### Fixes:
    JS: 
    Made a formListeners() function to reduce duplicated code
    Changed  classlist.toggle to .add or .remove so that popups could not be closed and reopened with doubleclick

#### Update Notes 5/17/2020 - Project 6, 1st Review

##### Fixes:
    JS:
    Removed unused test script file
    Index: Removed unused variables (from previous versions)
    Index: Restructured functions with variable declarations first
    Index: Forgot to use const when declaring form variable in closeForm() and saveForm()
    Index: Changed closeForm() function to reset addForm submit button to inactive for next opening
    Validate: Reduced size of the settingsObject passed through functions
    Validate: Removed btn-animate class toggle in toggleButtonState function

    HTML:
    Made submit button default to inactive for add form 

    CSS:
    Adjusted btn-animate class to only be active when button is active (removed classList toggle in JS)

#### Update Notes 5/2/2020 - Project 5, 3rd Review

##### Fixes:
    HTML:
    Removed </img> tags
    Added alt attributes to profile pic

    JS:
    Changed function names to more typical: verbItem instead of itemVerb (imgOpen)
    Instead of setAttribute("value"), used .value for form fields
    Reset add form fields upon close so they don't reopen with text still present

#### Update Notes 5/1/2020 - Project 5, 2nd Review

##### Fixes:
    HTML:
    Reverted header__logo back to <img> instead of background image of header
    Changed profile pic to <img> element
    Removed unnecessary </img> tag
    Gave attribute "type" to all buttons
    Separated form into two individual forms (Edit and Add)

    CSS:
    Moved import locations of active/opened modifiers to removed cascading selector declarations
    Adjusted form margin units to vh instead of %
    Removed unnecessary instances of font-family (inherited from page) from multiple modifiers
    Renamed form_state folder to follow BEM methodology
    Changed btn-animate hover opacity to match spec (0.8)

    JS:
    In createCard function, moved card prepend action to end of generating code
    Used newCard w/ querySelector instead of searching through document
    Added querySelector to cloneNode to return desired HTML node instead of a doc-fragment
    In imgOpen function, moved popup append action to end of generating code
    Moved imgClose function outside of imgOpen function, no need for nesting
    In imgClose function, made variable for picture node
    Moved closeForm function before all invocations to avoid hoisting
    Refactored openForm function into two functions, one for each form to simplify code 
    

#### Update Notes 4/30/2020 - Project 5, 1st Review

##### Fixes:
    HTML:
    Removed inline style for profile picture 
    Changed <button> in image card to <img> (as it is an actual image)

    CSS:
    Moved animation keyframes into block folders with their own classes (fade-in/out)
    Removed unnecessary classes after changing animations to blocks (picture_opening/closing, form_opening)
    Moved card__fav-button_active to own folder (but imported in card.css)
    Removed unnecessary font declarations in card__name, footer__copyright, form__name as in is inherited from .page
    Made form_state_open class for form and relevant elements involved with form
    Adjusted font-sizes for all form classes to better match spec at small resolutions
    Moved form exit button back to top right at small resolutions
    Refactored form to be simpler (position: fixed)
    Moved picture exit button back to top right at small resolutions

    JS:
    Changed setting of style: background-image to attribute src for <img> element in cards
    Changed var name cardDetails to cardText as it is not an array, but a single map
    Used dot notation to access map contents
    Added alt tag to all card images and popup images
    Gave all event listeners callback functions instead of anonymous pointer functions
        (Except for editBtn/addBtn as they take different args of formText)


#### Update Notes 4/15/2020 - Project 4, 1st Review

##### Fixes:
    HTML:
    Moved form element to end of body (and readjusted position)
    Changed images to background images with inline style

    CSS:
    Added alternate default font-family property to page class
    Made header logo a background image
    Changed profile__name and __occupation to prevent text overflow at all screen sizes
    Adjusted cards__container sizing and res scaling to keep min width on cards (282px)

    JS:
    Removed debug console.log lines
    Changed unaltered variables to const
