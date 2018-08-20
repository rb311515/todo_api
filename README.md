# flask-todo

Simple todo app REST API.

Built with:

* Flask (web server)
* Marshmallow (object serialization/deserialization)
* SQLAlchemy (ORM)
* Alembic (migrations)
* MySQL (database)


### Requirements

* python >= 3.6.0
* pipenv >= 11.9.0 (e.g. `brew install pipenv` on OS X)
* mysql >= 5.7.21

### Getting started

These instructions assume MySQL is running on `localhost:3306` with the `root` user available.

```
cd server

# Install dependencies
pipenv install

# Create DB
make create_db

# Run migrations
make run_migrations

# Seed database with initial data
make seed

# Run dev server
make run
```
```
    ____                             ______            __          ____                  _              __ 
   / __ \ ___   ____ ___   ____     /_  __/____   ____/ /____     / __ \ _____ ____     (_)___   _____ / /_
  / / / // _ \ / __ `__ \ / __ \     / /  / __ \ / __  // __ \   / /_/ // ___// __ \   / // _ \ / ___// __/
 / /_/ //  __// / / / / // /_/ /    / /  / /_/ // /_/ // /_/ /  / ____// /   / /_/ /  / //  __// /__ / /_  
/_____/ \___//_/ /_/ /________/    /___  \____/ \__,_/ \____/  ______ __/    \____/__/ / \___/ \___/ \__/  
   / /_   __  __ _    / __ \ ____   / /_   ___   _____ / /_   /_  __// /_   ____  /____ ___   ____ _ _____ 
  / __ \ / / / /(_)  / /_/ // __ \ / __ \ / _ \ / ___// __/    / /  / __ \ / __ \ / __ `__ \ / __ `// ___/ 
 / /_/ // /_/ /_    / _, _// /_/ // /_/ //  __// /   / /_     / /  / / / // /_/ // / / / / // /_/ /(__  )  
/_.___/ \__, /(_)  /_/ |_| \____//_.___/ \___//_/    \__/    /_/  /_/ /_/ \____//_/ /_/ /_/ \__,_//____/   
       /____/                                                                                              
```
### Added Steps

Now with the server running 
```
# Use a web browser (i.e. Google Chrome) open the index.html file.

#Interact with the page while the todo_api is running in the background
```
You will be greated with all Todo Lists which you can Delete, or Create a New List.
Above this is 


##Todo Lists:
```
This lets you look into List specifics by List IDs and then edit the name of the list.
```

##Todo items:
```
This lets you look at specific Todo items by there ID, and then Edit or Delete said item. Create new items. 
```

##Search:
```
This lets you enter a case-sensitive title of a todo item and get a list of the resulting matches.
```