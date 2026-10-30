# Student Study Planner

A simple web application that helps a student keep track of study tasks and assignments. Built as the individual mini project for the **ATU Virtual Internship (Software Development)**.

**Live app:** https://owusumanuel1234-a11y.github.io/study-planner/

## Problem

University students handle several courses at once, and tasks are often scattered across notebooks and chats, so deadlines get missed. This app gives students one simple place to organise their study tasks.

## Features

- Add a task with a title and a subject or course name
- View all tasks in a clear list, with a "X of Y complete" counter
- Mark a task complete and change it back to incomplete (Undo)
- Delete a task
- Tasks are saved in the browser (local storage), so they remain after a refresh
- Friendly empty-state message when there are no tasks
- Blank task titles are rejected with an error message
- **Extra feature:** optional due date, with a red "Overdue" badge for incomplete tasks past their due date

## Technologies

- HTML, CSS, and JavaScript (no frameworks or libraries)
- Browser local storage for saving data
- Git and GitHub for version control
- GitHub Pages for hosting
- Figma Make for the screen design

## How to run locally

1. Download or clone this repository:
   `git clone https://github.com/owusumanuel1234-a11y/study-planner.git`
2. Open the folder and double-click `index.html` to open it in a browser.
   (Or use the Live Server extension in VS Code.)

No installation or internet connection is needed.

## Project structure

- `index.html` - page structure (form, task list, footer)
- `style.css` - layout and styling
- `script.js` - adding, completing, deleting, validating, and saving tasks
- `README.md` - project description

## Testing

| Test | Result |
|------|--------|
| Add a task with a title | Pass |
| Submit an empty title | Pass (error shown, nothing added) |
| Mark a task complete / Undo | Pass |
| Delete a task | Pass |
| Refresh the page | Pass (tasks remain) |
| Past due date shows Overdue badge | Pass |

## Author

Owusu Emmanuel Kuffor - Computer Science, Level 200, Accra Technical University

## Acknowledgement

AI assistance (Claude by Anthropic) was used for guidance, code explanations, and help with a Git problem. I wrote and tested the code myself and understand how it works.