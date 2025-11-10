If I have time, I might come back to the page.tsx and make it more mobile friendly. Having a table in general makes it difficult to look good on mobile, but we could maybe at certain screen sizes hide most of the information, but show full details on click or something.

## Wishlist
- Add in something for when the database doesn't return anything (no advocates found)
- Add in paging, and have the api handle the sort/filter/paging instead of doing it on the front end
- Disable next button when there are no results
- Style the paging to look nicer/more consistent. Like maybe chevrons instead of buttons that say 'previous' and 'next'.
- Would be nice to add in filters rather than just search, like maybe a drop down of the different specialties and a dropdown of the different degrees.
- It would be nice to add in unit tests, cypress tests, integration tests, etc.
- Adding a loading spinner to the page so the user can tell that it's currently fetching data
- Add error handling for when the api returns an error. Potentially display that error to the user in a friendly way.
- Breaking the page down into smaller reusable components like the table, search, and pagination. Didn't seem super necessary since this was a small project anyways.

## Unfinished
I'll leave it as an open pull request, but I was in the middle of updating the api to handle the filtering and paging. Having the ui get all the advocates and then filter them is inefficient and bad practice. 