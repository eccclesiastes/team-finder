# Team finder 

Like the name suggests, this is an app that someone can use to find colleagues needed for a team for an upcoming project in the work environment, built after someone gave me the idea for it after realising the gap inside their company. Think of it as Tinder (or Grinder) but for the workplace. This also opened an opportunity to learn lots, such as DOM usage, and creating a non-hardcoded website for the first time.

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

Set the primary key on `name`.

In `databaseConfig.js`, edit the `connection` variable's options to fit your setup. 

Run `node .` to start the programme. 

Access the programme at `http://localhost:8080`.

By default, the username and password to access the protected features are `admin` and `admin`. If you wish to change these, the correct credentials can be found at lines' 49 and 50 in [/api/api.js](https://github.com/qtdceu/team_finder/blob/main/api/api.js).

## Technologies

> Express 4.17.2

> (NPM Package) MySQL2 2.3.3

> MySQL

## License 

License can be found [here](https://github.com/qtdceu/team_finder/blob/main/LICENSE).