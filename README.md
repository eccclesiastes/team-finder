# Team finder 

Like the name suggests, this is an app that someone can use to find colleagues needed for a team for an upcoming project in the work environment. Think of it as Tinder (or Grindr) but for the workplace. This also opened an opportunity to learn lots, such as DOM usage, and creating a non-hardcoded website for the first time.

## Features

### Users:

> A normal user can look up employees in the database on the website, and filter down results to their wants and needs. All people who meet the provided conditions (if any) are presented inside a table with name, contact, skills etc. People who are a match to the users requirements can then be shortlisted. The shortlist is another version of the same table, with only the people the user selected this time around. Users inside the shortlist can be added and removed anytime.

![User search GIF](https://github.com/qtdceu/team_finder/blob/main/img/ezgif.com-gif-maker.gif)

### Admins:

> Administrators can use the same features as a normal user, but also have access to moderate members of the organisation. Behind the password locked panel, admins have the ability to create users, as well as update certain ones by name. 

![Admin create/update GIF](https://github.com/qtdceu/team_finder/blob/main/img/ezgif.com-gif-maker%20(1).gif)

## How to use

Firstly, clone this repository.

Run `npm install` inside your console.

Inside your MySQL, create a database.

Inside that database, create a table called `users` (employee data) with this statement: 

```sql 
CREATE TABLE `users` (
  `name` varchar(255) NOT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `qualifications` varchar(255) DEFAULT NULL,
  `year_joined` year NOT NULL,
  `location` varchar(255) NOT NULL,
  `ou` varchar(255) NOT NULL,
  `contact_info` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `skills` varchar(255) NOT NULL,
  `current_project` varchar(255) NOT NULL,
  `availability` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `contact_info` (`contact_info`)
)
```

![DB Schema](https://github.com/qtdceu/team_finder/blob/main/img/schema.png)

Whilst inside the same database, create a table called `credentials` (admin login credentials) with this statement: 

```sql
CREATE TABLE `credentials` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
)
```

![Credentials Schema](https://github.com/qtdceu/team_finder/blob/main/img/credentials_schema.png)

Once again, in the same database, create a table called `logs` (admin activity logging) with this statement:

```sql
CREATE TABLE `logs` (
  `username` varchar(255) NOT NULL,
  `action` varchar(500) NOT NULL
)
```

![Logs Schema](https://github.com/qtdceu/team_finder/blob/main/img/logs_schema.png)

In `databaseConfig.js`, edit the `connection` variable's options to fit your setup. 

Run `node .` to start the programme. 

Access the programme at `http://localhost:8080`.

To access the admin panel, you have to manually insert sets of usernames and passwords into the `credentials` table through your MySQL, then input them into the login box on the page. 

## Technologies

> Node.js

> Express

> (NPM Package) MySQL2 

> MySQL >= 8

## To do

- [x] Multiple admin logins for logging 

- [x] Log admin actions 

- [ ] Similar results, not exact

- [ ] Present results as a profile 'card'; break out of table; possibly add photos

- [ ] Make website more eye pleasing

- [ ] Remove button for results

## License 

License can be found [here](https://github.com/qtdceu/team_finder/blob/main/LICENSE).
