====
Topics Challenge
====

Welcome!

This is my implementation of the Topics Challenge.

The program takes a JSON file as input and displays a word cloud in HTML according to some rules of sentiment score and volumes. Also, the program displays metadata on a clicked element of the word cloud.


Libraries and Frameworks
------------------------

This code has been built using the following JavaScript libraries and frameworks (js/lib/):

- **Backbone** (v 1.1.2)

	Great for developing an MV* JavaScript application.


- **jQuery** (v 2.1.1)

	Because plain vanilla JavaScript can be quite boring once you've tasted jQuery!
	Also, a weak Backbone dependency.


- **Require** (v 2.1.14)
	
	Making modular code is fantastic and Require does a pretty good job at it!

	- **Text** (v 2.0.12)
		
		A Require helper to load text files such as HTML templates.


- **Underscore** (v 1.6.0)
	
	A good template rendering framework. 
  Also, a strong Backbone dependency.
	


Reusability of the code
-----------------------

I have tried to make the code as generic as possible. Therefore, with this same code base, you can:

- Plug in a different dataset as a JSON file (data/topics.json), as long as the structure is at least:
```
[
  {
    'label': 'Label',
    'volume': 3,
    'sentiment': {
        'negative': 1,
        'neutral': 1,
        'positive': 1
    },
    'sentimentScore': 5
  },
  .
  .
  .
]
```

- Change the interpretation of the sentiment score by changing the boundaries of positive and negative topics: 
	```
	js/app.js -> var _positive and var _negative
  ```

- Change the number of different sizes:
	```
	js/app.js -> var _k
  ```
	- Also, if you are implementing more than 6 different sizes, you will have to edit the CSS accordingly:
 
	```	
  css/styles.css -> .sizeX{}, where X is the number of the size.
    ```

- The design is mostly responsive, meanning that you can plug the word cloud in any container and it should fit.


How to run it?
--------------

Want to run the code right away? Just download the code base and put it on a server. Then, just go to [URL]/index.html on your favorite browser to kick things off!


What about the tests?
---------------------

I definitely understand the importance of automated tests for maintainability and overall quality of code. Unfortunately, I am pretty new to automated testing and therefore I prefer to take the time to learn it well instead of implementing a vaguely mediocre set of tests.

Nevertheless, the program has been manually tested and should be production-ready!

Licence
-------

The project is licensed under the MIT License (MIT).

Copyright (c) 2014 Antonio VILLAGRA DE LA CRUZ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
