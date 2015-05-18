# Octoplus
**A generic administration getting some config to output real object manipulation**

*Project made in a week to learn more about React and unidirectional data flow logic*

## Content

- [Technologies](#technologies)
- [Form builder](#form-builder)
- [Generics](#generics)
    - [Components](#components)
    - [Store](#store)
    - [How to add a new object to the administration panel](#how-to-add-a-new-object-to-the-administration-panel)
    - [List extension example](#list-extension-example)
    - [Edition extension example](#edition-extension-example)
- [Possible improvements](#possible-improvements)
- [Known issues](#known-issues)

## Technologies

- [React](https://facebook.github.io/react) 0.13.3
- [Reflux](https://github.com/spoike/refluxjs)
- [NodeJS](https://nodejs.org/) - ExpressJS
- [MongoDB](https://www.mongodb.org/) - Mongoose
- [Leaflet](http://leafletjs.com)

## Form builder
The form builder helps to quickly create a form by giving it a configuration object describing each field we want.
*Note that the form builder included in this project is currently using a [Bootstrap](http://getbootstrap.com/) structure.*

It takes 3 parameters :
- onSubmit (function called when submitted)
- fields (description of each fields)
- data (values placed by default in those fields, useful when editing an element for example)

To create a form, import the form builder like `var Form = require('./FormBuilder')` then use it like so :
```javascript
<Form
    onSubmit={this.submit}
    fields={{
        string: {
            type: 'string',
            label: 'A string',
            params: {
                required: true
            }
        },
        email: {
            type: 'email',
            label: 'An email'
        },
        select: {
            type: 'select',
            label: 'A selector',
            params: {
                choices: {
                    fr: 'France',
                    en: 'England'
                },
                disabled: true
            }
        },
        checkbox:  {
            type: 'checkbox',
            label: 'Checkbox',
            params: {
                choices: {
                    g: 'Good',
                    m: 'Medium',
                    b: 'Bad'
                }
            }
        }
    }}
    data={{
        string: 'hello',
        email: 'mail@mail.fr',
        select: 'en',
        checkbox: ['b']
    }}
/>
```
The full code giving the following image is [here](https://github.com/jebarjonet/Octoplus/blob/master/public/app/components/admin/FormTest.react.js)

![Form using the Form builder](https://cloud.githubusercontent.com/assets/4401230/7686691/fc112650-fd97-11e4-9f96-ca0e4698a0f6.png)

## Generics
The whole administration panel is made of very few files since the purpose of this project was to create a very generic structure, because of the repetitive layout of each object we want to manipulate : List them, add a new, edit and remove.

### Components
All generic components are stored in `public/app/components/admin/generic/`. Then each new object has its own file extending the generic structure.

### Store
The AdminStore only has some basic functions calling the API when needed to add, update or remove an object. It auto-loops over the list of models we configured to create a unique store for each of them. As an example a store for the `categories` item will be reachable with `var CategoriesStore = require('../stores/AdminStore.js').CategoriesStore`

### How to add a new object to the administration panel
- Create a file in `public/app/components/admin/` to extend Generics functions (as a Layout, a List, extended Forms, etc.)
- Edit the file `public/app/config/routes.js` to add the `require` for the file you just created next to the others to make it available throught your administration menu
- Edit the file `public/app/config/models.js` to set up the form and the information displayed in the list for the index of your object
- Create a file in `server/models/` to create a Mongoose Schema of this new object
- Edit the file `server/config/models.js` to link the Schema you just created to the API
- Done, let's take a beer

### List extension example
In the `public/app/config/models.js` file to configure the information displayed in the list we can display both basic attributes of an object (such as `name`) or create a more complex element using the `React.createElement()` function. Here we display a squared `div` showing the color of the categories (as an hexadecimal value).

![Category list](https://cloud.githubusercontent.com/assets/4401230/7685957/a2341002-fd92-11e4-9589-001e4c81d965.png)

To do so we describe the React element like so :
```javascript
list: {
        params: [
            '_id',
            {
                type: 'div',
                props: {
                    style: {height:"20px",width:"20px",backgroundColor:"#__color__"},
                    title: '__name__'
                }
            },
            'name'
        ]
    }
```
The GenericList component will automatically replace all the values with the format `__VALUE__` by the `object.VALUE`. In this example when we display the line for a category element, `__color__` will be replaced by `element.color`, as the `title` of this div will get the `element.name` value.

### Edition extension example
For the Place object the EditForm is extended adding a Map to it thought a custom `MapInteractionMixin` in `public/app/components/admin/Places.react.js`

![Place editing](https://cloud.githubusercontent.com/assets/4401230/7685959/a836eb1e-fd92-11e4-9290-01e040f930c5.png)

This extension also adds a function binded to the button "Find this place with Google" (which by the way only uses the Google Search API and not the Google Places API, so it wil only find **very** famous places, do not try to find your home or your favorite pub) that places a marker on the map and autocompletes the other fields (as address and geolocation) if a place is found with the searched name.

## Possible improvements
- Display errors using notifications instead of the console
- Getting errors from backend (for example when trying to add multiple times a Place with the same name (as there is a "unique" attribute in its Mongoose Schema))
- Clean code
- Find a purpose for all that thing

## Known issues
- Leaflet map sometimes not loading
