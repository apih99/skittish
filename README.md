
# The Skittish Website

> A simple, weird web project where all the elements are afraid of your mouse.

This is Project #1 from my TikTok series: **"One Day, One Weird Static Web Project."**

[**➡️ View The Live Demo Here! ⬅️**](https://apih99.github.io/skittish/)

*(You'll need to replace the link above with your own GitHub Pages link after you deploy it!)*

---

![A GIF showing website elements running away from the cursor](demo.gif)
*(Pro-tip: Record a short GIF of your project in action and name it `demo.gif` to have it show up here!)*

## The Concept

What if a website didn't want to be used?

This project explores that idea by creating a page where every interactive element—text, buttons, images—actively runs away from your mouse cursor. As you get close, they scatter and jiggle towards the edges of the screen, creating a funny and frustrating user experience.

## Features

*   **Scaredy Elements:** All elements with the class `.skittish` will react to the mouse.
*   **Smooth Evasion:** Elements don't just snap away; they smoothly transition to their new "safe" spot.
*   **Panicked Jiggle:** A subtle shake animation adds to the "scared" effect.
*   **Purely Client-Side:** No frameworks, no libraries. Just vanilla HTML, CSS, and JavaScript.

## How It Works

The magic is handled by a simple JavaScript script:

1.  An event listener tracks the `mousemove` event on the entire page to get the cursor's X and Y coordinates.
2.  It then loops through every element marked with the `.skittish` class.
3.  For each element, it calculates the distance between the element's center and the mouse cursor.
4.  If the cursor is within a defined "danger zone" (e.g., 150 pixels), the script calculates a vector pointing directly away from the cursor.
5.  It then applies a `transform: translate(x, y)` style to the element, pushing it along that vector to a new position.
6.  When the mouse moves away, the `transform` is removed, and a CSS transition smoothly returns the element to its original spot.

## How to Run

Since this is a static project, it's incredibly simple to run locally.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/apih99/skittish.git
    ```
2.  **Navigate to the directory:**
    ```bash
    cd skittish
    ```
3.  **Open the file:**
    Open the `index.html` file in your favorite web browser. That's it!



MIT License © 2023 [apih99]
