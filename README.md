Breakdown on Tabletop
============
This graphic runs on Tabletop.js (i.e. data is stored in Google Doc
spreadsheets) and can be used to display comparisons of both yes/no
and numerical data between groups.

Examples of yes/no questions: 
  * Do you pull all-nighters weekly?
  * I am satisfied with my academic performance.

Examples of questions with numerical data: 
  * Rank your happiness on a scale from 1-7. 
  * How many hours do you spend on homework?

A working copy of this project can be found at
[http://the-tech.mit.edu/~jskao/breakdown/](http://the-tech.mit.edu/~jskao/breakdown/)

Usage:
-------------
### 1) Clone files from Github
1. git clone git&#x40;github.com:TheMITTech/breakdown.git (clone the git repository)
2. cd breakdown (navigate into the breakdown folder)

### 2) Enter your data ([Example](https://docs.google.com/spreadsheet/ccc?key=0AlhEOMxfxhHtdF9Sank4TU5QTm0zekROYkkxZ09veHc)):
1. Open a Google Doc Spreadsheet

2. You will need two sheets inside your spreadsheet. Name one sheet
"demographics" and the other sheet "data".

3. In the "demographics" sheet, create columns "name", "id", "pop", and "supergroup".
    * name => name of the group
    * id => a short name for the group (cannot have spaces)
    * pop => the size of each group
    * supergroup => You can categorize each of your groups into a
      larger supergroup. If you only have one group, just fill out the
      same name for every row.

4. In the "data" sheet, create columns "category", "id", "question",
"notes", "average", "maxval", "units", and a column for each row in
your demographics sheet (name those columns using the id column in
your demographics sheet).
    * category => You can categorize your questions for easier navigation
    * id => a short name for your questions (cannot have spaces)
    * question => the question you want to display
    * notes => place any notes you want to display here
    * average => you can present the average value across all of your groups for that question
    * maxval => If your data corresponds to a yes/no question, leave
      this entry blank. If your data for each group shows the average
      value for a numerical response, then indicate the maximum value
      you can enter (the maximum value will be represented as a 100%
      height bar)
    * other columns => your data for each group. For yes/no type
      questions, you should indicate the # of people in each group who
      answered a question a certain way. For questions where respondents
      answer with a value, you should indicate the average value response
      for the group.

5. Fill out the rows in your spreadsheet with your data. The order of your rows 
will determine the order of the data bars on the page and the questions in the 
left sidebar.

### 3) Edit the files you just pulled from Github
1. Open script.js. 
2. Fill out the "GOOGLE_DOC_KEY", "TITLE", and "HEADLINE".
    * GOOGLE_DOC_KEY => In your Google Doc spreadsheet, click on File
      -> Publish to the Web and then copy and paste the key in link
      (located inside the box at the bottom of the popup). The key is
      between "key=" and "&output" in the URL.
    * TITLE => Populates the title tag on the page
    * HEADLINE => Populates the headline in the upper left corner


Contributors:
-------------
* Joanna S. Kao (@joannaskao)
