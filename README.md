# D3-challenge

![D3
Investigation](https://user-images.githubusercontent.com/89948865/158280758-abdb76f4-2fc1-440c-ba63-9ec6d841bf15.png)

\#\#\#\#\# Photo by Markus Winkler on Unsplash

\#\# Requirements

The overall requirements for this homework are as follows: -

“ Welcome to the newsroom! You've just accepted a data visualisation position
for a major metro paper. You're tasked with analysing the current trends shaping
people's lives, as well as creating charts, graphs, and interactive elements to
help readers understand your findings.

The editor wants to run a series of feature stories about the health risks
facing particular demographics. She's counting on you to sniff out the first
story idea by sifting through information from the U.S. Census Bureau and the
Behavioural Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates:
<https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml>, but you
are free to investigate a different data set. The current data set includes data
on rates of income, obesity, poverty, etc. by state. MOE stands for ‘margin of
error’. "

The full details of the requirements for this homework can be found at:

https://monash.bootcampcontent.com/monash-coding-bootcamp/monu-virt-data-11-2021-u-c/-/tree/master/02-Homework/16-D3/Instructions

\#\# Author: Mike Murphy

\#\# Tackling the Assignment

\#\#\# 1. Core Assignment: D3 Dabbler (Required assignment)

You need to create a scatter plot between two of the data variables such as
\`Healthcare vs. Poverty\` or \`Smokers vs. Age\`.

Using the D3 techniques we taught you in class, create a scatter plot that
represents each state with circle elements. You'll code this graphic in the
\`app.js\` file of

your homework directory—make sure you pull in the data from \`data.csv\` by
using the \`d3.csv\` function. Your scatter plot should ultimately appear like
the image at the

top of this section.

Include state abbreviations in the circles.

Create and situate your axes and labels to the left and bottom of the chart.

Note: You'll need to use \`python -m http.server\` to run the visualisation.
This will host the page at \`localhost:8000\` in your web browser.

\#\#\# 2. Bonus: Impress the Boss: (Optional Assignment)

Why make a static graphic when D3 lets you interact with your data?

You're going to include more demographics and more risk factors. Place
additional labels in your scatter plot and give them click events so that your
users can decide

which data to display. Animate the transitions for your circles' locations as
well as the range of your axes. Do this for two risk factors for each axis. Or,
for an

extreme challenge, create three for each axis.

\* Hint: Try binding all of the CSV data to your circles. This will let you
easily determine their x or y values when you click the labels.

While the ticks on the axes allow us to infer approximate values for each
circle, it's impossible to determine the true value without adding another layer
of data. Enter

tooltips: developers can implement these in their D3 graphics to reveal a
specific element's data when the user hovers their cursor over the element. Add
tooltips to your

circles and display each tooltip with the data that the user has selected. Use
the \`d3-tip.js\` plugin developed by [Justin
Palmer](https://github.com/Caged)—we've already

included this plugin in your assignment directory.

The Assignment started out to satisfy the core requirements based on the
“12-Par_Hair_Metal_Conclusion” activity from the D3 lessons then quickly evolved
into tackling

the bonus requirements based on the supplied references to Justin Palmer’s
“d3-tip-js”, David Golz’s example of how to implement tooltips and numerous
other references

and tutorials found from these two starting points.

\#\#\# Screenshots of the outputs follow.

![1 Poverty V
Obesity](https://user-images.githubusercontent.com/89948865/158281671-32eb06cf-0cf8-43d6-a360-eaf26233a751.png)

![2 Poverty V
Smokes](https://user-images.githubusercontent.com/89948865/158281742-63ba8edc-def4-4c25-a394-666f48e7cb8e.png)

![3 Poverty V
Healthcare](https://user-images.githubusercontent.com/89948865/158281768-65625ddc-b2f1-4350-afa0-3bd9dd2700c0.png)

![4 Income V
Obesity](https://user-images.githubusercontent.com/89948865/158281802-0ad758b8-024a-4a59-a9f9-b0145dd67f43.png)

![5 Income V
Smokes](https://user-images.githubusercontent.com/89948865/158281835-1abeeff7-8dd2-4f1a-9b71-286faa559e3e.png)

![6 Income V
Healthcare](https://user-images.githubusercontent.com/89948865/158281869-b8f91739-216f-4880-a4a6-704f86ceb089.png)

![7 Age V
Obesity](https://user-images.githubusercontent.com/89948865/158281903-ff7ea3fc-a0ea-4be9-a7d1-d2bacb39c212.png)

![8 Age V
Smokes](https://user-images.githubusercontent.com/89948865/158281936-3fb97f71-51e5-4271-8e54-f2ce73df858a.png)

![9 Age V
Healthcare](https://user-images.githubusercontent.com/89948865/158281961-fc3a1ef9-bd5c-44a6-b157-c80855c877b9.png)
