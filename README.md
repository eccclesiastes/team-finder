# Team finder 

Like the name suggests, this is an app that someone can use to find colleagues needed for a team for an upcoming project in the work environment, built after someone gave me the idea for it after realising the gap inside their company. Think of it as Tinder (or Grindr) but for the workplace. This also opened an opportunity to learn lots, such as DOM usage, and creating a non-hardcoded website for the first time.

## Features

### Users:

> A normal user can look up employees in the database on the website, and filter down results to their wants' and needs'. All people who meet the provided conditions (if any) are presented inside a table with name, contact, skills etc. People who are a match to the users requirements can then be shortlisted. The shortlist is another version of the same table, with only the people the user selected this time around. Users inside the shortlist can be added and removed anytime.

![User search GIF](https://github.com/qtdceu/team_finder/blob/main/img/ezgif.com-gif-maker.gif)

### Admins:

> Administrators can use the same features as a normal user, but also have access to moderate members of the organisation. Behind the password locked panel, admins have the ability to create users, as well as update certain ones by name. 

![Admin create/update GIF](https://github.com/qtdceu/team_finder/blob/main/img/ezgif.com-gif-maker%20(1).gif)

## How to use

Firstly, clone this repository.

Run `npm install` inside your console.

Inside your MySQL workbench, create a database.

Inside that database, create a table called `users`. Schema is:

![DB Schema](https://github.com/qtdceu/team_finder/blob/main/img/schema.png)

Set the primary key on `name`, a unique constraint on `contact_info`, and a not null constraint on all columns apart from `qualifications` and `experience`.

Whilst inside the same database, create a table called `credentials`. Schema is: 

![Credentials Schema](https://github.com/qtdceu/team_finder/blob/main/img/credentials_schema.png)

Set the primary key on `username` and a not null constrain on `password`.

In `databaseConfig.js`, edit the `connection` variable's options to fit your setup. 

Run `node .` to start the programme. 

Access the programme at `http://localhost:8080`.

To access the admin panel, you have to manually insert sets of usernames and passwords into the `credentials` table through your Workbench, then input them into the login box on the page. 

## Technologies

> Express 4.17.2

> (NPM Package) MySQL2 2.3.3

> MySQL

## To do

> Similar results, not exact

> Present results as a profile 'card'; break out of table; possibly add photos

> Make website more eye pleasing

> Remove button for results

> Log admin actions 

## License 

License can be found [here](https://github.com/qtdceu/team_finder/blob/main/LICENSE).
