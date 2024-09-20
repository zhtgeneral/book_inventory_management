# Second Bind Design Challenge

## Getting Started 🧑‍💻

First step is to clone this repository. To do so, paste and run the command in a convienent location using bash or your preferred terminal:

```bash
git clone https://github.com/zhtgeneral/book_inventory_management.git
```

This project uses `npm` so you will need to have it installed to run this project. Instructions for installation here:
<https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>

Once you have the repo and `npm` installed, you need to install the packages. In the directory `/book_inventory_management`, run 

```bash
npm i
```

This might take a minute. Once this is done, run the app using the command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app. If you don't see it, you might need to wait for it to load, or your computer might be running a different service at `localhost:3000`. If this is the case, the console will tell you about this and give you the link to find this app 🏃‍♂️.

## How it works

There is 1 main page for the entire app. On this page there are 3 panels. The upper left panel lets you add books. The lower left panel lets you filter the books. The right panel lets you see all the books added in the database.

Desktop mode:

![Image of desktop demo](/demo_desktop.png)

Mobile mode:

![Image of mobile demo](/demo_mobile.png)

### Adding book

To add a book, fill in the required fields `title, author, genre, publication date, and ISBN`. The form prevents empty fields and checks that each is the correct format before adding the book. Try it out （￣︶￣）↗　! If it is successful, you will see a success message and your newly added book in the table.

### Filtering books

To filter a book, fill in any of the fields to filter. You can filter by `title, author, genre, or publication year`. Once a filter is applied, you can see the filtered books on the table. Note, to reset a filter the only way currently is to refresh the page.

### Viewing books 📖

All the books are displayed in this panel. You can see the titles, authors, genres, and the publication dates. To export all the data as a JSON , click on the Export button and it will download the file into your downloads folder.

## How to close app

To close app, in the same console that you opened the app in, run

```bash
ctrl + c
```

and when it asks you

```bash
Terminate batch job (Y/N)? 
```

press `y`.

## Troubleshooting

Because of my database provider, if my database isn't used for 7 days, this app will not load any books and it will not allow adding any books. If that is the case, there is not much you can do other than notify me. Hopefully the app is able to be used until then.

If you have ran the app in the console with `npm run dev` but you can't find the app at the correct location, it might just be the app is slow.